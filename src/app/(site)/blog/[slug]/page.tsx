// app/(site)/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";
export const revalidate = 60;

type PostDoc = {
  slug?: string;
  title?: string;
  excerpt?: string;
  tags?: string[];
  published?: boolean;
  publishedAt?: any;
  updatedAt?: any;
  content?: string;
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
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

function safeArray(value: any): string[] {
  return Array.isArray(value) ? value.filter(Boolean).map(String) : [];
}

function renderPlaintextToParagraphs(text: string) {
  const blocks = text
    .split(/\n{2,}/g)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4">
      {blocks.map((b, idx) => (
        <p key={idx} className="leading-7 text-zinc-200">
          {b}
        </p>
      ))}
    </div>
  );
}

function normalizeSlug(raw: any): string {
  if (typeof raw !== "string") return "";
  try {
    return decodeURIComponent(raw).trim();
  } catch {
    return raw.trim();
  }
}

async function getPostBySlug(slug: string): Promise<{ id: string; data: PostDoc } | null> {
  const s = (slug ?? "").toString().trim();
  if (!s) return null;

  const q = await adminDb.collection("posts").where("slug", "==", s).limit(1).get();
  if (!q.empty) {
    const doc = q.docs[0];
    return { id: doc.id, data: doc.data() as PostDoc };
  }

  const byId = await adminDb.collection("posts").doc(s).get();
  if (byId.exists) return { id: byId.id, data: byId.data() as PostDoc };

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string }>;
}): Promise<Metadata> {
  const p = await params;
  const slug = normalizeSlug(p?.slug);
  if (!slug) return { title: "Post not found" };

  const result = await getPostBySlug(slug);
  if (!result) return { title: "Post not found" };

  const post = result.data;
  return {
    title: post.title || "Blog post",
    description: post.excerpt || "Blog post",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  const p = await params;
  const slug = normalizeSlug(p?.slug);
  if (!slug) notFound();

  const result = await getPostBySlug(slug);
  if (!result) notFound();

  const post = result.data;
  if (post.published === false) notFound();

  const publishedAt = toISODate(post.publishedAt);
  const updatedAt = toISODate(post.updatedAt);
  const tags = safeArray(post.tags);
  const content = (post.content || "").toString().trim();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
        >
          <span aria-hidden>←</span>
          Back
        </Link>

        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          {publishedAt ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold text-zinc-200">
              {formatDate(publishedAt)}
            </span>
          ) : null}
          {updatedAt ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold text-zinc-200">
              Updated {formatDate(updatedAt)}
            </span>
          ) : null}
        </div>
      </div>

      <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 sm:p-10">
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />

        <header>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title || "Untitled"}
          </h1>

          {post.excerpt ? (
            <p className="mt-4 text-pretty text-sm leading-6 text-zinc-300 sm:text-base">
              {post.excerpt}
            </p>
          ) : null}

          {tags.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          {content ? (
            renderPlaintextToParagraphs(content)
          ) : (
            <p className="text-sm text-zinc-300">
              No content yet. Add a <span className="font-mono text-zinc-200">content</span> field in Firestore.
            </p>
          )}
        </div>
      </article>
    </main>
  );
}
