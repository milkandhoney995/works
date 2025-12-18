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

  // 後手（大文字）なら反転
  const isGote = piece !== '' && piece[0] === piece[0].toUpperCase();

  return (
    <div
      className={[
        classes.shogi__cell,
        isSelected && classes.selected,
        legal && classes.legal,
      ].filter(Boolean).join(' ')}
      onClick={() => onClick(x, y)}
    >
      <span className={isGote ? classes.gote : ''}>
        {pieceMap[piece]}
      </span>
    </div>
  );
});