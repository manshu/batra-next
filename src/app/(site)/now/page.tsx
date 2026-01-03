import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Now",
  description: "Check out what Himanshu is upto now.",
};

const completedProjects = [
  {
    title: "Peptides Calculator",
    href: "https://www.peptidescalculator.app/",
    label: "/application/",
  },
  {
    title: "My TRT App",
    href: "https://www.mytrt.app",
    label: "/application/",
  },
];

const pipeline = [
  "Updating Soon",
  "",
];

const languages = ["Javascript", "Ruby", "PHP"];

const currentStack = ["InertiaJS", "Laravel", "MySql", "Nginx", "Tailwind CSS"];

const favFrontend = ["ReactJS", "VueJS", "NextJS", "NuxtJS"];

const favBackend = ["Laravel", "Ruby on Rails", "NodeJS/Express"];

const learning = ["ReactJS", "NodeJS"];

const webAppStack = [
  "Pipedrive",
  "Zapier",
  "Lemlist",
  "Intercom",
  "Unbounce",
  "Outranking",
  "Neuraltext",
  "Nichesss",
  "Frase",
];

const gear = [
  "Sony A7iii",
  "Glaxy Z Fold 2",
  "Apple iPhone 17 Max Pro",
  "iPad 6th Gen 2TB",
  "MacBook Pro M4 - 128GB RAM, 4 TB HD",
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <Link
          href={`/now#${id}`}
          className="text-sm font-semibold text-zinc-400 hover:text-zinc-200"
          aria-label={`Permalink to ${title}`}
        >
          #
        </Link>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function PillList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 text-sm text-zinc-300 sm:grid-cols-2 sm:text-base">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
        >
        </li>
      ))}
    </ul>
  );
}

export default function NowPage() {
  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-50">
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 sm:p-10">
          <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />

          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Now
          </p>

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            What I am currently up to and interested in.
          </h1>

          <p className="mt-4 max-w-2xl text-pretty text-sm leading-6 text-zinc-300 sm:text-base">
            I&apos;m currently working on a{" "}
            <a
              href="https://www.crmgurus.net"
              className="font-semibold text-amber-200 underline underline-offset-4 hover:text-amber-100"
              target="_blank"
              rel="noreferrer"
            >
              #startup
            </a>
            .
          </p>

          {/* quick anchors */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              ["completed", "Completed"],
              ["pipeline", "Pipeline"],
              ["languages", "Languages"],
              ["stack", "Stack"],
              ["frontend", "Frontend"],
              ["backend", "Backend"],
              ["learning", "Learning"],
              ["webapps", "Web apps"],
              ["gear", "Gear"],
            ].map(([id, label]) => (
              <Link
                key={id}
                href={`/now#${id}`}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/10"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* Content */}
        <section className="mt-10 grid gap-6">
          <Section id="completed" title="Completed Projects">
            <ul className="space-y-3 text-sm text-zinc-300 sm:text-base">
              {completedProjects.map((p) => (
                <li
                  key={p.href}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-medium text-zinc-100">{p.title}</span>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-fit items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-semibold text-amber-200 hover:bg-amber-300/15"
                    >
                      {p.label} <span aria-hidden>↗</span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="pipeline" title="What's in the Pipeline">
            <PillList items={pipeline} />
          </Section>

          <Section id="languages" title="Languages I've mastered">
            <div className="mb-4 text-xs text-zinc-400">
              Inspired by{" "}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-zinc-300 underline underline-offset-4 hover:text-zinc-100"
              >
                nownownow.com
              </a>
            </div>
            <PillList items={languages} />
          </Section>

          <Section id="stack" title="My current stack">
            <PillList items={currentStack} />
          </Section>

          <Section id="frontend" title="Favorite Frontend Framework">
            <PillList items={favFrontend} />
          </Section>

          <Section id="backend" title="Favorite Backend Framework">
            <PillList items={favBackend} />
          </Section>

          <Section id="learning" title="I am currently learning">
            <PillList items={learning} />
          </Section>

          <Section id="webapps" title="My current web app stack">
            <PillList items={webAppStack} />
          </Section>

          <Section id="gear" title="My current gear">
            <PillList items={gear} />
          </Section>
        </section>

        {/* Footer mini */}
        <footer className="mt-12 border-t border-white/5 pt-8 text-sm text-zinc-400">
          <p>© {new Date().getFullYear()} Himanshu Batra</p>
        </footer>
      </main>
    </div>
  );
}
