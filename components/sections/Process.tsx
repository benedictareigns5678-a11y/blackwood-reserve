"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { durations, easeExpoOut } from "@/lib/motion";
import { useCursorTarget } from "@/components/ui/cursor-context";
import { useDrawUnderline } from "@/components/ui/useDrawUnderline";
import EmberParticles, { type Ember } from "@/components/ui/EmberParticles";

const sectionEmbers: Ember[] = [
  { x: "16%", duration: 26, delay: 2 },
  { x: "52%", duration: 22, delay: 9, mobileHidden: true },
  { x: "82%", duration: 24, delay: 5, mobileHidden: true },
];

const hover = { duration: durations.micro, ease: easeExpoOut };

const headlineLines = [
  "Twenty-five",
  "winters in oak.",
  "Patience is the",
  "only ingredient",
  "we cannot buy.",
];

function PotStillIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 21h8M9 21v-5M15 21v-5" />
      <path d="M7 16h10a4 4 0 0 0 0-8H7a4 4 0 0 0 0 8Z" />
      <path d="M12 8V5M12 5l4-2" />
    </svg>
  );
}

function OakLeaf() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2c2.5 2 3 4 2.6 6.2C16.5 7.4 18 7.2 20 7.6c-1 1.6-2.4 2.2-4 2.3 1.7.3 2.9 1.3 3.6 3-1.9.2-3.3-.3-4.4-1.4.7 1.7.4 3.3-.8 4.9-1.2-1.6-1.5-3.2-.8-4.9-1.1 1.1-2.5 1.6-4.4 1.4.7-1.7 1.9-2.7 3.6-3-1.6-.1-3-.7-4-2.3 2-.4 3.5-.2 5.4.6C9 6 9.5 4 12 2Z" />
      <path d="M12 13v9" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function ReadProcessLink() {
  const target = useCursorTarget({ size: 32, opacity: 0.12 });
  const { controls, originX, draw, retract } = useDrawUnderline();
  return (
    <motion.a
      href="/process"
      className="relative inline-flex w-fit items-center gap-3 font-body text-[11px] font-medium uppercase tracking-[0.32em]"
      style={{ color: "#B8924C" }}
      whileHover={{ color: "#C8A65E" }}
      whileFocus={{ color: "#C8A65E" }}
      transition={hover}
      onHoverStart={() => {
        target.onHoverStart();
        draw();
      }}
      onHoverEnd={() => {
        target.onHoverEnd();
        retract();
      }}
      onFocus={() => {
        target.onFocus();
        draw();
      }}
      onBlur={() => {
        target.onBlur();
        retract();
      }}
    >
      <span>Read the process</span>
      <motion.span
        variants={{ rest: { x: 0 }, hover: { x: 4 } }}
        initial="rest"
        animate="rest"
        whileHover="hover"
        transition={hover}
        style={{ willChange: "transform" }}
        aria-hidden
      >
        →
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute -bottom-1 left-0 block h-px w-[calc(100%-1.5rem)] bg-brass"
        initial={{ scaleX: 0 }}
        animate={controls}
        transition={hover}
        style={{ originX, willChange: "transform" }}
      />
    </motion.a>
  );
}

function ImageCard() {
  const target = useCursorTarget({ size: 48, opacity: 0.15 });
  return (
    <motion.div
      data-process-image
      className="group relative w-full max-w-[440px] overflow-hidden rounded-[4px]"
      style={{ aspectRatio: "3 / 4", border: "1px solid #B8924C" }}
      whileHover={{ scale: 1.02, borderColor: "#C8A65E" }}
      transition={{ duration: 0.6, ease: easeExpoOut }}
      {...target}
    >
      <Image
        src="/images/process-cask.webp"
        alt="A charred Highland oak cask, aged twenty-five years, in the Blackwood Reserve cellar."
        fill
        sizes="(max-width: 768px) 100vw, 45vw"
        className="object-cover [clip-path:inset(0_0_0_0)]"
      />
      {/* Brass sheen that sweeps across as the image wipes in (GSAP-driven) */}
      <span
        data-wipe
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-0"
        style={{
          background:
            "linear-gradient(100deg, transparent 38%, rgba(200,166,94,0.28) 50%, transparent 62%)",
          willChange: "transform, opacity",
        }}
      />
      <span
        className="absolute left-4 top-4 z-[2] font-mono text-[12px] uppercase tracking-[0.3em] text-brass"
        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}
      >
        {"// The Cask"}
      </span>
    </motion.div>
  );
}

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;

    let ctx: ReturnType<typeof gsap.context> | undefined;

    const build = () => {
      ctx = gsap.context(() => {
        const ease = "expoOut";
        // Reduced motion: keep the opacity fades, drop translates/scale/parallax.
        const y = (v: number) => (reduce ? 0 : v);

        const tl = gsap.timeline({
          // immediateRender:false keeps the content visible until the trigger
          // actually plays — so a mis-timed refresh can never leave it hidden.
          defaults: { immediateRender: false },
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        tl.from("[data-reveal='eyebrow']", {
          opacity: 0,
          y: y(20),
          duration: 1.0,
          ease,
        })
          .from(
            "[data-process-image]",
            // Non-reduced: scale only (the clip-wipe below is the reveal).
            // Reduced: simple fade.
            {
              opacity: reduce ? 0 : 1,
              scale: reduce ? 1 : 0.96,
              duration: 1.4,
              ease,
            },
            0.15
          )
          // Headline: words rise from behind the line mask (no opacity) — the
          // editorial "type from a hidden line" reveal. Reduced motion = fade.
          .from(
            "[data-word]",
            reduce
              ? { opacity: 0, duration: 1.0, ease, stagger: 0.08 }
              : { yPercent: 110, duration: 1.2, ease, stagger: 0.08 },
            0.45
          )
          .from(
            "[data-reveal='body']",
            { opacity: 0, y: y(30), duration: 1.0, ease },
            ">-0.2"
          )
          .from(
            "[data-reveal='cta']",
            { opacity: 0, duration: 0.8, ease },
            ">-0.05"
          );

        // Image mask-wipe: the cask is revealed by a clip-path inset wiping
        // left-to-right, with a brass sheen sweeping along the reveal edge.
        if (!reduce) {
          tl.fromTo(
            "[data-process-image] img",
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease },
            0.15
          ).fromTo(
            "[data-wipe]",
            { xPercent: -100, opacity: 0.7 },
            { xPercent: 100, opacity: 0, duration: 1.4, ease },
            0.15
          );
        }

        // Oak leaf parallax — drifts at 0.6x scroll speed through the section.
        if (!reduce) {
          gsap.to("[data-oak-leaf]", {
            yPercent: -40,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }, root);

      // Recompute start positions now that layout has settled.
      ScrollTrigger.refresh();
    };

    // Defer past first paint so fonts/video/intro have laid out.
    const raf = requestAnimationFrame(() => requestAnimationFrame(build));
    // The hero video can change document height after load — refresh again.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      ctx?.revert();
    };
  }, [reduce]);

  return (
    <section
      ref={root}
      id="process"
      className="relative isolate overflow-hidden bg-obsidian px-6 py-20 md:px-12 md:py-32"
    >
      {/* Warm radial light behind the image column */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(40% 50% at 28% 50%, rgba(139,69,19,0.08) 0%, rgba(10,8,7,0) 70%)",
        }}
      />

      <EmberParticles embers={sectionEmbers} />

      <div className="relative z-[3] mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 md:grid-cols-[45fr_55fr] md:gap-10 lg:gap-20">
        {/* Left — image card */}
        <div className="relative flex justify-center md:justify-start">
          <ImageCard />
          <div
            data-oak-leaf
            aria-hidden
            className="pointer-events-none absolute -bottom-4 right-2 text-brass md:right-6"
            style={{ opacity: 0.4, willChange: "transform" }}
          >
            <OakLeaf />
          </div>
        </div>

        {/* Right — text column, left-aligned */}
        <div className="max-w-[520px]">
          <div
            data-reveal="eyebrow"
            className="mb-6 inline-flex items-center gap-3 font-body text-[11px] font-medium uppercase tracking-[0.4em] text-brass"
          >
            <PotStillIcon />
            <span>The Process</span>
          </div>

          <h2
            className="font-display m-0 uppercase text-offwhite"
            style={{
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              fontSize: "clamp(1.9rem, 3.6vw, 3.25rem)",
            }}
          >
            {headlineLines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                {line.split(" ").map((word, j) => (
                  <span
                    key={j}
                    data-word
                    className="inline-block"
                    style={{ marginRight: "0.22em", willChange: "transform" }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <p
            data-reveal="body"
            className="mt-8 max-w-[480px] font-body text-[15px] text-warmgrey"
            style={{ lineHeight: 1.7 }}
          >
            Each cask is hand-selected from a single Highland forest, charred to
            specification, and left to breathe through twenty-five Scottish
            winters. Nothing is rushed. Nothing is replaced. The whisky we bottle
            is what the wood gives back — no more, no less.
          </p>

          <div data-reveal="cta" className="mt-6">
            <ReadProcessLink />
          </div>
        </div>
      </div>
    </section>
  );
}
