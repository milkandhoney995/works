import { useCallback } from 'react';
import { useTimerCore } from './useTimerCore';
import { useMediaController } from './useMediaController';
import { useCircleProgress } from './useCircleProgress';

export function useMeditationTimer(initialDuration: number) {
  const timer = useTimerCore(initialDuration);
  const media = useMediaController(timer.isPlaying);
  const progress = useCircleProgress(timer.remainingTime, timer.duration);

  const minutes = Math.floor(timer.remainingTime / 60);
  const seconds = timer.remainingTime % 60;

  const playPause = () => {
    timer.isPlaying ? timer.pause() : timer.play();
  };

  const addTime = useCallback(
    (seconds: number) => {
      timer.setDuration(timer.duration + seconds);
      timer.setRemainingTime(prev => prev + seconds);
    },
    [timer]
  );

  const changeDuration = useCallback(
    (seconds: number) => {
      timer.reset(seconds);
      media.resetMedia();
      progress.resetProgress();
    },
    [timer, media, progress]
  );

  const selectSound = useCallback(
    (soundSrc: string, videoSrc: string, seconds: number) => {
      if (!media.audioRef.current || !media.videoRef.current) return;

      media.audioRef.current.src = soundSrc;
      media.videoRef.current.src = videoSrc;

      media.audioRef.current.load();
      media.videoRef.current.load();

      timer.reset(seconds);
      media.resetMedia();
      progress.resetProgress();
    },
    [media, timer, progress]
  );

  return {
    song: media.audioRef,
    video: media.videoRef,
    outline: progress.outlineRef,

    isPlaying: timer.isPlaying,
    minutes,
    seconds,

    playPause,
    addTime,
    changeDuration,
    selectSound
  };
}