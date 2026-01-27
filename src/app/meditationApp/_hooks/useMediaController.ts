import { useEffect, useRef } from 'react';

/**
 * audio / video 要素の再生制御を行う hook
 *
 * @param isPlaying 再生状態
 * @returns media refs と操作 API
 */
export const useMediaController = (isPlaying: boolean) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /**
   * 再生状態に応じて media を制御
   */
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

  /**
   * メディアの再生位置をリセットする
   */
  const resetMedia = () => {
    if (audioRef.current) audioRef.current.currentTime = 0;
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  return { audioRef, videoRef, resetMedia };
};