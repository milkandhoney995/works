import { useCallback } from 'react';
import { useTimerCore } from './useTimerCore';
import { useMediaController } from './useMediaController';
import { useCircleProgress } from './useCircleProgress';

/**
 * MeditationApp 用の統合タイマーフック（Facade）
 *
 * - タイマー制御
 * - メディア（audio / video）制御
 * - 円形プログレス制御
 *
 * UI コンポーネントはこの hook のみを利用し、
 * 内部実装（timer / media / progress）には依存しない。
 *
 * @param initialDuration 初期の瞑想時間（秒）
 * @returns UI 向けに整形されたタイマー操作 API
 */
export const useMeditationTimer = (initialDuration: number) => {
  const timer = useTimerCore(initialDuration);
  const media = useMediaController(timer.isRunning);
  const progress = useCircleProgress(timer.remainingSeconds, timer.totalSeconds);
  const minutes = Math.floor(timer.remainingSeconds / 60);
  const seconds = timer.remainingSeconds % 60;

  /**
   * 再生 / 一時停止を切り替える
   */
  const togglePlayPause = () => {
    timer.isRunning ? timer.pauseTimer() : timer.startTimer();
  };

  /**
   * タイマーに指定秒数を加算する
   *
   * @param additionalSeconds 追加する秒数
   */
  const addTime = useCallback(
    (additionalSeconds: number) => {
      timer.extendDuration(additionalSeconds);
    },
    [timer]
  );

  /**
   * タイマー時間を変更し、状態をリセットする
   *
   * @param nextSeconds 新しいタイマー時間（秒）
   */
  const changeDuration = useCallback(
    (nextSeconds: number) => {
      timer.resetTimer(nextSeconds);
      media.resetMedia();
      progress.resetProgress();
    },
    [timer, media, progress]
  );

  /**
   * サウンド・背景動画を変更し、タイマーをリセットする
   *
   * @param audioSrc 音声ファイルのパス
   * @param videoSrc 動画ファイルのパス
   * @param durationSeconds 新しいタイマー時間（秒）
   */
  const selectSound = useCallback(
    (audioSrc: string, videoSrc: string, durationSeconds: number) => {
      if (!media.audioRef.current || !media.videoRef.current) return;

      media.audioRef.current.src = audioSrc;
      media.videoRef.current.src = videoSrc;

      media.audioRef.current.load();
      media.videoRef.current.load();

      timer.resetTimer(durationSeconds);
      media.resetMedia();
      progress.resetProgress();
    },
    [media, timer, progress]
  );

  return {
    // refs
    song: media.audioRef,
    video: media.videoRef,
    outline: progress.outlineRef,

    // state
    isPlaying: timer.isRunning,
    minutes,
    seconds,

    // actions
    playPause: togglePlayPause,
    addTime,
    changeDuration,
    selectSound,
  };
};