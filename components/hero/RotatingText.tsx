"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type Props = {
  items: readonly string[];
};

export function RotatingText({ items }: Props) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [items.length, reduce]);

  const current = items[index] ?? items[0];

  if (reduce) {
    return (
      <span className="font-mono text-sm text-accent-blue">{current}</span>
    );
  }

  return (
    <span className="relative inline-flex min-h-[1.5rem] min-w-[12rem] items-center font-mono text-sm text-accent-blue">
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
