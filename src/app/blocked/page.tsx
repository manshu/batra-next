import BlockedAccessForm from "./blocked-access-form";
import Link from "next/link";

export default function BlockedPage() {
  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-50">
      <main className="mx-auto flex min-h-dvh max-w-4xl items-center px-4 py-12 sm:px-6">
        <section className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 sm:p-10">
          <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />

          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/10">
                🌍
              </span>
              Region restricted
            </div>

            <div>
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Not available in your region
              </h1>
              <p className="mt-3 max-w-2xl text-pretty text-sm leading-6 text-zinc-300 sm:text-base">
                This site is currently accessible only in selected countries. If
                you believe you&apos;re seeing this in error, fill out the form
                below and I&apos;ll get back to you.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm font-semibold text-zinc-100">
                  Why am I blocked?
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Access is limited by region (based on your network location).
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm font-semibold text-zinc-100">
                  Want access?
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  If you&apos;re a collaborator, client, or invited guest, request
                  access below.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <BlockedAccessForm />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
              >
                Back to home
              </Link>

              <Link
                href="/consulting"
                className="inline-flex items-center justify-center rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-300/15"
              >
                Contact / Consulting
              </Link>
            </div>

            <p className="text-xs text-zinc-500">
              Tip: If you&apos;re using a VPN, try disabling it and refresh.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
