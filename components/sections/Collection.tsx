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
  { x: "12%", duration: 25, delay: 1 },
  { x: "38%", duration: 21, delay: 7, mobileHidden: true },
  { x: "64%", duration: 27, delay: 4, mobileHidden: true },
  { x: "88%", duration: 23, delay: 11 },
];

const hover = { duration: durations.micro, ease: easeExpoOut };

type Release = {
  no: string;
  slug: string;
  tier: string;
  name: string;
  subtitle: string;
  price: string;
  scarcity: string;
  alt: string;
  image?: string;
};

const releases: Release[] = [
  {
    no: "18",
    slug: "blackwood-18",
    tier: "No. 18 · Highland",
    name: "Blackwood 18",
    subtitle: "Single Malt Reserve",
    price: "$480",
    scarcity: "47 / 500 Remaining",
    alt: "Blackwood 18 single malt whisky bottle.",
    image: "/images/bottle-18.webp",
  },
  {
    no: "25",
    slug: "blackwood-25",
    tier: "No. 25 · Cask Strength",
    name: "Blackwood 25",
    subtitle: "Cask Strength Reserve",
    price: "$1,200",
    scarcity: "18 / 250 Remaining",
    alt: "Blackwood 25 single malt whisky bottle.",
    image: "/images/bottle-25.webp",
  },
  {
    no: "40",
    slug: "blackwood-40",
    tier: "No. 40 · Vintage 1985",
    name: "Blackwood 40",
    subtitle: "Master's Vintage",
    price: "$4,800",
    scarcity: "6 / 100 Remaining",
    alt: "Blackwood 40 single malt whisky bottle.",
    image: "/images/bottle-40.webp",
  },
];

const hatch =
  "repeating-linear-gradient(135deg, rgba(184,146,76,0.08) 0 1px, transparent 1px 12px)";

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

function KeyIcon() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="7" cy="7" r="3.2" />
      <path d="M9.3 9.3 19 19M15 19l2.5-2.5M16.5 20.5 19 18" />
    </svg>
  );
}

function ViewAllLink() {
  const target = useCursorTarget({ size: 32, opacity: 0.12 });
  const { controls, originX, draw, retract } = useDrawUnderline();
  return (
    <motion.a
      href="/collection"
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
      <span>View All Releases</span>
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

function ReleaseCard({ r }: { r: Release }) {
  const reduce = useReducedMotion();
  const target = useCursorTarget({
    size: 60,
    opacity: 0.15,
    label: "View",
    labelSize: 9,
  });
  return (
    <motion.a
      href={`/collection/${r.slug}`}
      className="group flex flex-col rounded-[4px] border p-6 text-left"
      style={{ background: "#110906", borderColor: "rgba(184,146,76,0.3)" }}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      variants={{
        rest: {
          y: 0,
          borderColor: "rgba(184,146,76,0.3)",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
        },
        hover: {
          y: reduce ? 0 : -8,
          borderColor: "rgba(184,146,76,1)",
          boxShadow:
            "0 30px 60px rgba(0,0,0,0.55), 0 0 60px rgba(184,146,76,0.18)",
        },
      }}
      transition={{ duration: durations.micro, ease: easeExpoOut }}
      {...target}
    >
      {/* Image area */}
      <div
        className="relative mb-5 flex items-end overflow-hidden rounded-[2px]"
        style={{
          aspectRatio: "3 / 4",
          background: r.image ? "#110906" : `${hatch}, #110906`,
        }}
        role="img"
        aria-label={r.alt}
      >
        {r.image && (
          <Image
            src={r.image}
            alt={r.alt}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 30vw"
            className="object-cover"
          />
        )}
        <span className="relative z-[2] m-4 font-mono text-[10px] uppercase tracking-[0.3em] text-brass/60">
          {`// Blackwood ${r.no}`}
        </span>
      </div>

      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brass">
        {r.tier}
      </span>
      <span
        className="font-display mt-2 uppercase leading-none text-offwhite"
        style={{ fontSize: "1.8rem", letterSpacing: "0.01em" }}
      >
        {r.name}
      </span>
      <span className="mt-1.5 font-body text-[11px] uppercase tracking-[0.2em] text-warmgrey">
        {r.subtitle}
      </span>

      <div className="mt-5 flex items-end justify-between border-t border-brass/15 pt-4">
        <span
          className="font-display leading-none text-offwhite"
          style={{ fontSize: "1.5rem" }}
        >
          {r.price}
        </span>
        <motion.span
          className="font-mono text-[9px] uppercase tracking-[0.22em]"
          variants={{
            rest: { color: "rgba(184,146,76,0.85)" },
            hover: { color: "#C8A65E" },
          }}
          transition={hover}
        >
          {r.scarcity}
        </motion.span>
      </div>
    </motion.a>
  );
}

export default function Collection() {
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
            "[data-word]",
            { opacity: 0, y: y(30), duration: 1.0, ease, stagger: 0.08 },
            "<0.1"
          )
          .from(
            "[data-reveal='viewall']",
            { opacity: 0, duration: 1.0, ease },
            "<"
          )
          .from(
            "[data-card]",
            {
              opacity: 0,
              y: y(40),
              scale: reduce ? 1 : 0.97,
              duration: 1.2,
              ease,
              stagger: 0.15,
            },
            ">-0.4"
          );

        if (!reduce) {
          gsap.to("[data-collection-parallax]", {
            yPercent: -30,
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
      id="collection"
      className="relative isolate overflow-hidden bg-obsidian px-6 py-20 md:px-12 md:py-32"
    >
      {/* Warm light bleeding from the right edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(45% 60% at 100% 50%, rgba(139,69,19,0.10) 0%, rgba(10,8,7,0) 65%)",
        }}
      />

      <EmberParticles embers={sectionEmbers} />

      {/* Decorative brass key — slow parallax near the left edge */}
      <div
        data-collection-parallax
        aria-hidden
        className="pointer-events-none absolute -left-2 top-[18%] z-[1] text-brass"
        style={{ opacity: 0.35, willChange: "transform" }}
      >
        <KeyIcon />
      </div>

      <div className="relative z-[3] mx-auto max-w-[1280px]">
        {/* Header row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div
              data-reveal="eyebrow"
              className="mb-5 inline-flex items-center gap-3 font-body text-[11px] font-medium uppercase tracking-[0.4em] text-brass"
            >
              <span aria-hidden className="block h-px w-8 bg-brass" />
              <span>Bottled &amp; Numbered</span>
            </div>
            <h2
              className="font-display m-0 uppercase text-offwhite"
              style={{
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
              }}
            >
              {"The Collection".split(" ").map((word, i) => (
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
          </div>

          <div data-reveal="viewall" className="md:pb-2">
            <ViewAllLink />
          </div>
        </div>

        {/* Card grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
          {releases.map((r) => (
            <div
              key={r.slug}
              data-card
              style={{ willChange: "transform, opacity" }}
            >
              <ReleaseCard r={r} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
