'use client';

import { useState } from 'react';
import classes from './page.module.scss';
import { useMeditationTimer } from '@/hooks/useMeditationTimer';
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

  const applyCustomTime = () => {
    changeDuration(customMinutes * 60);
    setIsOpen(false);
  };

  return (
    <div className={classes.meditation}>
      <div className={classes.meditation__background}>
        <video ref={video} className={classes.meditation__backgroundVideo} loop />
      </div>

      <TimeSelector changeDuration={changeDuration} openSettings={() => setIsOpen(true)} />
      <Player
        song={song}
        outline={outline}
        isPlaying={isPlaying}
        minutes={minutes}
        seconds={seconds}
        playPause={playPause}
        addTime={addTime}
      />
      <SoundPicker selectSound={selectSound} />

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