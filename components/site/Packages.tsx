"use client";

import { motion } from "framer-motion";
import { PACKAGES, type PackageInfo, type PackageTier } from "@/data/packages";
import { cn } from "@/lib/utils";

interface TierTheme {
  border: string;
  hoverBorder: string;
  accent: string;
  ring: string;
  badge: string;
  bullet: string;
  cta: string;
  ctaHover: string;
  glow: string;
  label: string;
}

const THEMES: Record<PackageTier, TierTheme> = {
  bronze: {
    border: "border-bronze/30",
    hoverBorder: "group-hover:border-bronze",
    accent: "text-bronze-light",
    ring: "shadow-[inset_0_0_0_1px_rgba(184,115,51,0.25)]",
    badge: "bg-bronze/15 text-bronze-light border-bronze/40",
    bullet: "bg-bronze",
    cta: "border-bronze-light/40 text-bronze-light",
    ctaHover: "hover:bg-bronze hover:text-ink hover:border-bronze",
    glow: "from-bronze/15",
    label: "Tier · Bronze",
  },
  silver: {
    border: "border-silver/30",
    hoverBorder: "group-hover:border-silver",
    accent: "text-silver-light",
    ring: "shadow-[inset_0_0_0_1px_rgba(213,213,216,0.25)]",
    badge: "bg-silver/15 text-silver-light border-silver/40",
    bullet: "bg-silver",
    cta: "border-silver-light/40 text-silver-light",
    ctaHover: "hover:bg-silver hover:text-ink hover:border-silver",
    glow: "from-silver/15",
    label: "Tier · Silver",
  },
  gold: {
    border: "border-gold/40",
    hoverBorder: "group-hover:border-gold",
    accent: "text-gold-light",
    ring: "shadow-[inset_0_0_0_1px_rgba(233,196,106,0.35)]",
    badge: "bg-gold/15 text-gold-light border-gold/50",
    bullet: "bg-gold",
    cta: "bg-gold border-gold text-ink",
    ctaHover: "hover:bg-gold-light",
    glow: "from-gold/25",
    label: "Tier · Gold",
  },
};

export function Packages() {
  return (
    <section id="packages" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 -z-10 h-96 w-[60rem] rounded-full bg-gold/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 md:mb-16">
          <div className="max-w-3xl">
            <div className="font-mono text-[11px] tracking-ultra text-gold uppercase mb-3">
              Rates · Rigs · Run-Sheet
            </div>
            <h2 className="font-display text-6xl md:text-8xl tracking-tightest leading-[0.85] text-bone">
              The <span className="text-gold">packages</span>.
            </h2>
          </div>
          <p className="max-w-sm text-bone-dim text-sm md:text-base leading-relaxed">
            Flat-rate. No hidden setup fees. Travel within Sydney
            included. Custom rigs and longer sets quoted on request.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-5">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        <p className="mt-10 font-mono text-[11px] tracking-ultra text-bone-dim uppercase text-center md:text-left">
          * Sydney included · All payment methods accepted
        </p>
      </div>
    </section>
  );
}

interface PackageCardProps {
  pkg: PackageInfo;
  index: number;
}

function PackageCard({ pkg, index }: PackageCardProps) {
  const theme = THEMES[pkg.id];
  const isGold = pkg.id === "gold";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative isolate flex flex-col bg-ink-50/60 backdrop-blur-sm border transition-colors duration-300",
        theme.border,
        theme.hoverBorder,
        theme.ring,
        isGold && "md:-translate-y-6 md:scale-[1.04] shadow-[0_30px_80px_-20px_rgba(233,196,106,0.35)]"
      )}
    >
      {/* Gold "Bestseller" ribbon — sits above the card on top-right */}
      {isGold && (
        <div className="absolute -top-3 right-4 md:-top-4 md:right-6 z-20">
          <span className="inline-flex items-center gap-1.5 bg-gold text-ink px-3 py-1.5 font-head text-xs md:text-sm tracking-[0.18em] uppercase shadow-lg shadow-gold/30">
            ★ Bestseller
          </span>
        </div>
      )}

      {/* Inner gradient glow */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500 bg-gradient-to-b",
          theme.glow,
          "to-transparent",
          isGold ? "opacity-90" : "opacity-50 group-hover:opacity-100"
        )}
      />

      {/* Header strip */}
      <header className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/5">
        <span
          className={cn(
            "inline-flex items-center gap-2 px-2.5 py-1 border font-mono text-[10px] tracking-ultra uppercase",
            theme.badge
          )}
        >
          {theme.label}
        </span>
      </header>

      {/* Body */}
      <div className="px-6 py-7 flex-1 flex flex-col">
        <div className="flex items-baseline gap-3">
          <h3 className={cn("font-display text-6xl md:text-7xl leading-none tracking-tightest", theme.accent)}>
            {pkg.name}
          </h3>
        </div>
        <p className="mt-2 font-head text-2xl tracking-[0.05em] text-bone">
          {pkg.tagline}
        </p>

        <div className="mt-6 flex items-baseline gap-2">
          <span className={cn("font-display text-5xl md:text-6xl tracking-tightest", theme.accent)}>
            ${pkg.price}
          </span>
          <span className="font-mono text-xs tracking-ultra text-bone-dim uppercase">
            / night
          </span>
        </div>

        <p className="mt-5 text-bone-dim text-sm md:text-base leading-relaxed">
          {pkg.blurb}
        </p>

        <ul className="mt-6 space-y-2.5">
          {pkg.inclusions.map((inc) => (
            <li key={inc} className="flex items-start gap-3 text-bone text-sm">
              <span className={cn("mt-1.5 inline-block h-1.5 w-3 shrink-0", theme.bullet)} />
              {inc}
            </li>
          ))}
        </ul>

        <div className="mt-7 pt-5 border-t border-white/5">
          <div className="font-mono text-[10px] tracking-ultra text-bone-dim uppercase mb-2">
            Best For
          </div>
          <p className="text-bone/90 text-sm leading-relaxed">{pkg.bestFor}</p>
        </div>
      </div>

      <footer className="px-6 pb-6">
        <a
          href="#book"
          className={cn(
            "inline-flex items-center justify-center gap-2 w-full min-h-[52px] py-3.5 border font-head text-base sm:text-lg tracking-[0.18em] transition-all duration-200",
            theme.cta,
            theme.ctaHover
          )}
        >
          Book {pkg.name} →
        </a>
      </footer>
    </motion.article>
  );
}
