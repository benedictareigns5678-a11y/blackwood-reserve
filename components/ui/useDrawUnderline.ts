"use client";

import { useAnimationControls, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";

/**
 * Brass hairline that draws left→right on enter and retracts to the right on
 * leave (transform-origin flips). Pure scaleX, GPU-only. Under
 * prefers-reduced-motion the draw is skipped — the parent's color shift alone
 * communicates the affordance.
 */
export function useDrawUnderline() {
  const controls = useAnimationControls();
  const [originX, setOriginX] = useState(0); // 0 = left edge, 1 = right edge
  const reduce = useReducedMotion();

  const draw = useCallback(() => {
    if (reduce) return;
    setOriginX(0);
    controls.start({ scaleX: 1 });
  }, [controls, reduce]);

  const retract = useCallback(() => {
    if (reduce) return;
    setOriginX(1);
    controls.start({ scaleX: 0 });
  }, [controls, reduce]);

  return { controls, originX, draw, retract };
}
