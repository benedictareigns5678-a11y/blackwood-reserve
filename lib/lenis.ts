"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenis: Lenis | null = null;
let registered = false;

export function getLenis(): Lenis | null {
  return lenis;
}

export function initLenis(): Lenis {
  if (typeof window === "undefined") {
    throw new Error("initLenis must run on the client");
  }

  if (lenis) return lenis;

  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }

  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tick = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroyLenis() {
  if (!lenis) return;
  lenis.destroy();
  lenis = null;
}
