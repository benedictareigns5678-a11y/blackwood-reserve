"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { durations, easeExpoOut } from "@/lib/motion";
import { useCursorTarget } from "@/components/ui/cursor-context";
import EmberParticles, { type Ember } from "@/components/ui/EmberParticles";

// Denser, clustered toward the lit center.
const sectionEmbers: Ember[] = [
  { x: "40%", duration: 24, delay: 1 },
  { x: "52%", duration: 21, delay: 6 },
  { x: "60%", duration: 26, delay: 10, mobileHidden: true },
  { x: "46%", duration: 23, delay: 4, mobileHidden: true },
];


type Testimonial = {
  quote: string;
  name: string;
  initials: string;
  title: string;
};

const left: Testimonial = {
  quote:
    "A Blackwood 25 is the only whisky I've ever bid against myself for at auction. The 40 is the only one I've poured for my father and watched him stop speaking.",
  name: "Henry Whitcombe",
  initials: "HW",
  title: "Private Collector, London",
};

const right: Testimonial = {
  quote:
    "Twenty-five years of restraint in a single glass. You can taste the patience. Most distillers chase noise — Blackwood keeps building silence.",
  name: "Eilidh MacRae",
  initials: "EM",
  title: "Master of Whisky, Speyside",
};

function KeyIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="7" cy="7" r="3.2" />
      <path d="M9.3 9.3 19 19M15 19l2.5-2.5M16.5 20.5 19 18" />
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

function Rating() {
  return (
    <div className="mb-5 flex gap-1.5" aria-label="Five barrels">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          data-rating-dot
          aria-hidden
          className="block rounded-full"
          style={{
            width: 6,
            height: 6,
            background: "#B8924C",
            boxShadow: "0 0 4px rgba(184,146,76,0.5)",
          }}
        />
      ))}
    </div>
  );
}

function CenterCard() {
  const target = useCursorTarget({ size: 60, opacity: 0.15 });
  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-[4px]"
      style={{
        aspectRatio: "4 / 5",
        background: "#110906",
        border: "1px solid rgba(184,146,76,0.4)",
        willChange: "transform",
      }}
      whileHover={{ scale: 1.02, borderColor: "#C8A65E" }}
      transition={{ duration: 0.6, ease: easeExpoOut }}
      role="img"
      aria-label="A pour of Blackwood Reserve whisky caught in warm amber light, the liquid glowing as it fills a crystal glass."
      {...target}
    >
      <Image
        src="/images/cellar-pour.webp"
        alt="A pour of Blackwood Reserve whisky caught in warm amber light, the liquid glowing as it fills a crystal glass."
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-cover"
      />
      <span
        className="absolute bottom-4 left-4 z-[2] font-mono text-[10px] uppercase tracking-[0.3em] text-brass"
        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}
      >
        {"// The Pour · Amber Light Study"}
      </span>
    </motion.div>
  );
}

function QuoteCard({ t }: { t: Testimonial }) {
  const reduce = useReducedMotion();
  const target = useCursorTarget({ size: 48, opacity: 0.12 });
  return (
    <motion.figure
      className="m-0 rounded-[4px] border p-7"
      style={{ background: "#110906", borderColor: "rgba(184,146,76,0.25)" }}
      initial="rest"
      whileHover="hover"
      variants={{
        rest: {
          y: 0,
          borderColor: "rgba(184,146,76,0.25)",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
        },
        hover: {
          y: reduce ? 0 : -6,
          borderColor: "rgba(184,146,76,0.5)",
          boxShadow: "0 24px 50px rgba(0,0,0,0.5), 0 0 48px rgba(184,146,76,0.12)",
        },
      }}
      transition={{ duration: durations.micro, ease: easeExpoOut }}
      {...target}
    >
      <Rating />
      <blockquote
        className="m-0 font-body text-warmgrey"
        style={{ fontSize: "1.05rem", lineHeight: 1.6 }}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4">
        <span
          aria-label={t.name}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full font-body text-[12px] font-semibold uppercase tracking-[0.1em] text-brass"
          style={{ border: "1px solid rgba(184,146,76,0.5)" }}
        >
          {t.initials}
        </span>
        <span className="flex flex-col">
          <cite className="font-body text-[13px] font-semibold uppercase not-italic tracking-[0.06em] text-offwhite">
            {t.name}
          </cite>
          <span className="mt-1 font-body text-[10px] uppercase tracking-[0.22em] text-warmgrey">
            {t.title}
          </span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

export default function CellarSociety() {
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
        const x = (v: number) => (reduce ? 0 : v);

        const tl = gsap.timeline({
          defaults: { immediateRender: false },
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        tl.from("[data-word]", {
          opacity: 0,
          y: y(30),
          duration: 1.0,
          ease,
          stagger: 0.08,
        })
          .from(
            "[data-reveal='subhead']",
            { opacity: 0, duration: 0.8, ease },
            ">-0.4"
          )
          .from(
            "[data-center-card]",
            { opacity: 0, scale: reduce ? 1 : 0.95, duration: 1.4, ease },
            ">-0.2"
          )
          .from(
            "[data-card-left]",
            { opacity: 0, x: x(-30), duration: 1.2, ease },
            ">-0.7"
          )
          .from(
            "[data-card-right]",
            { opacity: 0, x: x(30), duration: 1.2, ease },
            "<0.15"
          )
          .from(
            "[data-rating-dot]",
            { opacity: 0, duration: 0.4, ease, stagger: 0.04 },
            "<0.2"
          );

        if (!reduce) {
          gsap.to("[data-cellar-parallax]", {
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
      id="cellar"
      className="relative isolate overflow-hidden bg-obsidian px-6 py-24 md:px-12 md:py-32"
    >
      {/* Central radial glow — the lit heart of the room */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: [
            "radial-gradient(38% 42% at 50% 55%, rgba(139,69,19,0.15) 0%, rgba(10,8,7,0) 70%)",
            "radial-gradient(70% 30% at 50% 100%, rgba(139,69,19,0.08) 0%, rgba(10,8,7,0) 70%)",
          ].join(", "),
        }}
      />

      <EmberParticles embers={sectionEmbers} />

      <div
        data-cellar-parallax
        aria-hidden
        className="pointer-events-none absolute left-[4%] top-[24%] z-[1] text-brass"
        style={{ opacity: 0.32, willChange: "transform" }}
      >
        <OakLeaf />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[16%] right-[5%] z-[1] hidden text-brass md:block"
        style={{ opacity: 0.3 }}
      >
        <KeyIcon />
      </div>

      <div className="relative z-[3] mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="text-center">
          <h2
            className="font-display m-0 uppercase text-offwhite"
            style={{
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            {"The Cellar Society".split(" ").map((word, i) => (
              <span
                key={i}
                data-word
                className="inline-block"
                style={{ marginRight: "0.25em", willChange: "transform" }}
              >
                {word}
              </span>
            ))}
          </h2>
          <p
            data-reveal="subhead"
            className="mx-auto mt-5 font-body text-warmgrey"
            style={{ fontSize: "1.2rem" }}
          >
            What collectors say about Blackwood Reserve.
          </p>
        </div>

        {/* Triptych */}
        <div className="mt-16 grid grid-cols-1 items-center gap-8 md:grid-cols-[28fr_40fr_28fr] md:gap-6 lg:gap-8">
          {/* DOM order: center first (mobile shows it first), reordered on desktop */}
          <div data-center-card className="md:order-2" style={{ willChange: "transform, opacity" }}>
            <CenterCard />
          </div>
          <div data-card-left className="md:order-1" style={{ willChange: "transform, opacity" }}>
            <QuoteCard t={left} />
          </div>
          <div data-card-right className="md:order-3" style={{ willChange: "transform, opacity" }}>
            <QuoteCard t={right} />
          </div>
        </div>
      </div>
    </section>
  );
}
