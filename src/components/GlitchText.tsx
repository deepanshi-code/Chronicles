"use client";

import { useEffect, useRef, useState } from "react";

const GLITCH_CHARS = "!<>-_\\/[]{}=+*^?#@$%01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

function scramble(text: string, lockedCount: number) {
  return text
    .split("")
    .map((char, i) => (char === " " || i < lockedCount ? char : randomChar()))
    .join("");
}

export default function GlitchText({
  text,
  delay = 0,
  trigger,
  playOnMount = true,
  className,
}: {
  text: string;
  delay?: number;
  /** Change this value (e.g. a counter) to replay the animation on demand, such as on hover. */
  trigger?: unknown;
  /** Set to false to skip the automatic first play and only animate when `trigger` changes. */
  playOnMount?: boolean;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const [glitching, setGlitching] = useState(false);
  const isFirstRun = useRef(true);

  useEffect(() => {
    const firstRun = isFirstRun.current;
    isFirstRun.current = false;

    if (firstRun && !playOnMount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const duration = 500 + text.length * 45;
    let frame: number;
    let startTimeout: ReturnType<typeof setTimeout>;

    startTimeout = setTimeout(() => {
      setGlitching(true);
      const start = performance.now();

      function tick(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        const lockedCount = Math.floor(progress * text.length);
        setDisplay(scramble(text, lockedCount));

        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          setDisplay(text);
          setGlitching(false);
        }
      }

      frame = requestAnimationFrame(tick);
    }, firstRun ? delay : 0);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, trigger, playOnMount]);

  return (
    <span
      aria-label={text}
      className={`glitch-text ${glitching ? "is-glitching" : ""} ${className ?? ""}`}
    >
      {display}
    </span>
  );
}
