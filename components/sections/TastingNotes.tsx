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
  { x: "14%", duration: 27, delay: 2 },
  { x: "30%", duration: 22, delay: 9, mobileHidden: true },
  { x: "60%", duration: 25, delay: 5, mobileHidden: true },
];

const hatch =
  "repeating-linear-gradient(135deg, rgba(184,146,76,0.08) 0 1px, transparent 1px 12px)";

const hover = { duration: durations.micro, ease: easeExpoOut };

const headlineLines = ["Notes for the", "patient palate."];
const pills = ["Honeyed Oak", "Dried Fig", "Leather", "Peat Smoke"];

function StarAnise() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" aria-hidden>
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          cx="12"
          cy="12"
          rx="2.1"
          ry="5.4"
          transform={`rotate(${i * 45} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="1.6" />
    </svg>
  );
}

function OakLeaf() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2c2.5 2 3 4 2.6 6.2C16.5 7.4 18 7.2 20 7.6c-1 1.6-2.4 2.2-4 2.3 1.7.3 2.9 1.3 3.6 3-1.9.2-3.3-.3-4.4-1.4.7 1.7.4 3.3-.8 4.9-1.2-1.6-1.5-3.2-.8-4.9-1.1 1.1-2.5 1.6-4.4 1.4.7-1.7 1.9-2.7 3.6-3-1.6-.1-3-.7-4-2.3 2-.4 3.5-.2 5.4.6C9 6 9.5 4 12 2Z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ViewNotesLink() {
  const target = useCursorTarget({ size: 32, opacity: 0.12 });
  const { controls, originX, draw, retract } = useDrawUnderline();
  return (
    <motion.a
      href="/tasting-notes"
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
      <span>View tasting notes</span>
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

function StillLifeCard() {
  const target = useCursorTarget({ size: 48, opacity: 0.15 });
  return (
    <motion.div
      data-tasting-image
      className="relative w-full max-w-[440px] overflow-hidden rounded-[4px]"
      style={{
        aspectRatio: "4 / 5",
        background: "#110906",
        border: "1px solid #B8924C",
        willChange: "transform",
      }}
      whileHover={{ scale: 1.02, borderColor: "#C8A65E" }}
      transition={{ duration: 0.6, ease: easeExpoOut }}
      role="img"
      aria-label="A crystal glass of Blackwood Reserve whisky beside an open leather tasting journal, lit by candlelight."
      {...target}
    >
      <Image
        src="/images/tasting-stilllife.webp"
        alt="A crystal glass of Blackwood Reserve whisky beside an open leather tasting journal, lit by candlelight."
        fill
        sizes="(max-width: 768px) 100vw, 45vw"
        className="object-cover"
        style={{ objectPosition: "center" }}
      />
      <span
        className="absolute left-4 top-4 z-[2] font-mono text-[10px] uppercase tracking-[0.3em] text-brass"
        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}
      >
        // Journal &amp; Glass
      </span>
      <span
        className="absolute bottom-4 right-4 z-[2] font-mono text-[10px] uppercase tracking-[0.3em] text-brass"
        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}
      >
        // The Pour
      </span>
    </motion.div>
  );
}

export default function TastingNotes() {
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

        const tl = gsap.timeline({
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
            "[data-tasting-image]",
            { opacity: 0, scale: reduce ? 1 : 0.96, duration: 1.4, ease },
            0.15
          )
          .from(
            "[data-word]",
            { opacity: 0, y: y(30), duration: 1.0, ease, stagger: 0.08 },
            0.45
          )
          .from(
            "[data-reveal='body']",
            { opacity: 0, y: y(30), duration: 1.0, ease },
            ">-0.2"
          )
          .from(
            "[data-pill]",
            { opacity: 0, y: y(12), duration: 0.7, ease, stagger: 0.06 },
            ">-0.3"
          )
          .from(
            "[data-reveal='cta']",
            { opacity: 0, duration: 0.8, ease },
            ">-0.1"
          );

        if (!reduce) {
          gsap.to("[data-tasting-parallax]", {
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
      id="tasting-notes"
      className="relative isolate overflow-hidden bg-obsidian px-6 py-16 md:px-12 md:py-32"
    >
      {/* Warm light behind the image column (left) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(40% 50% at 26% 50%, rgba(139,69,19,0.10) 0%, rgba(10,8,7,0) 70%)",
        }}
      />

      <EmberParticles embers={sectionEmbers} />

      <div className="relative z-[3] mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 md:grid-cols-[45fr_55fr] md:gap-10 lg:gap-20">
        {/* Left — still-life image */}
        <div className="relative flex justify-center md:justify-start">
          <StillLifeCard />
          <div
            data-tasting-parallax
            aria-hidden
            className="pointer-events-none absolute -bottom-5 right-2 text-brass md:right-6"
            style={{ opacity: 0.38, willChange: "transform" }}
          >
            <StarAnise />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -top-4 left-2 text-brass"
            style={{ opacity: 0.3 }}
          >
            <OakLeaf />
          </div>
        </div>

        {/* Right — text */}
        <div className="max-w-[520px]">
          <div
            data-reveal="eyebrow"
            className="mb-6 inline-flex items-center gap-3 font-body text-[11px] font-medium uppercase tracking-[0.4em] text-brass"
          >
            <span aria-hidden className="block h-px w-8 bg-brass" />
            <span>Tasting Notes</span>
          </div>

          <h2
            className="font-display m-0 uppercase text-offwhite"
            style={{
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
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
            className="mt-8 max-w-[460px] font-body text-[15px] text-warmgrey"
            style={{ lineHeight: 1.7 }}
          >
            Honeyed oak. Dried fig. A whisper of leather and smoke. The finish
            lingers for the length of a good silence — long enough to set the
            glass down, long enough to consider refilling it.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {pills.map((p) => (
              <motion.span
                key={p}
                data-pill
                className="rounded-full border px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.2em] text-warmgrey"
                style={{ borderColor: "rgba(184,146,76,0.4)", willChange: "transform" }}
                whileHover={{ borderColor: "#C8A65E" }}
                transition={hover}
              >
                {p}
              </motion.span>
            ))}
          </div>

          <div data-reveal="cta" className="mt-6">
            <ViewNotesLink />
          </div>
        </div>
      </div>
    </section>
  );
}
