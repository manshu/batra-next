"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";

type Values = { name: string; email: string };

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validate(v: Values) {
  const errors: Partial<Record<keyof Values, string>> = {};
  const name = v.name.trim();
  const email = v.email.trim();

  if (name.length < 2 || name.length > 80) errors.name = "Please enter your name (2–80 characters).";
  if (!isValidEmail(email) || email.length > 200) errors.email = "Please enter a valid email address.";

  return errors;
}

export default function NewsletterForm() {
  const [values, setValues] = useState<Values>({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => validate(values), [values]);
  const isValid = Object.keys(errors).length === 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
        }),
      });

      const data = (await res.json()) as { ok?: boolean; message?: string; error?: string };

      if (!res.ok || !data.ok) {
        toast.error(data.error || "Something went wrong. Please try again.");
        return;
      }

      toast.success(data.message || "You’re signed up!");
      setValues({ name: "", email: "" });
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid gap-1">
        <label className="text-xs font-semibold text-zinc-300">Name</label>
        <input
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          placeholder="Your Name"
          autoComplete="name"
          maxLength={80}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-white/20"
        />
        {errors.name ? <p className="text-xs text-amber-200">{errors.name}</p> : null}
      </div>

      <div className="grid gap-1">
        <label className="text-xs font-semibold text-zinc-300">Email</label>
        <input
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          placeholder="Your Email"
          autoComplete="email"
          inputMode="email"
          maxLength={200}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-white/20"
        />
        {errors.email ? <p className="text-xs text-amber-200">{errors.email}</p> : null}
      </div>

      <button
        type="submit"
        disabled={!isValid || submitting}
        className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
