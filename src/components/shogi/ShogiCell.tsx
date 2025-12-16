import { memo } from 'react';
import { pieceMap } from '@/hooks/shogi/pieces';
import { Position } from '@/hooks/shogi/types';
import classes from '@/app/shogi/page.module.scss';

interface Props {
  x: number;
  y: number;
  piece: string;
  selected: Position | null;
  legal: boolean;
  onClick: (x: number, y: number) => void;
}

// memoで再レンダリングを最適化
export const ShogiCell = memo(function ShogiCell({
  x,
  y,
  piece,
  selected,
  legal,
  onClick,
}: Props) {
  const isSelected = selected?.x === x && selected?.y === y;

  return (
    <div
      className={`${classes.shogi__cell}
        ${isSelected ? classes.selected : ''}
        ${legal ? classes.legal : ''}`}
      onClick={() => onClick(x, y)}
    >
      {pieceMap[piece]}
    </div>
  );
});