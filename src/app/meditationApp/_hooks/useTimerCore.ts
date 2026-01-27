import { useCallback, useEffect, useRef, useState } from 'react';

export function useTimerCore(initialDuration: number) {
  const startTime = useRef<number | null>(null);

  const [duration, setDuration] = useState(initialDuration);
  const [remainingTime, setRemainingTime] = useState(initialDuration);
  const [isPlaying, setIsPlaying] = useState(false);

  // タイマー進行
  useEffect(() => {
    if (!isPlaying) return;

    const id = setInterval(() => {
      if (!startTime.current) return;

      const elapsed = Date.now() - startTime.current;
      const next = Math.max(0, duration - Math.floor(elapsed / 1000));

      setRemainingTime(next);

      if (next === 0) {
        setIsPlaying(false);
        startTime.current = null;
      }
    }, 100);

    return () => clearInterval(id);
  }, [isPlaying, duration]);

  const play = useCallback(() => {
    startTime.current = Date.now();
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    if (startTime.current) {
      const elapsed = Date.now() - startTime.current;
      setRemainingTime(prev => Math.max(0, prev - Math.floor(elapsed / 1000)));
      startTime.current = null;
    }
    setIsPlaying(false);
  }, []);

  const reset = useCallback((nextDuration: number) => {
    setDuration(nextDuration);
    setRemainingTime(nextDuration);
    setIsPlaying(false);
    startTime.current = null;
  }, []);

  return {
    duration,
    remainingTime,
    isPlaying,
    play,
    pause,
    reset,
    setDuration,
    setRemainingTime,
  };
}