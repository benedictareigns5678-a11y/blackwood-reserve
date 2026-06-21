"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

/**
 * Registers GSAP plugins once and creates the shared "expoOut" ease that
 * matches the site's cubic-bezier(0.22, 1, 0.36, 1) used everywhere else.
 * Safe to call from any client component — idempotent.
 */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  if (!gsap.parseEase("expoOut")) {
    CustomEase.create("expoOut", "M0,0 C0.22,1 0.36,1 1,1");
  }
  registered = true;
}

export { gsap, ScrollTrigger };
