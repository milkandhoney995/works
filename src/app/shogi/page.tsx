'use client';

import classes from './page.module.scss';
import { ShogiBoardWithPromotion } from './_components/ShogiBoardWithPromotion';
import { useShogi } from './_hooks/useShogi';

const ShogiPage = () => {
  const {
    board,
    selected,
    selectedHandPiece,
    legalMoves,
    hands,
    pendingPromotion,
    isInCheck,
    kingPosition,
    handleCellClick,
    promotePiece,
    onHandSelect,
  } = useShogi();

  return (
    <div className={classes.shogi}>
      <h1 className={classes.shogi__title}>Shogi App</h1>
      <ShogiBoardWithPromotion
        board={board}
        selected={selected}
        selectedHandPiece={selectedHandPiece}
        legalMoves={legalMoves}
        hands={hands}
        pendingPromotion={pendingPromotion}
        isInCheck={isInCheck}
        kingPosition={kingPosition}
        onCellClick={handleCellClick}
        onHandSelect={onHandSelect}
        onPromote={promotePiece}
      />
    </div>
  );
}

export default ShogiPage;