import { ShogiBoard } from './ShogiBoard';
import { ShogiHands } from './ShogiHands';
import { PendingPromotion, Position, Hands } from '@/hooks/shogi/types';
import classes from '@/app/shogi/page.module.scss';

interface Props {
  board: string[][];
  selected: Position | null;
  legalMoves: Position[];
  hands: Hands;
  pendingPromotion: PendingPromotion;
  onCellClick: (x: number, y: number) => void;
  onHandSelect: (piece: string) => void;
  onPromote: (promote: boolean) => void;
}

export const ShogiBoardWithPromotion = ({
  board,
  selected,
  legalMoves,
  hands,
  pendingPromotion,
  onCellClick,
  onHandSelect,
  onPromote,
}: Props) => {
  return (
    <div className={classes.shogi__container}>
      {/* 将棋盤 */}
      <ShogiBoard
        board={board}
        selected={selected}
        legalMoves={legalMoves}
        onCellClick={onCellClick}
      />

      {/* 持ち駒 */}
      <ShogiHands hands={hands} onSelect={onHandSelect} />

      {/* 成り選択ダイアログ */}
      {pendingPromotion && (
        <div className={classes.shogi__promotionDialog}>
          <p>成りますか？</p>
          <button onClick={() => onPromote(true)}>成る</button>
          <button onClick={() => onPromote(false)}>成らない</button>
        </div>
      )}
    </div>
  );
};