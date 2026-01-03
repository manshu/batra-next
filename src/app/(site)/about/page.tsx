import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "About - Himanshu Batra, PMP",
};

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-50">
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 sm:p-10">
          <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />

          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            About
          </p>

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            A little more about me.
          </h1>

          <p className="mt-4 max-w-2xl text-pretty text-sm leading-6 text-zinc-300 sm:text-base">
            Background, approach, vision — and two very important dogs.
          </p>
        </section>

        {/* Content */}
        <section className="mt-10 grid gap-6">
          <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">My Experience</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300 sm:text-base">
              With over 12 years of managing complex systems integration and
              software development projects, my experience is known in the
              industry for innovative approaches to solving common security and
              project management problems. I am currently pursuing an MBA in Cyber
              Security Management &amp; Policy and graduated from Old Dominion
              University, Norfolk Virginia with Bachelors Business Administration
              (Major in Information technology and minor in marketing).
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">Why Me?</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300 sm:text-base">
              The projects that I plan to take on are industry agnostic and what
              drives me to essentially to take up a project in the first place is
              its viability to put my theories into executable action. Well-versed
              in project management methodologies, process engineering,
              organizational change management, risk management, project planning,
              team building, communication, and technical implementations of
              organizational change, software projects, network operating systems,
              and web development projects to name a few. The projects that I plan
              to take on are industry agnostic and what drives me to essentially
              to take up a project in the first place is its viability to put my
              theories into executable action.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">My Vision</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300 sm:text-base">
              My vision is to be able to deliver projects on time by applying my
              reasoning skills that I have amplified over the vast years of work
              experience in similar field and deliver value for money. I have a
              pragmatic approach towards task execution, transparent
              communication, performance enhancement and develop state-of-the-art
              application infrastructure for both public and private sector
              players. Overall, I want to strive to help companies develop
              software applications that eventually make for a good product to be
              taken to the market with scalability, reliability and problem
              solving skills to be the main pillars of its performance.
            </p>
          </article>

          {/* Dogs */}
          <div className="grid gap-6 md:grid-cols-2">
            <figure className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-[467/288] w-full">
                <Image
                  src="/images/shiva.png"
                  alt="Shiva"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
              </div>
              <figcaption className="p-5">
                <p className="text-sm font-semibold text-zinc-100">
                  Meet Shiva
                  <span className="ml-2 text-xs font-normal text-zinc-400">
                    — 12-12-20
                  </span>
                </p>
              </figcaption>
            </figure>

            <figure className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-[467/288] w-full">
                <Image
                  src="/images/rudra.png"
                  alt="Rudra the German Shepard Dog"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
              </div>
              <figcaption className="p-5">
                <p className="text-sm font-semibold text-zinc-100">
                  Meet Rudra
                  <span className="ml-2 text-xs font-normal text-zinc-400">
                    — 02-14-20
                  </span>
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Footer mini */}
        <footer className="mt-12 border-t border-white/5 pt-8 text-sm text-zinc-400">
          <p>© {new Date().getFullYear()} Himanshu Batra</p>
        </footer>
      </main>
    </div>
  );
}
