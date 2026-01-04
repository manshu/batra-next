// app/(site)/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on software, products, and building in public.",
};

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  publishedAt?: string;
  updatedAt?: string;
};

function toISODate(input: any): string | undefined {
  if (!input) return undefined;
  if (typeof input === "string") return input;
  if (input?.toDate) return input.toDate().toISOString();
  if (input?.seconds) return new Date(input.seconds * 1000).toISOString();
  return undefined;
}

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}

function safeArray(value: any): string[] {
  return Array.isArray(value) ? value.filter(Boolean).map(String) : [];
}

function clampText(s: any, n: number) {
  const str = (s ?? "").toString().trim();
  return str.length > n ? str.slice(0, n) : str;
}

function normSlug(v: any): string {
  return (v ?? "").toString().trim();
}

async function getPosts(): Promise<Post[]> {
  const snap = await adminDb
    .collection("posts")
    .where("published", "==", true)
    .orderBy("publishedAt", "desc")
    .limit(50)
    .get();

  return snap.docs
    .map((doc) => {
      const data = doc.data() as any;
      const slug = normSlug(data.slug || doc.id);
      const title = (data.title || "Untitled").toString();

      return {
        id: doc.id,
        slug,
        title,
        excerpt: clampText(data.excerpt || data.summary || "", 220),
        tags: safeArray(data.tags),
        publishedAt: toISODate(data.publishedAt),
        updatedAt: toISODate(data.updatedAt),
      };
    })
    .filter((p) => p.slug.length > 0);
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
      {children}
    </span>
  );
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 sm:p-10">
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Tag>Blog</Tag>
            <Tag>Build</Tag>
            <Tag>Ship</Tag>
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Writing
          </h1>

          <p className="max-w-2xl text-pretty text-sm leading-6 text-zinc-300 sm:text-base">
            Notes from building products, engineering, consulting, and whatever I’m currently obsessed with.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
            >
              Projects
            </Link>
            <Link
              href="/now"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
            >
              Now
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 sm:mt-14">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Latest posts</h2>
          <p className="text-xs text-zinc-400">{posts.length} posts</p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-zinc-300">
            No posts yet.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${encodeURIComponent(p.slug)}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-zinc-100 group-hover:text-white">
                      {p.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      {p.excerpt || "Read more…"}
                    </p>
                  </div>

                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-200 transition group-hover:translate-x-0.5 group-hover:bg-white/10">
                    →
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {p.publishedAt ? (
                    <span className="text-xs font-semibold text-zinc-400">
                      {formatDate(p.publishedAt)}
                    </span>
                  ) : null}

                  {p.tags?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {p.tags.slice(0, 3).map((t) => (
                        <span
                          key={`${p.id}-${t}`}
                          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-zinc-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
