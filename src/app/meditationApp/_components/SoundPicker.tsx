'use client';

import { memo } from 'react';
import Image from 'next/image';
import classes from '@/app/meditationApp/page.module.scss';
import { soundOptions } from '@/data/soundOptions';

interface SoundPickerProps {
  selectSound: (sound: string, video: string, duration: number) => void;
}

// 不必要な再レンダリングを防ぐために memo を使用
const SoundPicker = memo(({ selectSound }: SoundPickerProps) => {
  return (
    <div className={classes.meditation__column} role="group" aria-label="サウンド選択">
      {soundOptions.map((option) => (
        <button
          key={option.id}
          className={`${classes.meditation__soundButton} ${classes[`meditation__soundButton${option.styleClass}`]}`}
          onClick={() => selectSound(option.sound, option.video, option.duration)}
          aria-label={`${option.alt}サウンドを選択`}
        >
          <Image src={option.icon} width={60} height={60} alt="" />
        </button>
      ))}
    </div>
  );
});

SoundPicker.displayName = 'SoundPicker';

export default SoundPicker;