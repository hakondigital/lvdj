"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Resolve a target element from an anchor's `href`. Returns null if the
 * href isn't an in-page hash link, or if no element exists for that id.
 */
function findHashTarget(anchor: HTMLAnchorElement): HTMLElement | null {
  const href = anchor.getAttribute("href");
  if (!href) return null;
  // Only handle in-page hash links (#id, /path#id, etc). Skip external/empty hashes.
  const hashIndex = href.indexOf("#");
  if (hashIndex < 0) return null;
  const id = href.slice(hashIndex + 1);
  if (!id) return null;
  // External links with a hash should still navigate normally.
  if (anchor.target && anchor.target !== "_self") return null;
  return document.getElementById(id);
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const useLenis = !prefersReducedMotion && hasFinePointer;

    let lenis: Lenis | null = null;
    let rafId = 0;

    if (useLenis) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });
      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    /**
     * Intercept anchor clicks on every device — not just when Lenis is
     * active. On touch devices (no Lenis), native browsers skip the
     * scroll when the URL hash already matches the link target, which
     * makes "Book" buttons feel broken after the first tap. Handling
     * it ourselves with scrollIntoView fixes that.
     */
    const handleHashClick = (e: MouseEvent) => {
      // Let modified clicks (cmd/ctrl/middle click) behave natively.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      const target = findHashTarget(anchor);
      if (!target) return;

      e.preventDefault();
      const id = anchor.getAttribute("href")!.split("#")[1];

      if (lenis) {
        lenis.scrollTo(target, { offset: -64, duration: 1.4 });
      } else {
        // Native scroll on touch. Account for sticky nav (~64px).
        const top =
          target.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top, behavior: "smooth" });
      }

      // Update the URL hash without re-triggering a jump, so deep-links work
      // but consecutive taps still scroll because we always handle it manually.
      if (window.history.replaceState) {
        window.history.replaceState(null, "", `#${id}`);
      }
    };

    // Capture phase so this runs *before* any framework onClick handler.
    document.addEventListener("click", handleHashClick, { capture: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleHashClick, { capture: true });
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
