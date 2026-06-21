"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { durations, easeExpoOut } from "@/lib/motion";

export default function IntroOverlay() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2400);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <motion.div
      aria-hidden
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: durations.major + 0.2, ease: easeExpoOut, delay: 1.0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "var(--obsidian-deep, #050403)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: easeExpoOut }}
        className="flex flex-col items-center gap-5"
      >
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, ease: easeExpoOut, delay: 0.1 }}
          className="block h-px w-24 origin-left"
          style={{ background: "var(--brass, #B8924C)" }}
        />
        <span
          className="font-display text-3xl uppercase tracking-[0.22em]"
          style={{ color: "var(--brass, #B8924C)" }}
        >
          Blackwood
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.4em]"
          style={{ color: "rgba(245,239,230,0.45)" }}
        >
          Est. 1887
        </span>
      </motion.div>
    </motion.div>
  );
}
