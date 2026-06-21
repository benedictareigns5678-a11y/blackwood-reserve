"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "./cursor-context";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const { variant } = useCursor();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 200, damping: 24, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 200, damping: 24, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 500, damping: 28, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 500, damping: 28, mass: 0.2 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.style.cursor = "";
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const active = !!variant;

  return (
    <>
      {active && (
        <motion.div
          aria-hidden
          className="cursor-hide pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full"
          style={{
            x: ringX,
            y: ringY,
            translateX: "-50%",
            translateY: "-50%",
            width: variant.size,
            height: variant.size,
            background: `rgba(184,146,76,${variant.opacity})`,
            border: "1px solid rgba(184,146,76,0.55)",
          }}
        >
          {variant.label && (
            <span
              className="font-mono font-medium uppercase tracking-[0.18em] text-brass-bright"
              style={{ fontSize: variant.labelSize ?? 8, lineHeight: 1 }}
            >
              {variant.label}
            </span>
          )}
        </motion.div>
      )}

      <motion.div
        aria-hidden
        className="cursor-hide pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: active ? 5 : 8,
          height: active ? 5 : 8,
          background: "var(--brass-bright, #C8A65E)",
          boxShadow: "0 0 8px rgba(200,134,46,0.55)",
        }}
      />
    </>
  );
}
