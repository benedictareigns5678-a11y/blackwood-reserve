"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { easeExpoOut } from "@/lib/motion";
import { useCursorTarget } from "@/components/ui/cursor-context";
import EmberParticles, { type Ember } from "@/components/ui/EmberParticles";

const sectionEmbers: Ember[] = [
  { x: "24%", duration: 26, delay: 2 },
  { x: "70%", duration: 23, delay: 8, mobileHidden: true },
  { x: "86%", duration: 28, delay: 5, mobileHidden: true },
];


const headlineLines = ["The hand", "on the cask."];

const quoteLead =
  "The wood remembers everything. Every winter that was hard. Every summer that was kind. My job is just to listen until it tells me the whisky is finished.";
const quoteBrass =
  "Twenty-five years takes the patience of a man who knows he will not live to bottle them all.";

function OakLeaf() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2c2.5 2 3 4 2.6 6.2C16.5 7.4 18 7.2 20 7.6c-1 1.6-2.4 2.2-4 2.3 1.7.3 2.9 1.3 3.6 3-1.9.2-3.3-.3-4.4-1.4.7 1.7.4 3.3-.8 4.9-1.2-1.6-1.5-3.2-.8-4.9-1.1 1.1-2.5 1.6-4.4 1.4.7-1.7 1.9-2.7 3.6-3-1.6-.1-3-.7-4-2.3 2-.4 3.5-.2 5.4.6C9 6 9.5 4 12 2Z" />
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

function Portrait() {
  const target = useCursorTarget({
    size: 60,
    opacity: 0.15,
    label: "Read",
    labelSize: 9,
  });
  return (
    <motion.a
      href="/the-keeper"
      data-keeper-portrait
      className="relative block w-full max-w-[440px] overflow-hidden rounded-[4px]"
      style={{
        aspectRatio: "4 / 5",
        background: "#110906",
        border: "1px solid #B8924C",
        willChange: "transform",
      }}
      whileHover={{ scale: 1.02, borderColor: "#C8A65E" }}
      transition={{ duration: 0.8, ease: easeExpoOut }}
      role="img"
      aria-label="Angus Blackwood, fifth-generation master distiller of Blackwood Reserve, holding a glass of whisky in the candlelit cellar at Loch Avon."
      {...target}
    >
      <Image
        src="/images/keeper-angus.webp"
        alt="Angus Blackwood, fifth-generation master distiller of Blackwood Reserve, holding a glass of whisky in the candlelit cellar at Loch Avon."
        fill
        sizes="(max-width: 768px) 100vw, 45vw"
        className="object-cover"
        style={{ objectPosition: "center 20%" }}
      />
      <span
        className="absolute left-4 top-4 z-[2] font-mono text-[10px] uppercase tracking-[0.3em] text-brass"
        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}
      >
        {"// Angus Blackwood"}
      </span>
      <span
        className="absolute bottom-4 right-4 z-[2] font-mono text-[10px] uppercase tracking-[0.3em] text-brass"
        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}
      >
        {"// The Distillery · Loch Avon"}
      </span>
    </motion.a>
  );
}

export default function Keeper() {
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
            "[data-keeper-portrait]",
            { opacity: 0, scale: reduce ? 1 : 0.96, duration: 1.4, ease },
            0.2
          )
          .from(
            "[data-word]",
            { opacity: 0, y: y(30), duration: 1.0, ease, stagger: 0.08 },
            0.4
          )
          .from(
            "[data-reveal='body']",
            { opacity: 0, y: y(30), duration: 1.0, ease },
            0.5
          )
          .fromTo(
            "[data-divider]",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease, transformOrigin: "left center" },
            0.8
          )
          .fromTo(
            "[data-signature]",
            { opacity: 0, rotate: reduce ? -3 : -5 },
            { opacity: 1, rotate: -3, duration: 1.2, ease },
            1.0
          )
          .from(
            "[data-reveal='credit']",
            { opacity: 0, y: y(16), duration: 0.8, ease },
            "<0.2"
          );

        // Pull quote — its own trigger, fires lower on the page.
        const quote = el.querySelector("[data-quote]");
        if (quote) {
          gsap.from("[data-quote-word]", {
            opacity: 0,
            y: y(24),
            duration: 1.2,
            ease,
            stagger: 0.06,
            immediateRender: false,
            scrollTrigger: {
              trigger: quote,
              start: "top 80%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          });
        }

        if (!reduce) {
          gsap.to("[data-keeper-leaf]", {
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
      id="the-keeper"
      className="relative isolate overflow-hidden bg-obsidian px-6 py-20 md:px-12 md:py-32"
    >
      {/* Warm light behind the portrait (right side) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(40% 50% at 74% 50%, rgba(139,69,19,0.10) 0%, rgba(10,8,7,0) 70%)",
        }}
      />

      <EmberParticles embers={sectionEmbers} />

      <div className="relative z-[3] mx-auto max-w-[1280px]">
        {/* Eyebrow row */}
        <div
          data-reveal="eyebrow"
          className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="inline-flex items-center gap-3 font-body text-[11px] font-medium uppercase tracking-[0.4em] text-brass">
            <span aria-hidden className="block h-px w-8 bg-brass" />
            <span>The Keeper</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brass/70">
            Fifth Generation · 1984—Present
          </span>
        </div>

        {/* Two-column block — text LEFT, image RIGHT */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[55fr_45fr] md:gap-10 lg:gap-20">
          {/* Left — text */}
          <div className="order-2 max-w-[520px] md:order-1">
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
              Angus took the keys to the distillery in 1984, on the morning his
              father walked into the loch and never came back to work. He has
              signed every release that has left these walls in the forty-one
              years since. He still sleeps in the room above the still house. He
              still chooses the casks by the sound they make when he taps them.
            </p>

            <div
              data-divider
              aria-hidden
              className="my-6 h-px w-[60px] bg-brass"
              style={{ transformOrigin: "left center" }}
            />

            <div
              data-signature
              className="text-brass"
              style={{
                fontFamily: "var(--font-script), cursive",
                fontSize: "2rem",
                lineHeight: 1,
                transform: "rotate(-3deg)",
                width: "fit-content",
              }}
            >
              Angus Blackwood
            </div>
            <div
              data-reveal="credit"
              className="mt-4 font-body text-[10px] uppercase tracking-[0.28em] text-brass"
            >
              Master Distiller · Blackwood Reserve
            </div>
          </div>

          {/* Right — portrait */}
          <div className="relative order-1 flex justify-center md:order-2 md:justify-end">
            <Portrait />
            <div
              data-keeper-leaf
              aria-hidden
              className="pointer-events-none absolute -top-5 left-2 text-brass md:left-auto md:right-[20%]"
              style={{ opacity: 0.35, willChange: "transform" }}
            >
              <OakLeaf />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-4 right-2 text-brass md:right-0"
              style={{ opacity: 0.35 }}
            >
              <KeyIcon />
            </div>
          </div>
        </div>

        {/* Full-width pull quote — the man's voice, in serif */}
        <figure data-quote className="mx-auto mt-20 max-w-[900px] text-center">
          <blockquote
            className="m-0"
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 500,
              lineHeight: 1.4,
              fontSize: "clamp(1.7rem, 3.4vw, 2.6rem)",
            }}
          >
            {quoteLead.split(" ").map((w, i) => (
              <span
                key={`l-${i}`}
                data-quote-word
                className="inline-block text-offwhite"
                style={{ marginRight: "0.25em", willChange: "transform" }}
              >
                {w}
              </span>
            ))}{" "}
            {quoteBrass.split(" ").map((w, i) => (
              <span
                key={`b-${i}`}
                data-quote-word
                className="inline-block text-brass"
                style={{ marginRight: "0.25em", willChange: "transform" }}
              >
                {w}
              </span>
            ))}
          </blockquote>
          <figcaption className="mt-8">
            <cite className="font-body text-[11px] uppercase not-italic tracking-[0.4em] text-brass">
              — Angus Blackwood
            </cite>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
