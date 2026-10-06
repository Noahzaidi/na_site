"use client";

import { useState } from "react";
import { PauseIcon, PlayIcon } from "@/components/icons";
import type { Dictionary } from "@/content/i18n/types";

export type MotionText = Pick<Dictionary["media"], "play" | "pause" | "animation">;

/** Pauses the continuous workflow animation (WCAG 2.2.2). Hidden under reduced motion. */
export function MotionToggle({ targetId, t }: { targetId: string; t: MotionText }) {
  const [paused, setPaused] = useState(false);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    document.getElementById(targetId)?.setAttribute("data-paused", String(next));
  };

  return (
    <button type="button" className="wf-toggle" onClick={toggle} aria-controls={targetId}>
      {paused ? <PlayIcon /> : <PauseIcon />}
      <span>
        {paused ? t.play : t.pause}
        <span className="sr-only"> {t.animation}</span>
      </span>
    </button>
  );
}
