import Link from "next/link";
import { LvMark } from "@/components/ui/LvMark";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-50/40 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <LvMark size={56} tone="gold" />
              <div>
                <div className="font-display text-3xl tracking-tightest text-bone leading-none">
                  LV<span className="text-gold">·</span>DJ
                </div>
                <div className="font-mono text-[10px] tracking-ultra text-bone-dim mt-1">
                  SYDNEY · OPEN FORMAT · BOOKABLE
                </div>
              </div>
            </div>
            <p className="mt-6 text-bone-dim text-sm max-w-sm leading-relaxed">
              "I make your bad decisions sound better." Sydney's open-format DJ
              for parties, formals, afters and the inevitable lock-in club night.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[10px] tracking-ultra text-bone-dim uppercase mb-3">
              Navigate
            </div>
            <ul className="space-y-2">
              {[
                { href: "#packages", label: "Packages" },
                { href: "#about", label: "About" },
                { href: "#book", label: "Book a night" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-head text-xl tracking-[0.12em] text-bone hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono text-[10px] tracking-ultra text-bone-dim uppercase mb-3">
              Find Me
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/lv._.dj/"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 font-head text-xl tracking-[0.12em] text-bone hover:text-gold transition-colors"
                >
                  <InstagramIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  @lv._.dj
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/loukas_.v._/"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 font-head text-xl tracking-[0.12em] text-bone hover:text-gold transition-colors"
                >
                  <InstagramIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  @loukas_.v._
                </a>
              </li>
              <li>
                <Link
                  href="#book"
                  className="font-head text-xl tracking-[0.12em] text-bone hover:text-gold transition-colors"
                >
                  Booking form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[10px] tracking-ultra text-bone-dim uppercase">
          <span>© {new Date().getFullYear()} LV DJ — Loukas V. All sets reserved.</span>
          <span>Built loud. Sydney AU.</span>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
