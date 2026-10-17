"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 25, stiffness: 300, mass: 0.5 });
  const springY = useSpring(y, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;
    setEnabled(true);

    function handleMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement;
      const hoverTarget = target.closest<HTMLElement>(
        "a, button, [data-cursor-hover]",
      );
      setHovering(Boolean(hoverTarget));
      setLabel(hoverTarget?.dataset.cursorLabel ?? null);
    }

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 64 : hovering ? 40 : 16;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-white"
        animate={{ width: size, height: size }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[10px] uppercase tracking-wider text-black"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
