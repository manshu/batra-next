import NewsletterForm from "@/components/newsletter-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekly Meet Up",
  description: "Meet up on YouTube every Sunday evening at 1:00pm Eastern time.",
};

export default function MeetupPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 sm:p-10">
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Weekly
          </p>

          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Meet Up
          </h1>

          <p className="max-w-2xl text-pretty text-sm leading-6 text-zinc-300 sm:text-base">
            Let&apos;s learn and build community online. You can join live.
          </p>

          <p className="mt-2 rounded-2xl border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-200">
            Sundays • 1:00pm Eastern Time
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-6">
        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="space-y-4 text-sm leading-6 text-zinc-300 sm:text-base">
            <p>
              By connecting with like-minded individuals online, we can learn new things,
              gain valuable insights, and collaborate on projects, all from the comfort
              of our own homes.
            </p>
            <p>So I decided every Sunday afternoon at 1:00pm Eastern time.</p>
            <p>
              I&apos;ll do a one-hour Live Stream to talk about programming. These sessions
              are meant to be fun, informal and interactive.
            </p>
            <p>
              Once you fill out the form, you&apos;ll receive an email with a calendar link
              to join the zoom meeting.
            </p>
            <p>
              If you have a topic you&apos;d like to discuss and be a part of my live stream,
              please sign up. I&apos;ll be adding you to the list of people who can join me
              on the stream.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <NewsletterForm />
          </div>
        </article>
      </section>

      <footer className="mt-12 border-t border-white/5 pt-8 text-sm text-zinc-400">
        <p>© {new Date().getFullYear()} Himanshu Batra</p>
      </footer>
    </main>
  );
}
