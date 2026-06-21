"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { durations, easeExpoOut, staggers } from "@/lib/motion";
import { useCursor, useCursorTarget } from "./cursor-context";
import { useDrawUnderline } from "./useDrawUnderline";

const links = [
  { label: "Collection", href: "#collection" },
  { label: "Heritage", href: "#heritage" },
  { label: "Cellar", href: "#cellar" },
  { label: "Contact", href: "#contact" },
];

const hover = { duration: durations.micro, ease: easeExpoOut };

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

/* ELEMENT 1 — Brass logo: illuminates (color + glow), no movement */
function BrandLogo() {
  const target = useCursorTarget({ size: 32, opacity: 0.15 });
  return (
    <motion.a
      href="#"
      aria-label="Blackwood — Home"
      className="font-display text-2xl uppercase tracking-[0.18em] sm:text-3xl"
      style={{ color: "#B8924C", willChange: "filter" }}
      initial={false}
      whileHover={{ color: "#C8A65E", textShadow: "0 0 24px rgba(184,146,76,0.4)" }}
      whileFocus={{ color: "#C8A65E", textShadow: "0 0 24px rgba(184,146,76,0.4)" }}
      transition={hover}
      {...target}
    >
      Blackwood
    </motion.a>
  );
}

/* ELEMENT 2 — Nav links: color shift + draw-in underline (retracts right) */
function NavLink({ label, href }: { label: string; href: string }) {
  const target = useCursorTarget({ size: 24, opacity: 0.15 });
  const { controls, originX, draw, retract } = useDrawUnderline();

  return (
    <motion.a
      href={href}
      className="relative font-body text-[12px] uppercase tracking-[0.28em]"
      style={{ color: "rgba(244,239,230,0.7)" }}
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

/* ELEMENT 3 — Reserve Now pill: fills brass, text→obsidian, arrow ↗ 4/4 */
function ReserveNow() {
  const target = useCursorTarget({ size: 40, opacity: 0.15, label: "Reserve", labelSize: 8 });
  return (
    <motion.a
      href="#reserve"
      className="inline-flex items-center gap-3 border border-brass px-6 py-3 font-body text-[11px] font-medium uppercase tracking-[0.28em]"
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      variants={{
        rest: { backgroundColor: "rgba(184,146,76,0)", color: "#B8924C" },
        hover: { backgroundColor: "#B8924C", color: "#0A0807" },
      }}
      transition={hover}
      {...target}
    >
      Reserve Now
      <motion.span
        variants={{ rest: { x: 0, y: 0 }, hover: { x: 4, y: -4 } }}
        transition={hover}
        style={{ willChange: "transform" }}
      >
        <ArrowUpRight />
      </motion.span>
    </motion.a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { setVariant } = useCursor();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 lg:py-7">
        <BrandLogo />

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <NavLink key={l.href} label={l.label} href={l.href} />
          ))}
        </div>

        <div className="hidden md:block">
          <ReserveNow />
        </div>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          onMouseEnter={() => setVariant({ size: 32, opacity: 0.15 })}
          onMouseLeave={() => setVariant(null)}
          className="flex flex-col gap-[6px] p-1 md:hidden"
        >
          <span className="block h-[2px] w-6 bg-offwhite" />
          <span className="block h-[2px] w-6 bg-offwhite" />
          <span className="block h-[2px] w-4 bg-offwhite" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.medium, ease: easeExpoOut }}
            className="fixed inset-0 z-50 flex flex-col backdrop-blur-md"
            style={{ background: "rgba(10,8,7,0.97)" }}
          >
            <div className="flex items-center justify-between px-6 py-5 sm:px-10">
              <span className="font-display text-2xl uppercase tracking-[0.18em] text-brass sm:text-3xl">
                Blackwood
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-1 text-offwhite"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 flex-col items-start justify-center gap-3 px-6 sm:gap-4 sm:px-10">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    duration: durations.medium,
                    ease: easeExpoOut,
                    delay: 0.1 + i * staggers.default,
                  }}
                  className="font-display text-[40px] uppercase leading-none tracking-tight text-offwhite transition-colors duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-brass sm:text-[56px]"
                >
                  {l.label}
                </motion.a>
              ))}

              <motion.a
                href="#reserve"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{
                  duration: durations.medium,
                  ease: easeExpoOut,
                  delay: 0.1 + links.length * staggers.default,
                }}
                className="mt-6 inline-flex items-center gap-3 border border-brass/50 px-6 py-3 font-body text-[11px] font-medium uppercase tracking-[0.28em] text-brass"
              >
                Reserve Now
                <ArrowUpRight />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
