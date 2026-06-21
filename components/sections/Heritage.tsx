"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { durations, easeExpoOut } from "@/lib/motion";
import { useCursorTarget } from "@/components/ui/cursor-context";
import { useDrawUnderline } from "@/components/ui/useDrawUnderline";
import EmberParticles, { type Ember } from "@/components/ui/EmberParticles";

// Denser toward the lit right side where the bottle card sits.
const sectionEmbers: Ember[] = [
  { x: "58%", duration: 22, delay: 1 },
  { x: "71%", duration: 26, delay: 6, mobileHidden: true },
  { x: "84%", duration: 20, delay: 10, mobileHidden: true },
  { x: "30%", duration: 24, delay: 4, mobileHidden: true },
];

const hatch =
  "repeating-linear-gradient(135deg, rgba(184,146,76,0.08) 0 1px, transparent 1px 12px)";

const hover = { duration: durations.micro, ease: easeExpoOut };

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function OakLeaf() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2c2.5 2 3 4 2.6 6.2C16.5 7.4 18 7.2 20 7.6c-1 1.6-2.4 2.2-4 2.3 1.7.3 2.9 1.3 3.6 3-1.9.2-3.3-.3-4.4-1.4.7 1.7.4 3.3-.8 4.9-1.2-1.6-1.5-3.2-.8-4.9-1.1 1.1-2.5 1.6-4.4 1.4.7-1.7 1.9-2.7 3.6-3-1.6-.1-3-.7-4-2.3 2-.4 3.5-.2 5.4.6C9 6 9.5 4 12 2Z" />
    </svg>
  );
}

function VisitEstateLink() {
  const target = useCursorTarget({ size: 32, opacity: 0.12 });
  const { controls, originX, draw, retract } = useDrawUnderline();
  return (
    <motion.a
      href="/heritage"
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
      <span>Visit the estate</span>
      <motion.span
        initial="rest"
        animate="rest"
        whileHover="hover"
        variants={{ rest: { x: 0 }, hover: { x: 4 } }}
        transition={hover}
        style={{ willChange: "transform" }}
        aria-hidden
      >
        <ArrowRight />
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

function BottleCard() {
  const target = useCursorTarget({
    size: 60,
    opacity: 0.15,
    label: "View",
    labelSize: 9,
  });
  return (
    <motion.a
      href="/heritage"
      data-heritage-card
      className="relative block w-full overflow-hidden rounded-[4px]"
      style={{
        aspectRatio: "3 / 4",
        background: "#110906",
        border: "1px solid rgba(184,146,76,0.4)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        willChange: "transform",
      }}
      whileHover={{ scale: 1.02, borderColor: "#C8A65E" }}
      transition={{ duration: 0.6, ease: easeExpoOut }}
      role="img"
      aria-label="Blackwood Reserve estate bottle, No. 1887, on a stone windowsill at the family distillery above Loch Avon."
      {...target}
    >
      <Image
        src="/images/heritage-bottle.webp"
        alt="Blackwood Reserve estate bottle, No. 1887, on a stone windowsill at the family distillery above Loch Avon."
        fill
        sizes="(max-width: 768px) 72vw, 28vw"
        className="object-cover"
      />
      <span className="absolute left-4 top-4 z-[2] font-mono text-[10px] uppercase tracking-[0.3em] text-brass/90" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}>
        // Blackwood · No. 1887
      </span>
      <span className="absolute left-4 top-9 z-[2] font-mono text-[10px] uppercase tracking-[0.3em] text-brass/60" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}>
        // Estate Bottle
      </span>
      <span className="absolute bottom-4 right-4 z-[2] font-mono text-[10px] uppercase tracking-[0.3em] text-offwhite/70" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}>
        // No. 1887
      </span>
    </motion.a>
  );
}

export default function Heritage() {
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
        const y = (v: number) => (reduce ? 0 : v);

        // Entrance reveal
        const tl = gsap.timeline({
          defaults: { immediateRender: false },
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        tl.from("[data-h-line1]", { opacity: 0, y: y(60), duration: 1.4, ease })
          .from(
            "[data-h-line2]",
            { opacity: 0, y: y(60), duration: 1.4, ease },
            0.2
          )
          .from(
            "[data-heritage-card]",
            { opacity: 0, scale: reduce ? 1 : 0.92, duration: 1.4, ease },
            0.3
          )
          .from(
            "[data-reveal='eyebrow']",
            { opacity: 0, y: y(20), duration: 1.0, ease },
            "<"
          )
          .fromTo(
            "[data-eyebrow-underline]",
            { scaleX: 0 },
            { scaleX: 1, duration: 1.2, ease, transformOrigin: "left center" },
            "<0.1"
          )
          .from(
            "[data-reveal='copy']",
            { opacity: 0, y: y(30), duration: 1.0, ease },
            "<0.1"
          )
          .from(
            "[data-reveal='cta']",
            { opacity: 0, y: y(20), duration: 0.8, ease },
            "<0.15"
          );

        // Counter-scroll parallax shear — the signature move.
        if (!reduce) {
          gsap.fromTo(
            "[data-h-line1]",
            { x: "5vw" },
            {
              x: "-5vw",
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
          gsap.fromTo(
            "[data-h-line2]",
            { x: "-3vw" },
            {
              x: "3vw",
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
          gsap.to("[data-heritage-leaf]", {
            yPercent: -45,
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

      ScrollTrigger.refresh();
    };

    const raf = requestAnimationFrame(() => requestAnimationFrame(build));
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
      id="heritage"
      className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden bg-obsidian py-24 md:py-32"
    >
      {/* Warm light from the upper-right, behind the bottle card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(50% 55% at 78% 28%, rgba(139,69,19,0.15) 0%, rgba(10,8,7,0) 65%)",
        }}
      />

      <EmberParticles embers={sectionEmbers} />

      {/* Oak leaves — slow parallax near the edges */}
      <div
        data-heritage-leaf
        aria-hidden
        className="pointer-events-none absolute left-[4%] top-[20%] z-[1] text-brass"
        style={{ opacity: 0.35, willChange: "transform" }}
      >
        <OakLeaf />
      </div>
      <div
        data-heritage-leaf
        aria-hidden
        className="pointer-events-none absolute bottom-[14%] right-[8%] z-[1] hidden text-brass md:block"
        style={{ opacity: 0.28, willChange: "transform" }}
      >
        <OakLeaf />
      </div>

      {/* The oversized headline — bleeds off both edges */}
      <h2
        className="relative z-[2] m-0 text-center uppercase"
        style={{ lineHeight: 0.8, letterSpacing: "-0.02em" }}
        aria-label="Highland Heritage"
      >
        <span className="flex w-full justify-center">
          <span
            data-h-line1
            aria-hidden
            className="inline-block shrink-0 whitespace-nowrap font-display"
            style={{
              fontSize: "clamp(6rem, 30vw, 42rem)",
              background:
                "linear-gradient(180deg, #8B4513 0%, #B8924C 65%, #C8A65E 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              willChange: "transform",
            }}
          >
            Highland
          </span>
        </span>
        <span className="flex w-full justify-center" style={{ marginTop: "-0.12em" }}>
          <span
            data-h-line2
            aria-hidden
            className="inline-block shrink-0 whitespace-nowrap font-display"
            style={{
              fontSize: "clamp(6rem, 30vw, 42rem)",
              color: "transparent",
              WebkitTextStroke: "1.5px #B8924C",
              willChange: "transform",
            }}
          >
            Heritage
          </span>
        </span>
      </h2>

      {/* Bottle card — overlaps the right third of the type on desktop,
          drops below the headline on mobile */}
      <div className="relative z-[5] mx-auto mt-12 w-[72%] max-w-[340px] md:absolute md:right-[5vw] md:top-1/2 md:mt-0 md:w-[28vw] md:max-w-[460px] md:-translate-y-1/2">
        <BottleCard />
      </div>

      {/* Supporting copy — lower-left on desktop, stacked on mobile */}
      <div className="relative z-[4] mx-auto mt-12 w-full max-w-[420px] px-6 md:absolute md:bottom-[10%] md:left-12 md:mx-0 md:mt-0 md:px-0">
        <div
          data-reveal="eyebrow"
          className="mb-5 inline-flex items-center gap-3 font-body text-[11px] font-medium uppercase tracking-[0.4em] text-brass"
        >
          <span
            data-eyebrow-underline
            aria-hidden
            className="block h-px w-8 bg-brass"
            style={{ transformOrigin: "left center" }}
          />
          <span>Family Estate</span>
        </div>
        <p
          data-reveal="copy"
          className="font-body text-[15px] text-warmgrey"
          style={{ lineHeight: 1.7 }}
        >
          Bottled at the family estate above Loch Avon since 1887. Five
          generations of distillers, one set of stone walls, and a river that
          hasn&rsquo;t changed its course in a thousand years.
        </p>
        <div data-reveal="cta" className="mt-6">
          <VisitEstateLink />
        </div>
      </div>
    </section>
  );
}
