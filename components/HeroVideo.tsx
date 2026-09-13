"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@/components/icons";
import { asset } from "@/lib/paths";

type HeroVideoProps = {
  sources: readonly { src: string; type: string }[];
  poster: string;
};

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/**
 * Decorative background video, desktop only. The poster is a CSS background
 * inside a min-width media query, so small screens never download it or the
 * clip. Playback starts only when the visitor allows motion and is not on a
 * constrained connection.
 */
export function HeroVideo({ sources, poster }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState<boolean | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wideScreen = window.matchMedia("(min-width: 1024px)").matches;
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const constrained =
      Boolean(connection?.saveData) || /(^|-)(2g|3g)$/.test(connection?.effectiveType ?? "");
    if (reduceMotion || constrained || !wideScreen) return;

    video.muted = true;
    video
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(null));
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <div
        className="hero-video"
        aria-hidden="true"
        style={{ "--hero-poster": `url(${asset(poster)})` } as CSSProperties}
      >
        <video ref={videoRef} muted loop playsInline preload="none" disablePictureInPicture>
          {sources.map((source) => (
            <source key={source.src} src={asset(source.src)} type={source.type} />
          ))}
        </video>
      </div>
      {playing !== null && (
        <button type="button" className="hero-video-toggle" onClick={toggle}>
          {playing ? <PauseIcon /> : <PlayIcon />}
          <span>{playing ? "Pause" : "Play"} background</span>
        </button>
      )}
    </>
  );
}
