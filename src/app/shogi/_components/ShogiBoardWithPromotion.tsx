import classes from '@/app/shogi/page.module.scss';
import Board from './Board';
import Hand from './Hands';
import { HandsByPlayer, PendingPromotion, Position } from '@/features/shogi';

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
      <Hand
        hands={hands.gote}
        selectedHandPiece={selectedHandPiece}
        onSelect={onHandSelect}
        className={classes.shogi__handsGote}
      />

      {/* 将棋盤 */}
      <Board
        board={board}
        selected={selected}
        legalMoves={legalMoves}
        isInCheck={isInCheck}
        kingPosition={kingPosition}
        onCellClick={onCellClick}
      />

      {/* 持ち駒（先手） */}
      <Hand
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