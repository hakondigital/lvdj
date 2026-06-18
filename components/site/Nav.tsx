"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LvMark } from "@/components/ui/LvMark";
import { Equalizer } from "@/components/ui/Equalizer";

const LINKS = [
  { href: "#reel", label: "Reel" },
  { href: "#packages", label: "Packages" },
  { href: "#about", label: "About" },
  { href: "#book", label: "Book" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-colors duration-300",
        scrolled
          ? "bg-ink/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <LvMark size={36} tone="gold" />
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-tightest text-bone">
              LV<span className="text-gold">·</span>DJ
            </span>
            <span className="font-mono text-[10px] tracking-ultra text-bone-dim mt-0.5">
              SYDNEY
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 font-head text-base tracking-[0.18em] text-bone/70 hover:text-bone transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book"
            className="ml-3 group relative inline-flex items-center gap-2 bg-gold text-ink px-5 py-2.5 font-head text-base tracking-[0.18em]"
          >
            <Equalizer bars={4} className="h-3" barClassName="bg-ink" />
            Book a night
          </a>
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex flex-col items-center justify-center gap-1.5 h-11 w-11 -mr-2 text-bone"
        >
          <span
            className={cn(
              "block h-[2px] w-6 bg-current transition-transform",
              open && "translate-y-[7px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-[2px] w-6 bg-current transition-opacity",
              open && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-[2px] w-6 bg-current transition-transform",
              open && "-translate-y-[7px] -rotate-45"
            )}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-[max-height] duration-300 ease-out border-b border-white/5 bg-ink/95 backdrop-blur",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="px-5 py-3 flex flex-col">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center min-h-[52px] font-head text-2xl tracking-[0.12em] text-bone border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className="mt-4 mb-2 inline-flex items-center justify-center min-h-[56px] bg-gold text-ink font-head text-xl tracking-[0.18em]"
          >
            Book a night →
          </a>
        </div>
      </div>
    </header>
  );
}
