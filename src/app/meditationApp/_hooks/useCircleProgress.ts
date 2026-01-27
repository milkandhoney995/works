import { useEffect, useRef } from 'react';

/**
 * SVG 円形プログレスを制御する hook
 *
 * @param remainingSeconds 残り時間（秒）
 * @param totalSeconds 全体時間（秒）
 * @returns SVG ref と操作 API
 */
export const useCircleProgress = (
  remainingSeconds: number,
  totalSeconds: number
) => {
  const outlineRef = useRef<SVGCircleElement | null>(null);

  /**
   * 円形プログレスの初期化
   */
  useEffect(() => {
    if (!outlineRef.current) return;

    const length = outlineRef.current.getTotalLength();
    outlineRef.current.style.strokeDasharray = `${length}`;
  }, []);

  /**
   * 残り時間に応じて円形進捗を更新
   */
  useEffect(() => {
    if (!outlineRef.current) return;

    const length = outlineRef.current.getTotalLength();
    const progressRatio = remainingSeconds / totalSeconds;

    outlineRef.current.style.strokeDashoffset =
      `${length * (1 - progressRatio)}`;
  }, [remainingSeconds, totalSeconds]);

  /**
   * プログレスを初期状態に戻す
   */
  const resetProgress = () => {
    if (outlineRef.current) {
      outlineRef.current.style.strokeDashoffset = '0';
    }
  };

  return { outlineRef, resetProgress };
};