'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Howl } from 'howler';

interface UseSoundOptions {
  volume?: number;
  loop?: boolean;
  autoplay?: boolean;
}

export function useAmbientSound(src: string, options: UseSoundOptions = {}) {
  const { volume = 0.3, loop = true, autoplay = false } = options;
  const soundRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Check localStorage for saved preference
    const savedMuted = localStorage.getItem('et-scan-sound-muted');
    if (savedMuted !== null) {
      setIsMuted(savedMuted === 'true');
    }
  }, []);

  useEffect(() => {
    // Create Howl instance
    soundRef.current = new Howl({
      src: [src],
      volume,
      loop,
      autoplay: false,
    });

    return () => {
      soundRef.current?.unload();
    };
  }, [src, volume, loop]);

  useEffect(() => {
    if (!soundRef.current) return;

    if (!isMuted && autoplay) {
      soundRef.current.play();
      setIsPlaying(true);
    } else {
      soundRef.current.pause();
      setIsPlaying(false);
    }
  }, [isMuted, autoplay]);

  const play = useCallback(() => {
    if (soundRef.current && !isMuted) {
      soundRef.current.play();
      setIsPlaying(true);
    }
  }, [isMuted]);

  const pause = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('et-scan-sound-muted', String(newMuted));

    if (soundRef.current) {
      if (newMuted) {
        soundRef.current.pause();
        setIsPlaying(false);
      } else {
        soundRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [isMuted]);

  const setVolume = useCallback((newVolume: number) => {
    if (soundRef.current) {
      soundRef.current.volume(newVolume);
    }
  }, []);

  return {
    play,
    pause,
    toggle,
    toggleMute,
    setVolume,
    isPlaying,
    isMuted,
  };
}

// Simple sound effect hook for UI interactions
export function useSoundEffect() {
  const playClick = useCallback(() => {
    // Could be expanded to play actual sound effects
    // For now, we'll just have the API ready
  }, []);

  const playSuccess = useCallback(() => {
    // Success sound
  }, []);

  const playError = useCallback(() => {
    // Error sound
  }, []);

  return { playClick, playSuccess, playError };
}
