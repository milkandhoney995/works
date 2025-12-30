
'use client';

import { forwardRef } from 'react';
import classes from '@/app/meditationApp/page.module.scss';

interface Props {
  type: 'track' | 'progress';
}

const CircleProgress = forwardRef<SVGCircleElement, Props>(({ type }, ref) => {
  const isProgress = type === 'progress';

  return (
    <svg
      className={
        isProgress
          ? classes.meditation__progress
          : classes.meditation__track
      }
      width="453"
      height="453"
      viewBox="0 0 453 453"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        ref={isProgress ? ref : undefined}
        cx="226.5"
        cy="226.5"
        r="216.5"
        stroke={isProgress ? '#018EBA' : 'white'}
        strokeWidth="20"
      />
    </svg>
  )
})

export default CircleProgress;