/**
 * useCountUp — animates a number from 0 to the target value.
 * Uses requestAnimationFrame with an ease-out cubic curve for a premium feel.
 */
"use client";

import { useEffect, useState } from "react";

export function useCountUp(target: number, duration = 1100): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let rafId: number | undefined;
    let startTime: number | null = null;

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  }, [target, duration]);

  return value;
}

