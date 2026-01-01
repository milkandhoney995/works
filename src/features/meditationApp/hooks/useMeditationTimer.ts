import { useCallback, useEffect, useRef, useState } from 'react';

export function useMeditationTimer(initialDuration: number) {
  const song = useRef<HTMLAudioElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const outline = useRef<SVGCircleElement>(null);

  const [duration, setDuration] = useState(initialDuration);
  const [remainingTime, setRemainingTime] = useState(initialDuration);
  const [isPlaying, setIsPlaying] = useState(false);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  /* ---------------- 円形プログレス初期化 ---------------- */
  useEffect(() => {
    if (!outline.current) return;

    const length = outline.current.getTotalLength();
    outline.current.style.strokeDasharray = `${length}`;
    outline.current.style.strokeDashoffset = `${length}`;
  }, []);

  /* ---------------- タイマー進行 ---------------- */
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  /* ---------------- 円形プログレス更新 ---------------- */
  useEffect(() => {
    if (!outline.current) return;

    const length = outline.current.getTotalLength();
    const progress = remainingTime / duration;
    outline.current.style.strokeDashoffset = `${length * (1 - progress)}`;
  }, [remainingTime, duration]);

  /* ---------------- 再生制御（audio / video） ---------------- */
  useEffect(() => {
    const audio = song.current;
    const vid = video.current;
    if (!audio || !vid) return;

    if (isPlaying) {
      audio.play().catch(() => {});
      vid.play().catch(() => {});
    } else {
      audio.pause();
      vid.pause();
    }
  }, [isPlaying]);

  /* ---------------- 再生 / 停止 ---------------- */
  const playPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  /* ---------------- リセット ---------------- */
  const resetTimer = useCallback((newDuration: number) => {
    setRemainingTime(newDuration);

    if (song.current) song.current.currentTime = 0;
    if (video.current) video.current.currentTime = 0;

    if (outline.current) {
      const length = outline.current.getTotalLength();
      outline.current.style.strokeDashoffset = `${length}`;
    }
  }, []);

  /* ---------------- ＋1分 ---------------- */
  const addTime = useCallback((seconds: number) => {
    setDuration(prev => prev + seconds);
    setRemainingTime(prev => prev + seconds);
  }, []);

  /* ---------------- 時間変更 ---------------- */
  const changeDuration = useCallback(
    (seconds: number) => {
      setIsPlaying(false);
      setDuration(seconds);
      resetTimer(seconds);
    },
    [resetTimer]
  );

  /* ---------------- サウンド / 動画変更 ---------------- */
  const selectSound = useCallback(
    (soundSrc: string, videoSrc: string, seconds: number) => {
      if (!song.current || !video.current) return;

      song.current.src = soundSrc;
      video.current.src = videoSrc;

      song.current.load();
      video.current.load();

      changeDuration(seconds);
    },
    [changeDuration]
  );

  return {
    song,
    video,
    outline,

    isPlaying,
    minutes,
    seconds,

    playPause,
    addTime,
    changeDuration,
    selectSound,
  };
}