import { useEffect, useRef } from 'react';

export const useMediaController = (isPlaying: boolean) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (!audio || !video) return;

    if (isPlaying) {
      audio.play().catch(() => {});
      video.play().catch(() => {});
    } else {
      audio.pause();
      video.pause();
    }
  }, [isPlaying]);

  const resetMedia = () => {
    if (audioRef.current) audioRef.current.currentTime = 0;
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  return { audioRef, videoRef, resetMedia };
}