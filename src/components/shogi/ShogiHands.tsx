import { pieceMap } from '@/hooks/shogi/pieces';
import { Hands } from '@/hooks/shogi/types';
import classes from '@/app/shogi/page.module.scss';

interface Props {
  hands: Hands;
  onSelect: (piece: string) => void;
}

export const ShogiHands = ({ hands, onSelect }: Props) => {
  return (
    <div className={classes.shogi__hands}>
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