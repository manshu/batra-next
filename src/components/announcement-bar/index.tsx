// components/announcement-bar.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function AnnouncementBar() {
  const monthNames = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  const [show, setShow] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("show");
    if (v === "false") setShow(false);
    else setShow(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("show", show ? "true" : "false");
  }, [show]);

  const handleClose = () => setShow(false);

  if (!show) return null;

  const month = monthNames[new Date().getMonth()];
  const year = new Date().getFullYear();

  return (
    <div className="bg-amber-500 text-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600 text-white">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </span>

            <p className="min-w-0 text-sm font-medium">
              <span className="truncate md:hidden">
                Website Updated {month} {year}!
              </span>

              <span className="hidden md:inline">
                Big news! I am excited to announce a brand new{" "}
                <Link href="/now" className="font-semibold underline underline-offset-2">
                  now page
                </Link>
                . Sign up for{" "}
                <Link href="/meetup" className="font-semibold underline underline-offset-2">
                  weekly live stream
                </Link>
                .
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center justify-center rounded-xl p-2 text-zinc-950 hover:bg-amber-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Dismiss announcement"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
