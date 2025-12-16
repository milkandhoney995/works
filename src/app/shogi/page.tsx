'use client';

import { useCallback } from 'react';
import { useShogi } from '@/hooks/shogi/useShogi';
import { ShogiBoard, ShogiHands } from '@/components/shogi';
import classes from './page.module.scss';

const ShogiPage = () => {
  const { board, selected, legalMoves, hands, handleCellClick, dropPiece } = useShogi();
  const handleHandSelect = useCallback(
    (piece: string) => {
      if (!selected) return;
      dropPiece(piece, selected.x, selected.y);
    },
    [dropPiece, selected]
  );

  return (
    <div className={classes.shogi}>
      <h1 className={classes.shogi__title}>Shogi App</h1>
      <ShogiBoard
        board={board}
        selected={selected}
        legalMoves={legalMoves}
        onCellClick={handleCellClick}
      />
      <ShogiHands hands={hands} onSelect={handleHandSelect} />
    </div>
  );
}

export default ShogiPage;