'use client';

import classes from '@/app/meditationApp/page.module.scss';
import { timeOptions } from '@/data/timeOptions';

interface Props {
  changeDuration: (seconds: number) => void;
  openSettings: () => void;
}

const TimeSelector = ({ changeDuration, openSettings }: Props) => {
  return (
    <div className={`${classes.meditation__column} ${classes.meditation__timeSelector}`}>
      {timeOptions.map((option) => (
        <button key={option.id} onClick={() => changeDuration(option.duration)}>
          {option.label}
        </button>
      ))}
      <button onClick={openSettings}>Setting</button>
    </div>
  );
};

export default TimeSelector;