'use client';

import { useCallback, useState } from 'react';
import classes from './page.module.scss';
import { useMeditationTimer } from '@/features/meditationApp/hooks/useMeditationTimer';
import TimeSelector from '@/app/meditationApp/components/TimeSelector';
import Player from '@/app/meditationApp/components/Player';
import SoundPicker from '@/app/meditationApp/components/SoundPicker';
import SettingsModal from '@/app/meditationApp/components/SettingsModal';

const MeditationApp = () => {
  const {
    song,
    video,
    outline,
    isPlaying,
    minutes,
    seconds,
    playPause,
    addTime,
    selectSound,
    changeDuration,
  } = useMeditationTimer(600);

  const [isOpen, setIsOpen] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(10);

  // カスタム時間を適用（callbackでメモ化し、不必要な再レンダリングを防止）
  const applyCustomTime = useCallback(() => {
    changeDuration(customMinutes * 60);
    setIsOpen(false);
  }, [changeDuration, customMinutes]);

  const openSettings = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <div className={classes.meditation}>
      {/* 背景動画 */}
      <div className={classes.meditation__background}>
        <video
          ref={video}
          className={classes.meditation__backgroundVideo}
          loop
          muted
          playsInline
          preload="auto"
          webkit-playsinline="true"
          aria-hidden="true"
        />
      </div>

      <div className={classes.meditation__content}>
        {/* タイムセレクター */}
        <TimeSelector changeDuration={changeDuration} openSettings={openSettings} />

        {/* プレイヤー */}
        <Player
          song={song}
          outline={outline}
          isPlaying={isPlaying}
          minutes={minutes}
          seconds={seconds}
          playPause={playPause}
          addTime={addTime}
        />

        {/* サウンド選択 */}
        <SoundPicker selectSound={selectSound} />
      </div>

      {/* 設定モーダル */}
      {isOpen && (
        <SettingsModal
          customMinutes={customMinutes}
          setCustomMinutes={setCustomMinutes}
          applyCustomTime={applyCustomTime}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default MeditationApp;