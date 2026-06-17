"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { REEL, type ReelMedia } from "@/data/gigs";

export function SetReel() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      id="reel"
      className="relative py-24 md:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-32 -left-20 -z-10 h-[36rem] w-[36rem] rounded-full bg-neon-magenta/15 blur-[140px]"
      />
      <motion.div
        style={{ y: bgY }}
        className="absolute -bottom-32 -right-20 -z-10 h-[36rem] w-[36rem] rounded-full bg-neon-cyan/10 blur-[160px]"
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="font-display text-6xl md:text-8xl tracking-tightest leading-[0.85] text-bone mb-12 md:mb-14">
          Floor <span className="text-gold">footage</span>.
        </h2>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
          {REEL.map((item, i) => (
            <VideoTile key={`${item.src}-${i}`} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface VideoTileProps {
  item: ReelMedia;
  index: number;
}

function VideoTile({ item, index }: VideoTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [isCoarsePointer, setIsCoarsePointer] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsCoarsePointer(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (!isCoarsePointer) return;
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isCoarsePointer]);

  const handleMouseEnter = () => {
    if (isCoarsePointer) return;
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (isCoarsePointer) return;
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  const handleClick = () => {
    const el = videoRef.current;
    if (!el) return;
    setMuted((prev) => {
      el.muted = !prev;
      if (prev) el.play().catch(() => {});
      return !prev;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="group relative overflow-hidden bg-ink-50 border border-white/5 aspect-video w-full cursor-pointer"
    >
      <video
        ref={videoRef}
        src={item.src}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/15 group-hover:bg-ink/0 transition-colors duration-500" />

      {/* Mute toggle — minimal corner button (44×44 tap target on mobile) */}
      <div
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute top-3 right-3 z-20 inline-flex items-center justify-center h-11 w-11 md:h-10 md:w-10 bg-ink/70 backdrop-blur-sm border border-white/10 text-bone group-hover:text-gold group-hover:border-gold/50 transition-colors"
      >
        <SoundIcon muted={muted} />
      </div>

      {/* Hover border accent */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 border border-gold/0 group-hover:border-gold/40 transition-colors duration-300"
      />
    </motion.div>
  );
}

function SoundIcon({ muted }: { muted: boolean }) {
  if (muted) {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
        <line x1="17" y1="9" x2="23" y2="15" />
        <line x1="23" y1="9" x2="17" y2="15" />
      </svg>
    );
  }
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
      <path d="M15 9c1.5 1.5 1.5 4.5 0 6" />
      <path d="M18 6c3 3 3 9 0 12" />
    </svg>
  );
}
