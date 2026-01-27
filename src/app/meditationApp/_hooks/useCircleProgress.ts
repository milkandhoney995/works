import { useEffect, useRef } from 'react';

export const useCircleProgress = (remaining: number, duration: number) => {
  const outlineRef = useRef<SVGCircleElement | null>(null);

  // 初期化
  useEffect(() => {
    if (!outlineRef.current) return;

    const length = outlineRef.current.getTotalLength();
      outlineRef.current.style.strokeDasharray = `${length}`;
  }, []);

  // 円の更新
  useEffect(() => {
    if (!outlineRef.current) return;

    const length = outlineRef.current.getTotalLength();
    const progress = remaining / duration;
    outlineRef.current.style.strokeDashoffset = `${length * (1 - progress)}`;
  }, [remaining, duration]);

  const resetProgress = () => {
    if (outlineRef.current) {
      outlineRef.current.style.strokeDashoffset = '0';
    }
  };

  return { outlineRef, resetProgress };
}