"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Equalizer } from "@/components/ui/Equalizer";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: photo drifts up faster than the headline, headline drifts a bit
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden pt-24 md:pt-28"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 -z-20 bg-grid opacity-50" />
      <div className="absolute inset-0 -z-20 scanlines opacity-25" />
      <div className="absolute -top-40 -left-32 -z-10 h-[42rem] w-[42rem] rounded-full bg-neon-violet/20 blur-[140px] animate-pulse-glow" />
      <div className="absolute -bottom-40 -right-32 -z-10 h-[40rem] w-[40rem] rounded-full bg-neon-pink/20 blur-[160px] animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 h-[24rem] w-[24rem] rounded-full bg-gold/10 blur-[120px]" />
      <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-10 md:pt-14 pb-16 relative">
        {/* Top status strip */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between gap-4 mb-10 md:mb-12"
        >
          <div className="flex items-center gap-3 text-xs font-mono tracking-ultra text-bone-dim uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-neon-pink opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-pink" />
            </span>
            On the decks · Sydney
          </div>
          <div className="hidden md:flex items-center gap-3 text-xs font-mono tracking-ultra text-bone-dim uppercase">
            Booking · Summer 26/27
          </div>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
          {/* Headline column */}
          <motion.div
            style={{ y: headlineY, opacity: headlineOpacity }}
            className="md:col-span-8 relative"
          >
            {/* Background giant letters */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-6 md:-top-10 left-0 font-display text-[36vw] md:text-[16vw] leading-none text-stroke-gold opacity-[0.06] select-none whitespace-nowrap"
            >
              LV·DJ
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative font-display tracking-tightest leading-[0.84] text-bone"
            >
              <span className="block text-[18vw] md:text-[11vw] lg:text-[9.5rem]">
                LATE NIGHTS.
              </span>
              <span className="block text-[18vw] md:text-[11vw] lg:text-[9.5rem]">
                <span className="text-stroke">LOUD</span> ROOMS.
              </span>
              <span className="block text-[18vw] md:text-[11vw] lg:text-[9.5rem]">
                <span className="relative inline-block">
                  SYDNEY.
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-2 md:bottom-3 h-2 md:h-3 bg-gold/85 -z-10 -skew-x-6"
                  />
                </span>
              </span>
            </motion.h1>

            {/* Sub copy + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              className="mt-9 md:mt-12 grid gap-7 md:grid-cols-[1.5fr_auto_1fr] md:items-end"
            >
              <p className="max-w-xl text-bone-dim text-base md:text-lg leading-relaxed">
                Sydney open-format DJ. Booking 16ths, 17ths, 18ths, 21sts,
                engagements, formals, afters and club nights. Three packages,
                one job — keep the floor moving.
              </p>

              <div className="hidden md:block h-16 w-px bg-white/10" />

              <div className="flex flex-col gap-3 md:items-end">
                <a
                  href="#book"
                  className="group relative inline-flex items-center justify-center gap-3 bg-gold text-ink px-6 py-4 font-head text-base sm:text-lg tracking-[0.18em] overflow-hidden w-full sm:w-auto min-h-[52px]"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-white/30 group-hover:animate-sweep"
                  />
                  <Equalizer bars={5} className="h-4 relative" barClassName="bg-ink" />
                  <span className="relative">Book a night</span>
                </a>
                <div className="font-mono text-[10px] tracking-ultra text-bone-dim uppercase text-center sm:text-left md:text-right">
                  From $350 · DM @lv._.dj
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Photo card — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: photoY, scale: photoScale }}
            className="hidden md:block md:col-span-4 relative aspect-[3/4] will-change-transform"
          >
            <div className="absolute inset-0 -rotate-[3deg]">
              <div className="absolute -inset-2 border border-gold/40" />
            </div>
            <div className="absolute inset-0 -rotate-[3deg] overflow-hidden">
              <Image
                src="/gigs/gig-4-deck.jpg"
                alt="LV DJ on the decks with crowd cheering"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-ink/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              {/* Inner corner ticks */}
              <span className="absolute top-3 left-3 h-3 w-3 border-l-2 border-t-2 border-gold" />
              <span className="absolute top-3 right-3 h-3 w-3 border-r-2 border-t-2 border-gold" />
              <span className="absolute bottom-3 left-3 h-3 w-3 border-l-2 border-b-2 border-gold" />
              <span className="absolute bottom-3 right-3 h-3 w-3 border-r-2 border-b-2 border-gold" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom marker */}
      <div className="absolute bottom-6 inset-x-0 flex items-center justify-between px-5 md:px-8 font-mono text-[10px] tracking-ultra text-bone-dim uppercase">
        <span>00 / Intro</span>
        <span className="hidden md:inline">— Scroll for the set —</span>
        <span>Loukas V · @lv._.dj</span>
      </div>
    </section>
  );
}
