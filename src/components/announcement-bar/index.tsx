"use client";

import { useState } from "react";
import Link from "next/link";

export default function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="border-b border-black/20 bg-amber-400 text-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-sm sm:px-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-black/10">
            ⚡
          </span>
          <p className="text-pretty">
            Big news! I am excited to announce a brand new{" "}
            <Link className="font-semibold underline underline-offset-2" href="/now">
              now
            </Link>{" "}
            page. Sign up for weekly live stream.
          </p>
        </div>

        <button
          aria-label="Dismiss announcement"
          onClick={() => setOpen(false)}
          className="rounded-lg px-2 py-1 hover:bg-black/10"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
