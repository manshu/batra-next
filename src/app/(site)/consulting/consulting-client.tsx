"use client";

import { useState } from "react";
import Link from "next/link";
import HourlyModal from "@/components/hourly-modal"; // adjust path if needed

export default function ConsultingClient() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-50">
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 sm:p-10">
          <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />

          <div className="flex flex-col gap-4">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Consulting
            </p>

            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Consulting
            </h1>
            <p className="max-w-2xl text-pretty text-base leading-6 text-zinc-300 sm:text-lg">
              Take one step at a time.
            </p>

            <div className="mt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setModalIsOpen(true)}
                className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-300"
              >
                Book a session
              </button>

              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
              >
                View projects
              </Link>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mt-10 grid gap-6">
          {/* Card: Coaching */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">
              One-on-One Coaching
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300 sm:text-base">
              Everyone starts somewhere. As a part of One-on-One coaching, we
              dive into streamlining your workflows and automate your processes
              from scratch. Book a session{" "}
              <button
                type="button"
                onClick={() => setModalIsOpen(true)}
                className="font-semibold text-amber-200 underline underline-offset-4 hover:text-amber-100"
              >
                here
              </button>
              .
            </p>
          </div>

          {/* Card: Strategic Tooling */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">
              Strategic Tooling
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300 sm:text-base">
              Having trouble organizing your sales{" "}
              <button
                type="button"
                onClick={() => setModalIsOpen(true)}
                className="font-semibold text-amber-200 underline underline-offset-4 hover:text-amber-100"
              >
                customer relationship management
              </button>{" "}
              (CRM) tool? Let me help you strategically customize your stack.
            </p>
          </div>

          {/* Card: Optimizing & Training */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">
              Optimizing &amp; Training
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300 sm:text-base">
              Unlimited tools keep your team always in a dilemma to pick the
              right tool. Let me help your team decide and utilize the best
              tools available.
            </p>
          </div>

          {/* Topics */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight">
                Topics I can consult you on
              </h2>
              <Link
                href="/consulting"
                className="text-sm font-semibold text-zinc-400 hover:text-zinc-200"
                aria-label="Permalink to consulting topics"
              >
                #
              </Link>
            </div>

            <ul className="mt-4 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2 sm:text-base">
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                Project Management Framework (Waterfall, Agile, Scrum)
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                Project Management Tooling (Asana, BreezePM, Todoist)
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                CRM Consulting (Pipedrive, HubSpot, SalesForce)
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                APIs &amp; Automation (Zapier, Integromat, Pipedream)
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                Backend Development (Laravel, Ruby on Rails)
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                Frontend Development (VueJS, ReactJS, NextJS, Vite, Webpack)
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                Amazon Web Services (Tooling &amp; Automation - Docker)
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                Search Engine Optimization (On-Page, Off-Page, Link Building)
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                Ethical Hacking (Tooling &amp; Techniques)
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                Astrology &amp; Ayurveda
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setModalIsOpen(true)}
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
              >
                Book a session
              </button>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
              >
                Learn more about me
              </Link>
            </div>
          </div>
        </section>

        {/* Footer mini */}
        <footer className="mt-12 border-t border-white/5 pt-8 text-sm text-zinc-400">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Himanshu Batra</p>
            <div className="flex gap-4">
              <Link className="hover:text-zinc-200" href="/blog">
                Blog
              </Link>
              <Link className="hover:text-zinc-200" href="/meetup">
                Meetup
              </Link>
              <button
                type="button"
                onClick={() => setModalIsOpen(true)}
                className="hover:text-zinc-200"
              >
                Book
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* Modal */}
      <HourlyModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
    </div>
  );
}
