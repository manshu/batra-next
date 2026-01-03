"use client";

import { useEffect } from "react";

type HourlyModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function HourlyModal({ isOpen, setIsOpen }: HourlyModalProps) {
  // Close on Escape + lock scroll
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);

    // lock scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label="Book an hourly consulting session"
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 cursor-default bg-black/60"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-[0_30px_120px_-60px_rgba(0,0,0,0.9)]">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
          <div>
            <p className="text-sm font-semibold text-zinc-100">
              Book a session
            </p>
            <p className="text-xs text-zinc-400">
              Calendly • Hourly consulting
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="h-[75vh] min-h-[520px] bg-zinc-950">
          <iframe
            title="Calendly booking"
            src="https://calendly.com/gurulabs/hourly?embed_domain=www.batra.dev&embed_type=PopupText&hide_event_type_details=1&hide_gdpr_banner=1&primary_color=ef4444"
            className="h-full w-full"
            allow="camera; microphone; fullscreen"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs text-zinc-400 sm:px-6">
          <span>Press ESC to close</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-lg px-2 py-1 hover:bg-white/5 hover:text-zinc-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
