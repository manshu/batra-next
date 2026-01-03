import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Apps and open-source projects by Himanshu Batra. Download on the App Store and explore on GitHub.",
};

type AppProject = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  logoSrc: string;
  website?: string;
  iosUrl: string;
  androidUrl?: string;
  badges: string[];
  highlights: string[];
};

type OSSProject = {
  id: string;
  name: string;
  description: string;
  repoUrl: string;
  language?: string;
  stars?: number;
  forks?: number;
};

const apps: AppProject[] = [
  {
    id: "my-trt-app",
    name: "My TRT App",
    subtitle: "TRT Calculator",
    description:
      "A personalized companion for managing testosterone replacement therapy. Track shots, log labs, review trends, and keep your protocol organized with a clean dashboard.",
    logoSrc: "/images/my-trt-app.png",
    website: "https://www.mytrt.app",
    iosUrl: "https://apps.apple.com/us/app/my-trt-app/id6745529127",
    androidUrl: "",
    badges: ["iPhone", "iPad", "Health & Fitness"],
    highlights: [
      "Shot logs",
      "Custom schedules",
      "TRT summary dashboard",
      "Lab tracking & trends",
    ],
  },
  {
    id: "peptides-calculator",
    name: "Peptides Calculator",
    subtitle: "Reconstitution Calculator",
    description:
      "A personal utility app to log, organize, and manage peptide preparation. Save vial records, keep notes, and calculate reconstitution details in a simple workflow.",
    logoSrc: "/images/peptides-calculator.webp",
    website: "https://www.peptidescalculator.app",
    iosUrl: "https://apps.apple.com/us/app/peptides-calculator/id6744431355",
    androidUrl: "https://www.peptidescalculator.app/app-release.apk",
    badges: ["iPhone", "iPad", "Apple Watch", "Health & Fitness"],
    highlights: [
      "Reconstitution calculations",
      "Vial records & logs",
      "Reference library",
      "Tracking & organization",
    ],
  },
];

const openSource: OSSProject[] = [
  {
    id: "reactjs-chrome-extension",
    name: "reactjs-chrome-extension",
    description:
      "A React + TypeScript Chrome extension template and starter to build quickly.",
    repoUrl: "https://github.com/manshu/reactjs-chrome-extension",
    language: "TypeScript",
    stars: 137,
    forks: 77,
  },
  {
    id: "laravel-angular2",
    name: "laravel-angular2",
    description: "Laravel + Angular boilerplate for full-stack projects.",
    repoUrl: "https://github.com/manshu/laravel-angular2",
    language: "TypeScript",
    stars: 17,
    forks: 15,
  },
  {
    id: "laravel-ddd",
    name: "laravel",
    description:
      "Laravel 9 Domain-Driven Development approach (vanilla, pragmatic structure).",
    repoUrl: "https://github.com/manshu/laravel",
    language: "PHP",
    stars: 13,
    forks: 7,
  },
  {
    id: "ddd-multi-tenancy",
    name: "ddd-multi-tenancy",
    description: "A DDD take on multi-tenancy patterns and structure.",
    repoUrl: "https://github.com/manshu/ddd-multi-tenancy",
    language: "JavaScript",
    stars: 10,
    forks: 4,
  },
  {
    id: "Laravel-Domain-Driven-Development",
    name: "Laravel-Domain-Driven-Development",
    description: "More DDD work and examples in Laravel.",
    repoUrl: "https://github.com/manshu/Laravel-Domain-Driven-Development",
    language: "PHP",
    stars: 6,
    forks: 8,
  },
  {
    id: "reactjs-chrome-extension-oauth2",
    name: "reactjs-chrome-extension-oauth2",
    description: "OAuth2 flows in a React Chrome extension.",
    repoUrl: "https://github.com/manshu/reactjs-chrome-extension-oauth2",
    language: "JavaScript",
    stars: 6,
    forks: 2,
  },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
      {children}
    </span>
  );
}

function ActionLink({
  href,
  children,
  variant = "soft",
  disabled = false,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "soft" | "primary" | "accent";
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition";
  const styles =
    variant === "primary"
      ? "bg-white text-zinc-950 hover:bg-zinc-100"
      : variant === "accent"
        ? "border border-amber-300/30 bg-amber-300/10 text-amber-200 hover:bg-amber-300/15"
        : "border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10";

  if (disabled || !href) {
    return (
      <span
        className={`${base} border border-white/10 bg-white/5 text-zinc-300 opacity-70`}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${styles}`}
    >
      {children}
      <span className="ml-2 opacity-70" aria-hidden>
        ↗
      </span>
    </a>
  );
}

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 sm:p-10">
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Apps</Badge>
            <Badge>Open Source</Badge>
            <Badge>Ship → Iterate</Badge>
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Projects
          </h1>

          <p className="max-w-2xl text-pretty text-sm leading-6 text-zinc-300 sm:text-base">
            A couple of apps I’ve authored, plus a selection of open-source work.
            If you want to collaborate, I’m always down to build.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="#apps"
              className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
            >
              Apps
            </Link>
            <Link
              href="#opensource"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
            >
              Open Source
            </Link>
            <a
              href="https://github.com/manshu"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
            >
              GitHub
              <span className="ml-2 opacity-70" aria-hidden>
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="apps" className="mt-10 sm:mt-14 scroll-mt-24">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Applications</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {apps.map((app) => (
            <div
              key={app.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <Image
                    src={app.logoSrc}
                    alt={`${app.name} logo`}
                    fill
                    sizes="56px"
                    className="object-contain p-2"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-zinc-100">
                        {app.name}
                      </p>
                      <p className="mt-1 text-sm text-zinc-300">{app.subtitle}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-zinc-300">
                    {app.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {app.badges.map((b) => (
                      <span
                        key={`${app.id}-${b}`}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {app.highlights.map((h) => (
                      <div
                        key={`${app.id}-${h}`}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-200"
                      >
                        {h}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <ActionLink href={app.website} variant="soft">
                      Website
                    </ActionLink>
                    <ActionLink href={app.iosUrl} variant="primary">
                      App Store
                    </ActionLink>
                    <ActionLink
                      href={app.androidUrl}
                      variant="accent"
                      disabled={!app.androidUrl}
                    >
                      {app.androidUrl ? "Google Play" : "Android (soon)"}
                    </ActionLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="opensource" className="mt-10 sm:mt-14 scroll-mt-24">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Open Source</h2>
          <p className="text-xs text-zinc-400">
            Popular repos from my GitHub profile
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {openSource.map((p) => (
            <a
              key={p.id}
              href={p.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-zinc-100 group-hover:text-white">
                    {p.name}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {p.description}
                  </p>
                </div>

                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-200 transition group-hover:translate-x-0.5 group-hover:bg-white/10">
                  →
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
                {p.language ? (
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold text-zinc-200">
                    {p.language}
                  </span>
                ) : null}

                {typeof p.stars === "number" ? (
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold text-zinc-200">
                    ★ {p.stars}
                  </span>
                ) : null}

                {typeof p.forks === "number" ? (
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold text-zinc-200">
                    ⑂ {p.forks}
                  </span>
                ) : null}
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-semibold text-zinc-100">
                Browse everything on GitHub
              </p>
              <p className="mt-1 text-sm text-zinc-300">
                Repos, templates, experiments, and utilities.
              </p>
            </div>

            <a
              href="https://github.com/manshu?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
            >
              View repositories
              <span className="ml-2 opacity-70" aria-hidden>
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
