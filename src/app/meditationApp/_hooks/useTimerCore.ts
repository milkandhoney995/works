// src/app/meditationApp/_hooks/useTimerCore.ts
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * タイマーの中核ロジックを管理する hook
 *
 * - 時間計測
 * - 再生 / 停止
 * - 残り時間計算
 *
 * DOM・UI・Media に一切依存しない。
 *
 * @param initialSeconds 初期時間（秒）
 * @returns タイマー制御用 API
 */
export const useTimerCore = (initialSeconds: number) => {
  const startedAtRef = useRef<number | null>(null);
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  /**
   * タイマー進行処理
   */
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      if (!startedAtRef.current) return;

      const elapsedSeconds = Math.floor(
        (Date.now() - startedAtRef.current) / 1000
      );

      const nextRemaining = Math.max(
        0,
        totalSeconds - elapsedSeconds
      );

      setRemainingSeconds(nextRemaining);

      if (nextRemaining === 0) {
        setIsRunning(false);
        startedAtRef.current = null;
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [isRunning, totalSeconds]);

  /**
   * タイマーを開始する
   */
  const startTimer = useCallback(() => {
    startedAtRef.current = Date.now();
    setIsRunning(true);
  }, []);

  /**
   * タイマーを一時停止する
   */
  const pauseTimer = useCallback(() => {
    if (startedAtRef.current) {
      const elapsedSeconds = Math.floor(
        (Date.now() - startedAtRef.current) / 1000
      );
      setRemainingSeconds(prev =>
        Math.max(0, prev - elapsedSeconds)
      );
      startedAtRef.current = null;
    }
    setIsRunning(false);
  }, []);

  /**
   * タイマーをリセットする
   *
   * @param nextSeconds 新しい時間（秒）
   */
  const resetTimer = useCallback((nextSeconds: number) => {
    setTotalSeconds(nextSeconds);
    setRemainingSeconds(nextSeconds);
    setIsRunning(false);
    startedAtRef.current = null;
  }, []);

  /**
   * タイマー時間を延長する
   *
   * @param additionalSeconds 追加する秒数
   */
  const extendDuration = useCallback((additionalSeconds: number) => {
    setTotalSeconds(prev => prev + additionalSeconds);
    setRemainingSeconds(prev => prev + additionalSeconds);
  }, []);

  return {
    totalSeconds,
    remainingSeconds,
    isRunning,

    startTimer,
    pauseTimer,
    resetTimer,
    extendDuration,
  };
};