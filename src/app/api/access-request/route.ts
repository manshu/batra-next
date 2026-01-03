// app/api/access-request/route.ts
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function clamp(str: string, max: number) {
  const s = (str ?? "").toString();
  return s.length > max ? s.slice(0, max) : s;
}

async function verifyTurnstile(token: string, ip?: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { ok: false, error: "Captcha not configured (TURNSTILE_SECRET_KEY)." };
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (ip) body.set("remoteip", ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    }
  );

  const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
  return { ok: !!data.success, errorCodes: data["error-codes"] || [] };
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip");

    const userAgent = req.headers.get("user-agent") || "";
    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      "";

    const body = (await req.json()) as {
      name?: string;
      email?: string;
      company?: string;
      message?: string;
      captchaToken?: string;
    };

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const company = (body.company || "").trim();
    const message = (body.message || "").trim();
    const captchaToken = (body.captchaToken || "").trim();

    // Validation (server-side)
    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ ok: false, error: "Invalid name." }, { status: 400 });
    }
    if (!isValidEmail(email) || email.length > 200) {
      return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
    }
    if (company.length > 120) {
      return NextResponse.json({ ok: false, error: "Company is too long." }, { status: 400 });
    }
    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { ok: false, error: "Message must be 10–2000 characters." },
        { status: 400 }
      );
    }
    if (!captchaToken) {
      return NextResponse.json({ ok: false, error: "Captcha token missing." }, { status: 400 });
    }

    // Captcha verify (server-side)
    const captcha = await verifyTurnstile(captchaToken, ip);
    if (!captcha.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "Captcha failed. Please try again.",
          details: process.env.NODE_ENV !== "production" ? captcha.errorCodes : undefined,
        },
        { status: 400 }
      );
    }

    // Write with Admin SDK (bypasses Firestore rules)
    await adminDb.collection("access_requests").add({
      name: clamp(name, 80),
      email: clamp(email, 200),
      company: clamp(company, 120),
      message: clamp(message, 2000),
      country: clamp(country, 8),
      ip: clamp(ip || "", 64),
      userAgent: clamp(userAgent, 400),
      createdAt: FieldValue.serverTimestamp(),
      source: "blocked_page",
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("access-request error:", err);

    // show real error only in dev
    const message =
      process.env.NODE_ENV !== "production"
        ? err?.message || String(err)
        : "Server error. Please try again.";

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
