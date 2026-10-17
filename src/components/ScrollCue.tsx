"use client";

import { motion } from "framer-motion";

export default function ScrollCue() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
        Scroll
      </span>
      <motion.div
        className="h-9 w-px bg-gradient-to-b from-accent to-transparent"
        animate={{ scaleY: [0, 1, 0] }}
        style={{ transformOrigin: "top" }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
