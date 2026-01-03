// app/(site)/page.tsx
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  {
    id: "about",
    title: "About me",
    href: "/about",
    description: "If you'd like to know more about me, head over to my page.",
  },
  {
    id: "now",
    title: "Now",
    href: "/now",
    description: "See what's currently going on with me.",
  },
  {
    id: "youtube",
    title: "YouTube",
    href: "https://www.youtube.com/@batraio",
    description: "You might find my shenanigans live on YouTube sometimes.",
  },
  {
    id: "meetup",
    title: "Meetup",
    href: "/meetup",
    description: "You're now able to join my live streams / meetup.",
  },
  {
    id: "consulting",
    title: "Consulting",
    href: "/consulting",
    description: "I do hourly consultations in my free time. Book yours.",
    cta: { label: "Book", href: "/consulting" },
  },
  {
    id: "astrology",
    title: "Astrology",
    href: "https://www.youtube.com/@batraio",
    description: "This might sound crazy, but I research about Vedic astrology.",
  },
  {
    id: "blog",
    title: "Blog",
    href: "/blog",
    description: "Checkout my blog about Laravel, RoR, and random stuff.",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 sm:p-10">
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="grid items-center gap-8 md:grid-cols-[220px,1fr]">
          <div className="flex justify-center md:justify-start">
            <div className="relative h-40 w-40 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)] sm:h-44 sm:w-44">
              <Image
                src="/images/profile.webp"
                alt="Portrait"
                fill
                className="h-full w-full object-contain"
                priority
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Open to collaboration & consulting
            </p>

            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Himanshu Batra
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-pretty text-sm leading-6 text-zinc-300 sm:text-base">
              project manager, software engineer, content-creator, and open source
              contributor. I&apos;m currently working on a{" "}
              <span className="font-semibold text-amber-300">#startup</span>.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
              >
                Projects
              </Link>
              <Link
                href="/consulting"
                className="inline-flex items-center justify-center rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-300/15"
              >
                Schedule a Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 sm:mt-14">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Start here</h2>
          <p className="text-xs text-zinc-400">Quick links to everything on the site</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-zinc-100 group-hover:text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {item.description}
                  </p>
                </div>

                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-200 transition group-hover:translate-x-0.5 group-hover:bg-white/10">
                  →
                </span>
              </div>

              {item.cta ? (
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-200">
                  {item.cta.label}
                  <span className="opacity-80">↗</span>
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </section>

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
            <Link className="hover:text-zinc-200" href="/consulting">
              Consulting
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
