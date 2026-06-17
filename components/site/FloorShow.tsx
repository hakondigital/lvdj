"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { GIGS } from "@/data/gigs";
import { cn } from "@/lib/utils";

const FRAME_COUNT = GIGS.length;

export function FloorShow() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smoothed progress for snappier transitions
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  // Slight horizontal drift across the whole sequence
  const drift = useTransform(progress, [0, 1], ["-2%", "2%"]);

  return (
    <section
      ref={sectionRef}
      id="floor"
      // 4 frames × ~90vh on mobile, 110vh on desktop
      className="relative bg-ink h-[360vh] md:h-[440vh]"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layered photo stack */}
        {GIGS.map((g, i) => (
          <FloorFrame key={g.src} index={i} progress={progress} photo={g} drift={drift} />
        ))}

        {/* Top vignette + scanlines for cinema feel */}
        <div aria-hidden className="absolute inset-0 pointer-events-none z-30 scanlines opacity-25" />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-b from-ink/70 via-transparent to-ink/95"
        />

        {/* Section meta — top left */}
        <div className="absolute top-5 left-5 md:top-8 md:left-8 z-40 flex items-center gap-3 font-mono text-[10px] tracking-ultra text-bone uppercase mix-blend-difference">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-neon-pink opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-pink" />
          </span>
          <span className="hidden sm:inline">On The Decks · Live Set</span>
          <span className="sm:hidden">Live</span>
        </div>

        {/* Frame counter ladder — right rail */}
        <FrameLadder progress={progress} />

        {/* Headline overlays */}
        {GIGS.map((g, i) => (
          <FrameHeadline key={`headline-${i}`} index={i} progress={progress} photo={g} />
        ))}

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 inset-x-0 z-40 h-[2px] bg-white/10">
          <motion.div
            style={{ scaleX: progress, transformOrigin: "0% 50%" }}
            className="h-full origin-left bg-gradient-to-r from-gold via-neon-pink to-neon-violet"
          />
        </div>
      </div>
    </section>
  );
}

interface FrameProps {
  index: number;
  progress: MotionValue<number>;
  photo: (typeof GIGS)[number];
  drift?: MotionValue<string>;
}

function FloorFrame({ index, progress, photo, drift }: FrameProps) {
  // Each frame occupies 1/N of the scroll progress range
  const segment = 1 / FRAME_COUNT;
  const enter = index * segment;
  const peak = enter + segment * 0.5;
  const exit = enter + segment;

  // Crossfade with slight overlap so frames bleed into each other
  const opacity = useTransform(
    progress,
    [enter - segment * 0.25, enter, peak, exit, exit + segment * 0.25],
    [0, 1, 1, 1, 0]
  );

  // Subtle parallax zoom: each frame eases from 1.08 → 1.0 → 1.04
  const scale = useTransform(progress, [enter - segment * 0.2, peak, exit + segment * 0.2], [1.12, 1.0, 1.06]);

  // Mild vertical pan for cinema feel
  const y = useTransform(progress, [enter, exit], ["-2%", "2%"]);

  return (
    <motion.div
      aria-hidden={index !== 0 ? "true" : undefined}
      style={{ opacity, scale, y, x: drift }}
      className="absolute inset-0 will-change-transform"
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="100vw"
        priority={index === 0}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
    </motion.div>
  );
}

function FrameHeadline({
  index,
  progress,
  photo,
}: {
  index: number;
  progress: MotionValue<number>;
  photo: (typeof GIGS)[number];
}) {
  const segment = 1 / FRAME_COUNT;
  const enter = index * segment;
  const peak = enter + segment * 0.5;
  const exit = enter + segment;

  const opacity = useTransform(
    progress,
    [enter, enter + segment * 0.15, exit - segment * 0.15, exit],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [enter, peak, exit],
    [40, 0, -40]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 bottom-[18%] md:bottom-[22%] z-40 px-6 md:px-12 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto md:mx-0">
        <span className="inline-block font-mono text-[10px] md:text-xs tracking-ultra text-gold uppercase">
          {photo.label}
        </span>
        <h3 className="mt-3 font-display tracking-tightest leading-[0.85] text-bone text-[14vw] md:text-[10vw] lg:text-[8.5rem]">
          {photo.headline}
        </h3>
        <p className="mt-4 text-bone/80 max-w-md text-sm md:text-base leading-relaxed">
          {photo.sub}
        </p>
      </div>
    </motion.div>
  );
}

function FrameLadder({ progress }: { progress: ReturnType<typeof useSpring> }) {
  return (
    <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
      {GIGS.map((g, i) => {
        const segment = 1 / FRAME_COUNT;
        const enter = i * segment;
        const exit = enter + segment;
        return (
          <FrameLadderDot
            key={g.src}
            label={g.label}
            enter={enter}
            exit={exit}
            progress={progress}
            isLast={i === GIGS.length - 1}
          />
        );
      })}
    </div>
  );
}

function FrameLadderDot({
  label,
  enter,
  exit,
  progress,
  isLast,
}: {
  label: string;
  enter: number;
  exit: number;
  progress: MotionValue<number>;
  isLast: boolean;
}) {
  const opacity = useTransform(progress, [enter, exit], [0.35, 1]);
  const scale = useTransform(progress, [enter, exit], [0.85, 1.15]);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        style={{ opacity, scale }}
        className="relative flex items-center gap-3"
      >
        <span className="hidden md:block font-mono text-[10px] tracking-ultra text-bone uppercase">
          {label}
        </span>
        <span className="block h-2 w-2 rounded-full bg-gold" />
      </motion.div>
      {!isLast && (
        <span className={cn("mt-3 block w-px h-7 bg-white/15")} />
      )}
    </div>
  );
}
