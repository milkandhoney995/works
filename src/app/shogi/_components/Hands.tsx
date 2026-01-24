import { Hands } from '@/features/shogi/state/types';
import classes from '@/app/shogi/page.module.scss';
import clsx from 'clsx';
import { pieceMap } from '@/features/shogi/board/pieces';

interface Props {
  hands: Hands;
  selectedHandPiece: string | null;
  onSelect: (piece: string) => void;
  className?: string;
}

const Hand = ({ hands, selectedHandPiece, onSelect, className }: Props) => {
  return (
    <div className={clsx(classes.shogi__hands, className)}>
      {Object.entries(hands).map(([piece, count]) =>
        count > 0 ? (
          <button
            key={piece}
            type="button"
            onClick={() => onSelect(piece)}
            className={clsx(
              classes.shogi__handPiece,
              selectedHandPiece === piece && classes.selected
            )}
            aria-pressed={selectedHandPiece === piece}
            aria-label={`${pieceMap[piece]} ${count}個`}
          >
            {pieceMap[piece]} × {count}
          </button>
        ) : null
      )}
    </div>
  );
};

export default Hand;