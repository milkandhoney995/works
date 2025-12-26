import { useCallback, useEffect, useRef, useState } from 'react';

export function useMeditationTimer(initialDuration: number) {
  const song = useRef<HTMLAudioElement>(null);
  const outline = useRef<SVGCircleElement>(null);
  const video = useRef<HTMLVideoElement>(null);

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

  /* ---------------- タイマー処理 ---------------- */
  useEffect(() => {
    const audio = song.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const current = audio.currentTime
      const remain = Math.max(duration - current, 0)
      setRemainingTime(remain)

      if (outline.current) {
        const length = outline.current.getTotalLength()
        const offset = length - (current / duration) * length
        outline.current.style.strokeDashoffset = `${offset}`
      }

      if (current >= duration) {
        audio.pause()
        audio.currentTime = 0;
        video.current?.pause()
        setIsPlaying(false)
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate)
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate)

  }, [duration]);

  /* ---------------- 操作系 ---------------- */
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

  const restart = useCallback(() => {
    const audio = song.current;
    const vid = video.current;
    if (!audio || !vid) return;

    audio.currentTime = 0;
    vid.currentTime = 0;
    setRemainingTime(duration);

    if (outline.current) {
      const length = outline.current.getTotalLength();
      outline.current.style.strokeDashoffset = `${length}`;
    }
  }, [duration]);

  /** todo① 一定時間経過後に時間を追加 */
  const addTime = useCallback((seconds: number) => {
    setDuration(prev => prev + seconds);
    setRemainingTime(prev => prev + seconds);
  }, []);

  /** todo② 設定用（2分 / 5分 / カスタム） */
  const changeDuration = useCallback((seconds: number) => {
    setDuration(seconds);
    setRemainingTime(seconds);
    restart();
  }, [restart]);

  const selectSound = useCallback(
    (soundSrc: string, videoSrc: string, seconds: number) => {
      if (!song.current || !video.current) return;

      song.current.src = soundSrc;
      video.current.src = videoSrc;
      changeDuration(seconds);

      if (isPlaying) {
        song.current.play();
        video.current.play();
      }
    },
    [changeDuration, isPlaying]
  );

  return {
    // refs
    song,
    video,
    outline,

    // state
    isPlaying,
    remainingTime,

    minutes,
    seconds,

    // actions
    playPause,
    restart,
    addTime,
    changeDuration,
    selectSound,
  };
}