"use client";

import { motion } from "framer-motion";

const STATS: Array<{ value: string; label: string }> = [
  { value: "50+", label: "Gigs Played" },
  { value: "1.1K", label: "Followers" },
  { value: "100%", label: "Crowd Energy" },
  { value: "$350", label: "From / Night" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10 items-start">
          {/* Section label */}
          <div className="md:col-span-3">
            <div className="font-mono text-[11px] tracking-ultra text-gold uppercase mb-3">
              Profile · Loukas V
            </div>
            <h2 className="font-display text-5xl md:text-6xl tracking-tightest leading-[0.9] text-bone">
              The DJ behind the desk.
            </h2>
          </div>

          {/* Body */}
          <div className="md:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-bone text-xl md:text-2xl leading-snug max-w-2xl"
            >
              I'm <span className="text-gold">Loukas</span> — better known as
              LV DJ. I run open-format sets across Sydney: hip-hop, house,
              throwbacks, current bangers, and the requests you swore you'd
              never play out loud.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="mt-6 text-bone-dim text-base md:text-lg leading-relaxed max-w-2xl"
            >
              From 16ths in the back garden to club afters at 3am, the brief
              is the same: read the room, build the energy, hold the floor.
              Three flat-rate packages — pick the one that fits your night.
            </motion.p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {[
                "Open-format",
                "Pioneer rig",
                "MC capable",
                "Lights + lasers",
                "Sydney-wide",
              ].map((tag) => (
                <li
                  key={tag}
                  className="px-3 py-1.5 border border-white/15 text-bone/80 font-mono text-[11px] tracking-[0.2em] uppercase"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="md:col-span-3 grid grid-cols-2 gap-x-8 gap-y-6 md:gap-x-6 md:gap-y-7 md:border-l md:border-white/10 md:pl-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="py-2 pr-2 min-w-0">
                <div className="font-display text-4xl md:text-5xl text-gold leading-none tracking-tightest tabular-nums">
                  {stat.value}
                </div>
                <div className="mt-2 font-mono text-[10px] tracking-ultra text-bone-dim uppercase whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
