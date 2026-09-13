"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@/components/icons";

type SceneFrameProps = {
  label: string;
  children: ReactNode;
};

/**
 * Panel for a looping workflow illustration. The loop only runs while the panel
 * is on screen and not paused by the visitor; otherwise it rests on the
 * finished diagram (the first keyframe), which is also what renders without JS.
 */
export function SceneFrame({ label, children }: SceneFrameProps) {
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
        <span className="wf-chip">Illustrative workflow</span>
        <button
          type="button"
          className="wf-toggle scene-toggle"
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
          <span>
            {paused ? "Play" : "Pause"}
            <span className="sr-only"> animation</span>
          </span>
        </button>
      </div>
      <svg viewBox="0 0 400 280" role="img" aria-label={label}>
        {children}
      </svg>
    </div>
  );
}
