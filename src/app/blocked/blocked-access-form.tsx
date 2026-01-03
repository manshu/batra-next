// app/blocked/blocked-access-form.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    onTurnstileSuccess?: (token: string) => void;
    onTurnstileExpired?: () => void;
    onTurnstileError?: () => void;
    turnstile?: {
      reset: () => void;
    };
  }
}

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validate(values: FormState) {
  const errors: Partial<Record<keyof FormState | "captcha", string>> = {};

  const name = values.name.trim();
  const email = values.email.trim();
  const company = values.company.trim();
  const message = values.message.trim();

  if (name.length < 2 || name.length > 80) {
    errors.name = "Please enter your name (2–80 characters).";
  }
  if (!isValidEmail(email) || email.length > 200) {
    errors.email = "Please enter a valid email address.";
  }
  if (company.length > 120) {
    errors.company = "Company is too long (max 120 characters).";
  }
  if (message.length < 10 || message.length > 2000) {
    errors.message = "Please enter a message (10–2000 characters).";
  }

  return errors;
}

export default function BlockedAccessForm() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormState | "captcha" | "form", string>>
  >({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const clientErrors = useMemo(() => validate(values), [values]);

  useEffect(() => {
    window.onTurnstileSuccess = (token: string) => setCaptchaToken(token);
    window.onTurnstileExpired = () => setCaptchaToken("");
    window.onTurnstileError = () => setCaptchaToken("");
    return () => {
      delete window.onTurnstileSuccess;
      delete window.onTurnstileExpired;
      delete window.onTurnstileError;
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errors = { ...clientErrors } as typeof fieldErrors;

    if (!siteKey) {
      errors.form =
        "Captcha is not configured. Please set NEXT_PUBLIC_TURNSTILE_SITE_KEY.";
    }
    if (!captchaToken) {
      errors.captcha = "Please complete the captcha.";
    }

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/access-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          captchaToken,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setFieldErrors({
          form:
            data.error ||
            "Something went wrong submitting your request. Please try again.",
        });
        return;
      }

      setStatus("success");
      setValues({ name: "", email: "", company: "", message: "" });
      setCaptchaToken("");
      window.turnstile?.reset?.();
    } catch {
      setStatus("error");
      setFieldErrors({
        form: "Network error. Please try again.",
      });
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
        <p className="text-sm font-semibold text-emerald-200">
          Request received ✅
        </p>
        <p className="mt-2 text-sm leading-6 text-zinc-200/90">
          Thanks — I&apos;ll review your request and get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />

      <div>
        <p className="text-sm font-semibold text-zinc-100">Request access</p>
        <p className="mt-1 text-sm text-zinc-300">
          Fill this out and I&apos;ll reach out. (Protected with captcha.)
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">Name</label>
            <input
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-white/20"
              placeholder="Your name"
              autoComplete="name"
              maxLength={80}
            />
            {fieldErrors.name && (
              <p className="text-xs text-rose-300">{fieldErrors.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">Email</label>
            <input
              value={values.email}
              onChange={(e) =>
                setValues((v) => ({ ...v, email: e.target.value }))
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-white/20"
              placeholder="you@company.com"
              autoComplete="email"
              inputMode="email"
              maxLength={200}
            />
            {fieldErrors.email && (
              <p className="text-xs text-rose-300">{fieldErrors.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-300">
            Company (optional)
          </label>
          <input
            value={values.company}
            onChange={(e) =>
              setValues((v) => ({ ...v, company: e.target.value }))
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-white/20"
            placeholder="Your company"
            autoComplete="organization"
            maxLength={120}
          />
          {fieldErrors.company && (
            <p className="text-xs text-rose-300">{fieldErrors.company}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-300">
            Message
          </label>
          <textarea
            value={values.message}
            onChange={(e) =>
              setValues((v) => ({ ...v, message: e.target.value }))
            }
            className="min-h-[120px] w-full resize-y rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-white/20"
            placeholder="Tell me who you are and why you need access…"
            maxLength={2000}
          />
          {fieldErrors.message && (
            <p className="text-xs text-rose-300">{fieldErrors.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div
            className="cf-turnstile"
            data-sitekey={siteKey}
            data-callback="onTurnstileSuccess"
            data-expired-callback="onTurnstileExpired"
            data-error-callback="onTurnstileError"
          />
          {fieldErrors.captcha && (
            <p className="text-xs text-rose-300">{fieldErrors.captcha}</p>
          )}
          {!siteKey && (
            <p className="text-xs text-amber-200">
              Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY in env.
            </p>
          )}
        </div>

        {fieldErrors.form && (
          <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200">
            {fieldErrors.form}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Submitting..." : "Request access"}
        </button>

        <p className="text-xs text-zinc-500">
          Your request will be stored securely for review.
        </p>
      </form>
    </div>
  );
}
