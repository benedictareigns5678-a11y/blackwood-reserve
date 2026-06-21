"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { durations, easeExpoOut } from "@/lib/motion";
import { useCursorTarget } from "@/components/ui/cursor-context";
import { useDrawUnderline } from "@/components/ui/useDrawUnderline";
import EmberParticles, { type Ember } from "@/components/ui/EmberParticles";

const sectionEmbers: Ember[] = [
  { x: "7%", duration: 28, delay: 2 },
  { x: "16%", duration: 25, delay: 9, mobileHidden: true },
];

const hover = { duration: durations.micro, ease: easeExpoOut };

const columns = [
  {
    heading: "The Whisky",
    links: [
      { label: "Collection", href: "#collection" },
      { label: "Highland Heritage", href: "#heritage" },
      { label: "Tasting Notes", href: "#tasting-notes" },
      { label: "The Process", href: "#process" },
    ],
  },
  {
    heading: "The House",
    links: [
      { label: "The Keeper", href: "#the-keeper" },
      { label: "Our Story", href: "/story" },
      { label: "The Distillery", href: "/distillery" },
      { label: "The Cellar Society", href: "#cellar" },
    ],
  },
  {
    heading: "Visit",
    links: [
      { label: "Reserve a Bottle", href: "/reserve" },
      { label: "Private Tastings", href: "/tastings" },
      { label: "Contact", href: "/contact" },
      { label: "Find a Stockist", href: "/stockists" },
    ],
  },
];

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Drink Responsibly", href: "/responsibility" },
];

function FooterLink({
  label,
  href,
  className = "",
}: {
  label: string;
  href: string;
  className?: string;
}) {
  const target = useCursorTarget({ size: 24, opacity: 0.15 });
  const { controls, originX, draw, retract } = useDrawUnderline();
  return (
    <motion.a
      href={href}
      className={`relative inline-block w-fit font-body ${className}`}
      style={{ color: "#B5A89A" }}
      whileHover={{ color: "#B8924C" }}
      whileFocus={{ color: "#B8924C" }}
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
      {label}
      <motion.span
        aria-hidden
        className="absolute -bottom-1 left-0 block h-px w-full bg-brass"
        initial={{ scaleX: 0 }}
        animate={controls}
        transition={hover}
        style={{ originX, willChange: "transform" }}
      />
    </motion.a>
  );
}

function SocialIcon({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  const target = useCursorTarget({ size: 24, opacity: 0.15 });
  return (
    <motion.a
      href={href}
      aria-label={label}
      className="inline-flex text-brass"
      initial={{ scale: 1, opacity: 0.72 }}
      whileHover={{ scale: 1.1, opacity: 1 }}
      whileFocus={{ scale: 1.1, opacity: 1 }}
      transition={{ duration: durations.micro, ease: easeExpoOut }}
      style={{ willChange: "transform" }}
      {...target}
    >
      {children}
    </motion.a>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const joinTarget = useCursorTarget({ size: 24, opacity: 0.15 });

  const submit = () => {
    // Presentational only — no backend.
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <div className="flex w-full max-w-[360px] flex-col gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="relative flex items-center gap-3">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="your email address"
          aria-label="Email address"
          className="flex-1 border-0 bg-transparent py-2 font-body text-[13px] tracking-[0.04em] text-offwhite placeholder:text-warmgrey/60 focus:outline-none"
        />
        <motion.button
          type="button"
          onClick={submit}
          className="group inline-flex items-center gap-2 font-body text-[11px] font-medium uppercase tracking-[0.28em] text-brass"
          initial="rest"
          whileHover="hover"
          whileFocus="hover"
          onHoverStart={joinTarget.onHoverStart}
          onHoverEnd={joinTarget.onHoverEnd}
          onFocus={joinTarget.onFocus}
          onBlur={joinTarget.onBlur}
        >
          <motion.span variants={{ rest: { color: "#B8924C" }, hover: { color: "#C8A65E" } }} transition={hover}>
            Join
          </motion.span>
          <motion.span
            variants={{ rest: { x: 0 }, hover: { x: 4 } }}
            transition={hover}
            style={{ willChange: "transform" }}
            aria-hidden
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8924C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.span>
        </motion.button>
        {/* Brass underline — base + draw-on-focus */}
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ background: "rgba(184,146,76,0.3)" }} />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-brass"
          style={{
            transform: focused ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left center",
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
}

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ctx: ReturnType<typeof gsap.context> | undefined;

    const build = () => {
      ctx = gsap.context(() => {
        const ease = "expoOut";
        const y = (v: number) => (reduce ? 0 : v);

        const tl = gsap.timeline({
          defaults: { immediateRender: false },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          "[data-footer-rule]",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease, transformOrigin: "left center" }
        )
          .from("[data-wordmark]", { opacity: 0, y: y(20), duration: 1.2, ease }, "<0.2")
          .from("[data-col]", { opacity: 0, y: y(20), duration: 1.0, ease, stagger: 0.1 }, "<0.2")
          .from("[data-newsletter]", { opacity: 0, y: y(20), duration: 1.0, ease }, "<0.3")
          .from("[data-bottombar]", { opacity: 0, duration: 0.8, ease }, "<0.2");
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
  }, []);

  return (
    <footer
      ref={root}
      id="contact"
      className="relative isolate overflow-hidden px-6 md:px-12"
      style={{ background: "#060504" }}
    >
      <style>{`
        @keyframes wordmarkPulse {
          0%, 100% { text-shadow: 0 0 30px rgba(184,146,76,0.3); }
          50% { text-shadow: 0 0 46px rgba(184,146,76,0.5); }
        }
        .wordmark-glow { animation: wordmarkPulse 8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .wordmark-glow { animation: none; text-shadow: 0 0 30px rgba(184,146,76,0.35); }
        }
      `}</style>

      {/* Last-ember glow behind the wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(34% 50% at 16% 38%, rgba(139,69,19,0.10) 0%, rgba(6,5,4,0) 70%)",
        }}
      />

      <EmberParticles embers={sectionEmbers} />

      <div className="relative z-[3] mx-auto max-w-[1280px]">
        {/* Top boundary rule */}
        <div
          data-footer-rule
          aria-hidden
          className="h-px w-full"
          style={{ background: "rgba(184,146,76,0.2)", transformOrigin: "left center" }}
        />

        {/* Main body */}
        <div className="flex flex-col gap-14 py-24 md:flex-row md:justify-between md:gap-10 lg:gap-20">
          {/* Brand anchor */}
          <div data-wordmark className="md:max-w-[34%]">
            <div
              className="wordmark-glow font-display text-[2.5rem] uppercase leading-none tracking-[0.06em]"
              style={{ color: "#B8924C" }}
            >
              Blackwood
            </div>
            <div className="mt-4 font-body text-[10px] uppercase tracking-[0.32em] text-warmgrey">
              Single Barrel · Est. 1887
            </div>
            <p className="mt-5 max-w-[300px] font-body text-[13px] leading-[1.7] text-warmgrey">
              Bottled at the family estate above Loch Avon. Five generations.
              Five hundred bottles a year.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:flex md:gap-12 lg:gap-20">
            {columns.map((col) => (
              <div key={col.heading} data-col className="flex flex-col">
                <h3 className="mb-5 font-body text-[10px] font-medium uppercase tracking-[0.32em] text-brass">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-3.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <FooterLink
                        label={l.label}
                        href={l.href}
                        className="text-[13px]"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter row */}
        <div
          data-newsletter
          className="flex flex-col gap-6 border-t py-12 md:flex-row md:items-end md:justify-between"
          style={{ borderColor: "rgba(184,146,76,0.15)" }}
        >
          <div className="max-w-[420px]">
            <h3 className="font-body text-[11px] font-medium uppercase tracking-[0.32em] text-brass">
              Join the Cellar Society
            </h3>
            <p className="mt-3 font-body text-[13px] leading-[1.6] text-warmgrey">
              Receive notification of new releases before they reach the public
              list.
            </p>
          </div>
          <Newsletter />
        </div>

        {/* Bottom bar */}
        <div
          data-bottombar
          className="flex flex-col gap-6 border-t py-8 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "rgba(184,146,76,0.15)" }}
        >
          <div className="flex flex-col gap-2">
            <span className="font-body text-[10px] uppercase tracking-[0.24em] text-warmgrey/70">
              © 2026 Blackwood Reserve. All Rights Reserved.
            </span>
            <span className="font-body text-[10px] uppercase tracking-[0.24em] text-warmgrey/55">
              Please drink responsibly. 21+
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {legal.map((l) => (
              <FooterLink
                key={l.label}
                label={l.label}
                href={l.href}
                className="text-[10px] uppercase tracking-[0.24em]"
              />
            ))}
          </div>

          <div className="flex items-center gap-5">
            <SocialIcon label="Instagram" href="https://instagram.com">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
              </svg>
            </SocialIcon>
            <SocialIcon label="X" href="https://x.com">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Email the cellar" href="mailto:cellar@blackwoodreserve.co">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}
