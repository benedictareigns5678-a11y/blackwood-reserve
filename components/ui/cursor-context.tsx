"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type CursorVariant = {
  size: number;
  opacity: number;
  label?: string;
  labelSize?: number;
  filled?: boolean;
} | null;

type CursorCtx = {
  variant: CursorVariant;
  setVariant: (v: CursorVariant) => void;
};

const Ctx = createContext<CursorCtx>({ variant: null, setVariant: () => {} });

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>(null);
  const value = useMemo(() => ({ variant, setVariant }), [variant]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCursor = () => useContext(Ctx);

/**
 * Returns Framer Motion + DOM handlers that set the custom-cursor variant on
 * hover and keyboard focus. Cursor change is instant (no animation), per spec.
 */
export function useCursorTarget(variant: CursorVariant) {
  const { setVariant } = useCursor();
  const enter = useCallback(() => setVariant(variant), [setVariant, variant]);
  const leave = useCallback(() => setVariant(null), [setVariant]);
  return {
    onHoverStart: enter,
    onHoverEnd: leave,
    onFocus: enter,
    onBlur: leave,
  };
}
