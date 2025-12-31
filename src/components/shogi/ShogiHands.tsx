import { pieceMap } from '@/hooks/shogi/pieces';
import { Hands } from '@/features/shogi/state/types';
import classes from '@/app/shogi/page.module.scss';

interface Props {
  hands: Hands;
  onSelect: (piece: string) => void;
  className?: string;
}

export const ShogiHands = ({ hands, onSelect, className }: Props) => {
  return (
    <div className={[classes.shogi__hands, className].filter(Boolean).join(' ')}>
      {Object.entries(hands).map(([piece, count]) =>
        count > 0 ? (
          <button key={piece} onClick={() => onSelect(piece)}>
            {pieceMap[piece]} × {count}
          </button>
        ) : null
      )}
    </div>
  );
};