"use client";

import { useState } from "react";
import { PauseIcon, PlayIcon } from "@/components/icons";

/** Pauses the continuous workflow animation (WCAG 2.2.2). Hidden under reduced motion. */
export function MotionToggle({ targetId }: { targetId: string }) {
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
        {paused ? "Play" : "Pause"}
        <span className="sr-only"> animation</span>
      </span>
    </button>
  );
}
