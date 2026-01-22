import { ShogiBoard } from './ShogiBoard';
import { ShogiHands } from './ShogiHands';
import { PendingPromotion, Position, HandsByPlayer } from '@/features/shogi/state/types';
import classes from '@/app/shogi/page.module.scss';

interface Props {
  board: string[][];
  selected: Position | null;
  selectedHandPiece: string | null;
  legalMoves: Position[];
  hands: HandsByPlayer;
  pendingPromotion: PendingPromotion;
  isInCheck: boolean;
  kingPosition: Position | null;
  onCellClick: (x: number, y: number) => void;
  onHandSelect: (piece: string) => void;
  onPromote: (promote: boolean) => void;
}

export const ShogiBoardWithPromotion = ({
  board,
  selected,
  selectedHandPiece,
  legalMoves,
  hands,
  pendingPromotion,
  isInCheck,
  kingPosition,
  onCellClick,
  onHandSelect,
  onPromote,
}: Props) => {
  return (
    <div className={classes.shogi__container}>
      { isInCheck && (
        <div className={classes.shogi__checkAlert}>
          王手！
        </div>
      )}
      {/* 持ち駒（後手） */}
      <ShogiHands
        hands={hands.gote}
        selectedHandPiece={selectedHandPiece}
        onSelect={onHandSelect}
        className={classes.shogi__handsGote}
      />

      {/* 将棋盤 */}
      <ShogiBoard
        board={board}
        selected={selected}
        legalMoves={legalMoves}
        isInCheck={isInCheck}
        kingPosition={kingPosition}
        onCellClick={onCellClick}
      />

      {/* 持ち駒（先手） */}
      <ShogiHands
        hands={hands.sente}
        selectedHandPiece={selectedHandPiece}
        onSelect={onHandSelect}
        className={classes.shogi__handsSente}
      />

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