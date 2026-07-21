"use client";

import { useCallback, useRef, useState, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export function HeroVideoPlayer({
  src,
  poster,
  className,
}: HeroVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => {
        // Browsers can reject play() (e.g. autoplay policy with audio); ignore.
      });
    } else {
      video.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && video.volume === 0) {
      video.volume = 0.5;
      setVolume(0.5);
    }
  }, []);

  const handleVolumeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const next = parseFloat(e.target.value);
    setVolume(next);
    if (!video) return;
    video.volume = next;
    if (next === 0) {
      video.muted = true;
      setIsMuted(true);
    } else if (video.muted) {
      video.muted = false;
      setIsMuted(false);
    }
  }, []);

  const showPauseOverlay = isPlaying && isHovered;
  const showVolume = isHovered && isPlaying;
  const effectivelyMuted = isMuted || volume === 0;

  return (
    <div
      className={cn(
        "group relative aspect-video overflow-hidden rounded-2xl border border-primary/10 bg-black shadow-2xl md:rounded-3xl",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onVolumeChange={() => {
          const video = videoRef.current;
          if (!video) return;
          setIsMuted(video.muted);
          setVolume(video.volume);
        }}
        className="h-full w-full cursor-pointer object-cover"
      />

      {/* Soft gradient overlay so controls have contrast on bright frames */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-200",
          isPlaying && !isHovered ? "opacity-0" : "opacity-100",
        )}
      />

      <AnimatePresence>
        {!isPlaying && (
          <motion.button
            key="play"
            type="button"
            aria-label="Play video"
            onClick={togglePlay}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute inset-0 flex items-center justify-center focus:outline-none"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl ring-4 ring-white/30 transition md:h-24 md:w-24">
              <Play className="h-8 w-8 translate-x-0.5 fill-current md:h-10 md:w-10" />
            </span>
          </motion.button>
        )}

        {showPauseOverlay && (
          <motion.button
            key="pause"
            type="button"
            aria-label="Pause video"
            onClick={togglePlay}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute inset-0 flex items-center justify-center focus:outline-none"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-black/60 text-white shadow-2xl ring-4 ring-white/20 backdrop-blur-md md:h-24 md:w-24">
              <Pause className="h-8 w-8 fill-current md:h-10 md:w-10" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVolume && (
          <motion.div
            key="volume"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-white backdrop-blur-md"
          >
            <button
              type="button"
              onClick={toggleMute}
              aria-label={effectivelyMuted ? "Unmute video" : "Mute video"}
              className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              {effectivelyMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={effectivelyMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
              className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/25 accent-primary outline-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
