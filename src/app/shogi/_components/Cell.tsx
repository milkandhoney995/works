import { memo } from 'react';
import clsx from 'clsx';
import classes from '@/app/shogi/page.module.scss';
import { isSentePiece, pieceMap } from '@/features/shogi';

interface Props {
  x: number;
  y: number;
  piece: string;
  isSelected: boolean;
  legal: boolean;
  isCheckedKing: boolean;
  onClick: (x: number, y: number) => void;
}

// 不必要な再レンダリングを防ぐために memo を使用
const Cell = memo(function Cell({
  x,
  y,
  piece,
  isSelected,
  legal,
  isCheckedKing,
  onClick,
}: Props) {
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

export default Cell;