import { pieceMap } from '@/features/shogi/data/pieces';
import { Hands } from '@/features/shogi/state/types';
import classes from '@/app/shogi/page.module.scss';
import clsx from 'clsx';

interface Props {
  hands: Hands;
  onSelect: (piece: string) => void;
  className?: string;
}

export const ShogiHands = ({ hands, onSelect, className }: Props) => {
  return (
    <div className={clsx(classes.shogi__hands, className)}>
      {Object.entries(hands).map(([piece, count]) =>
        count > 0 ? (
          <button
            key={piece}
            onClick={() => onSelect(piece)}
            aria-label={`${pieceMap[piece]} ${count}個`}
          >
            {pieceMap[piece]} × {count}
          </button>
        ) : null
      )}
    </div>
  );
};