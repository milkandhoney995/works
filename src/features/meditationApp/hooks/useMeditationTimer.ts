import { useCallback, useEffect, useRef, useState } from 'react';

interface TimerState {
  duration: number;
  remainingTime: number;
}

export function useMeditationTimer(initialDuration: number) {
  const song = useRef<HTMLAudioElement | null>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const outline = useRef<SVGCircleElement | null>(null);
  const startTime = useRef<number | null>(null);

  const [timerState, setTimerState] = useState<TimerState>({
    duration: initialDuration,
    remainingTime: initialDuration,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const minutes = Math.floor(timerState.remainingTime / 60);
  const seconds = timerState.remainingTime % 60;

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
      if (!startTime.current) return;

      const elapsed = Date.now() - startTime.current;
      const newRemaining = Math.max(0, timerState.duration - Math.floor(elapsed / 1000));

      setTimerState(prev => ({ ...prev, remainingTime: newRemaining }));

      if (newRemaining === 0) {
        setIsPlaying(false);
        startTime.current = null;
        // Reset media on completion
        if (song.current) {
          song.current.pause();
          song.current.currentTime = 0;
        }
        if (video.current) {
          video.current.pause();
          video.current.currentTime = 0;
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, timerState.duration]);

  /* ---------------- 円形プログレス更新 ---------------- */
  useEffect(() => {
    if (!outline.current) return;

    const length = outline.current.getTotalLength();
    const progress = timerState.remainingTime / timerState.duration;
    outline.current.style.strokeDashoffset = `${length * (1 - progress)}`;
  }, [timerState.remainingTime, timerState.duration]);

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
    if (!isPlaying) {
      // 再生開始時に開始時間を記録
      startTime.current = Date.now();
      setIsPlaying(true);
    } else {
      // 一時停止時に経過時間を計算して残り時間を更新
      if (startTime.current) {
        const elapsed = Date.now() - startTime.current;
        const used = Math.floor(elapsed / 1000);
        setTimerState(prev => ({
          ...prev,
          remainingTime: Math.max(0, prev.remainingTime - used)
        }));
        startTime.current = null;
      }
      setIsPlaying(false);
    }
  }, [isPlaying]);

  /* ---------------- リセット ---------------- */
  const resetTimer = useCallback((newDuration: number) => {
    setTimerState({ duration: newDuration, remainingTime: newDuration });
    startTime.current = null;
    setIsPlaying(false);

    if (song.current) song.current.currentTime = 0;
    if (video.current) video.current.currentTime = 0;

    if (outline.current) {
      outline.current.style.strokeDashoffset = '0'; // リセット時に進捗をリセット
    }
  }, []);

  /* ---------------- ＋1分 ---------------- */
  const addTime = useCallback((seconds: number) => {
    setTimerState(prev => ({
      duration: prev.duration + seconds,
      remainingTime: prev.remainingTime + seconds,
    }));
  }, []);

  /* ---------------- 時間変更 ---------------- */
  const changeDuration = useCallback(
    (seconds: number) => {
      setIsPlaying(false);
      startTime.current = null;
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