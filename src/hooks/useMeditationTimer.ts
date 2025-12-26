import { useCallback, useEffect, useRef, useState } from 'react';

export function useMeditationTimer(initialDuration: number) {
  const song = useRef<HTMLAudioElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const outline = useRef<SVGCircleElement>(null);

  const [duration, setDuration] = useState(initialDuration);
  const [remainingTime, setRemainingTime] = useState(initialDuration);
  const [isPlaying, setIsPlaying] = useState(false);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime % 60);

  /* ---------------- 初期化 ---------------- */
  useEffect(() => {
    if (!outline.current) return;

    const length = outline.current.getTotalLength();
    outline.current.style.strokeDasharray = `${length}`;
    outline.current.style.strokeDashoffset = `${length}`;
  }, []);

  /* ---------------- タイマー進行 ---------------- */
  useEffect(() => {
    const audio = song.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const current = audio.currentTime;
      const remain = Math.max(duration - current, 0);
      setRemainingTime(remain);

      if (outline.current) {
        const length = outline.current.getTotalLength();
        const offset = length - (current / duration) * length;
        outline.current.style.strokeDashoffset = `${offset}`;
      }

      if (current >= duration) {
        audio.pause();
        audio.currentTime = 0;
        video.current?.pause();
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [duration]);

  /* ---------------- 再生 ---------------- */
  const playPause = useCallback(() => {
    const audio = song.current;
    const vid = video.current;
    if (!audio || !vid) return;

    if (isPlaying) {
      audio.pause();
      vid.pause();
    } else {
      audio.play();
      vid.play();
    }
    setIsPlaying(prev => !prev);
  }, [isPlaying]);

  /* ---------------- リセット ---------------- */
  const resetTimer = useCallback((newDuration: number) => {
    if (song.current) song.current.currentTime = 0;
    if (video.current) video.current.currentTime = 0;

    setRemainingTime(newDuration);

    if (outline.current) {
      const length = outline.current.getTotalLength();
      outline.current.style.strokeDashoffset = `${length}`;
    }
  }, []);

  /* ---------------- ＋1分（todo①） ---------------- */
  const addTime = useCallback((seconds: number) => {
    setDuration(prev => prev + seconds);
    setRemainingTime(prev => prev + seconds);
  }, []);

  /* ---------------- 時間変更（todo②） ---------------- */
  const changeDuration = useCallback(
    (seconds: number) => {
      setDuration(seconds);
      resetTimer(seconds);
      setIsPlaying(false);
    },
    [resetTimer]
  );

  /* ---------------- サウンド ---------------- */
  const selectSound = useCallback(
    (soundSrc: string, videoSrc: string, seconds: number) => {
      if (!song.current || !video.current) return;

      song.current.src = soundSrc;
      video.current.src = videoSrc;
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