// app/(site)/layout.tsx
import Link from "next/link";
import AnnouncementBar from "@/components/announcement-bar";
import SiteNav from "@/components/site-nav";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-50">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="font-mono text-2xl tracking-tight text-zinc-100 hover:text-white"
          >
            himanshu_batra
          </Link>
          <SiteNav />
        </div>
        <AnnouncementBar />
      </header>

      <div>{children}</div>
    </div>
  );
}
