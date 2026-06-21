"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { durations, easeExpoOut, staggers } from "@/lib/motion";
import { useCursorTarget } from "@/components/ui/cursor-context";
import { useDrawUnderline } from "@/components/ui/useDrawUnderline";
import EmberParticles from "@/components/ui/EmberParticles";

const hover = { duration: durations.micro, ease: easeExpoOut };

function BarrelIcon() {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 24 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <ellipse cx="12" cy="9" rx="9" ry="7.5" />
      <path d="M3 9c2 1 4 1.5 9 1.5s7-0.5 9-1.5" />
      <path d="M6 3.5v11M18 3.5v11" />
    </svg>
  );
}

function WaxSealIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="9" r="6" />
      <circle cx="12" cy="9" r="2.5" />
      <path d="M8 13 L6.5 22 L12 19 L17.5 22 L16 13" />
    </svg>
  );
}

function ArrowUpRight() {
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
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: durations.major, ease: easeExpoOut, delay: 1.5 + delay },
});

export default function Hero() {
  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden bg-obsidian text-offwhite">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      <EmberParticles />

      {/* Hero content (left) */}
      <div className="relative z-[3] flex min-h-screen w-full max-w-[1400px] flex-col justify-center px-6 pb-12 pt-32 sm:px-10 sm:pb-14 lg:px-16 lg:pb-20 lg:pt-40">
        <motion.div
          {...reveal(0)}
          className="mb-6 inline-flex items-center gap-3 font-body text-[11px] font-medium uppercase tracking-[0.42em] text-brass sm:text-[14px] lg:mb-8"
        >
          <BarrelIcon />
          <span>Single Barrel · Est. 1887</span>
        </motion.div>

        <motion.h1
          {...reveal(staggers.default)}
          className="font-display m-0 uppercase tracking-[-0.015em] text-offwhite"
          style={{
            lineHeight: 0.92,
            fontSize: "clamp(2.8rem, 8vw, 7rem)",
            textShadow: "0 2px 32px rgba(0,0,0,0.6)",
          }}
        >
          <span className="block">Forged.</span>
          <span className="block">Aged.</span>
          <span className="block">Earned.</span>
        </motion.h1>

        <motion.p
          {...reveal(staggers.default * 2)}
          className="mt-6 max-w-[30rem] font-body text-[14px] leading-[1.75] text-offwhite/60 sm:text-[15px] lg:mt-8"
        >
          Twenty-five years in oak. Five hundred bottles released.
          <br />
          A whiskey that doesn&rsquo;t ask to be noticed —{" "}
          <PhraseLink />
        </motion.p>

        <motion.div
          {...reveal(staggers.default * 3)}
          className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 lg:mt-10"
        >
          <ReserveBottle />
          <AwardBadge />
        </motion.div>

        <motion.div
          {...reveal(staggers.default * 4)}
          className="mt-8 flex flex-wrap gap-6 sm:mt-10 sm:gap-12 lg:mt-14 lg:gap-16"
        >
          <Stat value="25" label="Years in Oak" />
          <Stat value="53%" label="Cask Strength" />
          <Stat value="500" label="Bottles Released" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div
        className="font-body text-[28px] font-semibold leading-none tracking-[-0.015em] text-cognac-light sm:text-[40px] lg:text-[52px]"
        style={{ fontFeatureSettings: '"tnum"' }}
      >
        {value}
      </div>
      <div className="mt-2 font-body text-[9px] font-medium uppercase tracking-[0.28em] text-offwhite/45 sm:text-[11px]">
        {label}
      </div>
    </div>
  );
}

/* ELEMENT 4 — "it waits to be earned": inline affordance → /heritage */
function PhraseLink() {
  const target = useCursorTarget({ size: 32, opacity: 0.12 });
  const { controls, originX, draw, retract } = useDrawUnderline();
  return (
    <motion.a
      href="/heritage"
      className="relative inline-block font-medium not-italic"
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
      <span>it waits to be earned.</span>
      <motion.span
        aria-hidden
        className="absolute -bottom-0.5 left-0 block h-px w-full"
        style={{ originX, background: "rgba(184,146,76,0.6)", willChange: "transform" }}
        initial={{ scaleX: 0 }}
        animate={controls}
        transition={hover}
      />
    </motion.a>
  );
}

/* ELEMENT 5 — primary CTA: brass fill slides in, text→obsidian, arrow ↗ 6/6 */
function ReserveBottle() {
  const reduce = useReducedMotion();
  // whileTap makes framer-motion inject tabIndex during SSR but not on the
  // client, which breaks hydration. Attach it only after mount (tap is a
  // client-only interaction regardless).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const target = useCursorTarget({
    size: 48,
    opacity: 0.2,
    label: "Reserve",
    labelSize: 9,
  });
  return (
    <motion.a
      href="/reserve"
      className="relative inline-flex w-fit shrink-0 items-center gap-3 overflow-hidden whitespace-nowrap border border-brass/40 px-6 py-4 font-body text-[11px] font-medium uppercase tracking-[0.28em] sm:px-7 sm:text-[12px]"
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap={mounted && !reduce ? { scale: 0.96 } : undefined}
      variants={{
        rest: { backgroundColor: "#0A0807" },
        // Under reduced-motion the brass fill can't slide (it's a transform),
        // so the anchor background shifts instead — keeps the affordance.
        hover: { backgroundColor: reduce ? "#B8924C" : "#0A0807" },
      }}
      transition={
        reduce
          ? hover
          : { default: hover, scale: { duration: 0.12, ease: easeExpoOut } }
      }
      {...target}
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 z-0 bg-brass"
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: reduce ? 0 : 1 } }}
        transition={hover}
        style={{ originX: 0, willChange: "transform" }}
      />
      <motion.span
        className="relative z-10 inline-flex items-center gap-3"
        variants={{ rest: { color: "#F4EFE6" }, hover: { color: "#0A0807" } }}
        transition={{
          duration: durations.micro,
          ease: easeExpoOut,
          delay: reduce ? 0 : 0.15,
        }}
      >
        <span>Reserve a Bottle</span>
        <motion.span
          variants={{
            rest: { x: 0, y: 0, color: "#B8924C" },
            hover: { x: reduce ? 0 : 6, y: reduce ? 0 : -6, color: "#0A0807" },
          }}
          transition={hover}
          style={{ willChange: "transform" }}
        >
          <ArrowUpRight />
        </motion.span>
      </motion.span>
    </motion.a>
  );
}

/* ELEMENT 6 — award badge: icon scale 1.1, both lines brighten, line-2 underline */
function AwardBadge() {
  const target = useCursorTarget({ size: 32, opacity: 0.12 });
  const { controls, originX, draw, retract } = useDrawUnderline();
  return (
    <motion.a
      href="/distillery"
      className="hidden items-center gap-3 border-l border-brass/25 pl-3 sm:flex"
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
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
      <motion.span
        variants={{
          rest: { scale: 1, color: "#B8924C" },
          hover: { scale: 1.1, color: "#C8A65E" },
        }}
        transition={hover}
        style={{ willChange: "transform" }}
      >
        <WaxSealIcon />
      </motion.span>
      <span className="flex flex-col font-body text-[10px] uppercase leading-[1.4] tracking-[0.22em]">
        <motion.span
          className="font-medium tracking-[0.28em]"
          variants={{ rest: { color: "#B8924C" }, hover: { color: "#C8A65E" } }}
          transition={hover}
        >
          Award-Winning
        </motion.span>
        <motion.span
          className="relative inline-block w-fit"
          variants={{
            rest: { color: "rgba(244,239,230,0.55)" },
            hover: { color: "#C8A65E" },
          }}
          transition={hover}
        >
          <span>Highland Distillery</span>
          <motion.span
            aria-hidden
            className="absolute -bottom-0.5 left-0 block h-px w-full bg-brass"
            initial={{ scaleX: 0 }}
            animate={controls}
            transition={hover}
            style={{ originX, willChange: "transform" }}
          />
        </motion.span>
      </span>
    </motion.a>
  );
}
