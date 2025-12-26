'use client';

import { useState } from 'react';
import classes from './page.module.scss';
import { useMeditationTimer } from '@/hooks/useMeditationTimer';
import TimeSelector from './components/TimeSelector';
import Player from './components/Player';
import SoundPicker from './components/SoundPicker';
import SettingsModal from './components/SettingsModal';

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

  const applyCustomTime = () => {
    changeDuration(customMinutes * 60);
    setIsOpen(false);
  };

  return (
    <div className={classes.meditation}>
      {/* 背景動画 */}
      <div className={classes.meditation__background}>
        <video
          ref={video}
          className={classes.meditation__backgroundVideo}
          loop
          autoPlay
          muted
        />
      </div>

      {/* タイムセレクター */}
      <TimeSelector changeDuration={changeDuration} openSettings={() => setIsOpen(true)} />

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

      {/* 設定モーダル */}
      {isOpen && (
        <SettingsModal
          customMinutes={customMinutes}
          setCustomMinutes={setCustomMinutes}
          applyCustomTime={applyCustomTime}
          closeModal={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default MeditationApp;