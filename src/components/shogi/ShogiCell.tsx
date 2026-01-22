import { memo } from 'react';
import clsx from 'clsx';
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
  isCheckedKing: boolean;
  onClick: (x: number, y: number) => void;
}

// 不必要な再レンダリングを防ぐために memo を使用
export const ShogiCell = memo(function ShogiCell({
  x,
  y,
  piece,
  selected,
  legal,
  isCheckedKing,
  onClick,
}: Props) {
  const isSelected = selected?.x === x && selected?.y === y;

  // 後手（大文字）なら反転
  const isGote = piece !== '' && !isSentePiece(piece);

  return (
    <button
      className={clsx(
        classes.shogi__cell,
        {
          [classes.selected]: isSelected,
          [classes.legal]: legal,
          [classes.check]: isCheckedKing,
        }
      )}
      onClick={() => onClick(x, y)}
      aria-label={`Cell ${x}, ${y}: ${pieceMap[piece] ?? '空'}`}
      type="button"
    >
      <span className={isGote ? classes.gote : undefined}>
        {pieceMap[piece]}
      </span>
    </button>
  );
});