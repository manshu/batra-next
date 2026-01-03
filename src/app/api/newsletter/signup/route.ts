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

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "";

    const userAgent = req.headers.get("user-agent") || "";
    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      "";

    const body = (await req.json()) as { name?: string; email?: string };

    const name = (body.name || "").trim();
    const email = (body.email || "").trim().toLowerCase();

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ ok: false, error: "Invalid name." }, { status: 400 });
    }

    if (!isValidEmail(email) || email.length > 200) {
      return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
    }

    await adminDb.collection("newsletter_signups").add({
      name: clamp(name, 80),
      email: clamp(email, 200),
      createdAt: FieldValue.serverTimestamp(),
      ip: clamp(ip, 64),
      country: clamp(country, 8),
      userAgent: clamp(userAgent, 400),
      source: "meetup_page",
    });

    return NextResponse.json({ ok: true, message: "You’re signed up!" }, { status: 200 });
  } catch (err: any) {
    const message =
      process.env.NODE_ENV !== "production"
        ? err?.message || String(err)
        : "Server error. Please try again.";

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
