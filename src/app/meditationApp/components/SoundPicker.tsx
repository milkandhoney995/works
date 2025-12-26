'use client';

import Image from 'next/image';
import classes from '../page.module.scss';
import { soundOptions } from '@/data/soundOptions';

interface SoundPickerProps {
  selectSound: (sound: string, video: string, duration: number) => void;
}

const SoundPicker = ({ selectSound }: SoundPickerProps) => {
  return (
    <div className={classes.meditation__column}>
      {soundOptions.map((option) => (
        <button
          key={option.id}
          className={`${classes.meditation__soundButton} ${classes[`meditation__soundButton${option.styleClass}`]}`}
          onClick={() => selectSound(option.sound, option.video, option.duration)}
        >
          <Image src={option.icon} width={60} height={60} alt={option.alt} />
        </button>
      ))}
    </div>
  );
};

export default SoundPicker;