"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@/components/icons";
import type { MotionText } from "@/components/MotionToggle";

type SceneFrameProps = {
  label: string;
  /** "Illustrative workflow" chip. */
  chip: string;
  t: MotionText;
  children: ReactNode;
};

/**
 * Panel for a looping workflow illustration. The loop only runs while the panel
 * is on screen and not paused by the visitor; otherwise it rests on the
 * finished diagram (the first keyframe), which is also what renders without JS.
 */
export function SceneFrame({ label, chip, t, children }: SceneFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px 0px" },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="scene" data-offscreen={!visible} data-paused={paused}>
      <div className="scene-head">
        <span className="wf-chip">{chip}</span>
        <button
          type="button"
          className="wf-toggle scene-toggle"
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
          <span>
            {paused ? t.play : t.pause}
            <span className="sr-only"> {t.animation}</span>
          </span>
        </button>
      </div>
      <svg viewBox="0 0 400 280" role="img" aria-label={label}>
        {children}
      </svg>
    </div>
  );
}
