import Link from "next/link";

const links = [
  { label: "blog", href: "/blog" },
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "meetup", href: "/meetup" },
  { label: "consulting", href: "/consulting" },
];

export default function SiteNav() {
  return (
    <nav className="flex items-center gap-2">
      <div className="hidden items-center gap-1 sm:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
          >
            {l.label}
          </Link>
        ))}
      </div>

      <Link
        href="/consulting"
        className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-300"
      >
        Schedule a Call
      </Link>
    </nav>
  );
}
