import { memo } from 'react';
import { pieceMap } from '@/features/shogi/data/pieces';
import { Position } from '@/features/shogi/state/types';
import classes from '@/app/shogi/page.module.scss';
import { isSentePiece } from '@/features/shogi/logic/shogiHelpers';

interface Props {
  x: number;
  y: number;
  piece: string;
  selected: Position | null;
  legal: boolean;
  onClick: (x: number, y: number) => void;
}

// 不必要な再レンダリングを防ぐために memo を使用
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
  const isGote = piece !== '' && !isSentePiece(piece);

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