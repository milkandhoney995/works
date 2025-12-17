'use client';

import { useCallback, useReducer } from 'react';
import { shogiReducer } from './shogiReducer';
import { UseShogiReturn } from './types';
import { initialShogiState } from './shogiState';

export function useShogi(): UseShogiReturn {
  const [state, dispatch] = useReducer(shogiReducer, initialShogiState);

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      // 成り選択中はセル操作無効
      if (state.pendingPromotion) return;

      if (state.selected) {
        dispatch({ type: 'MOVE_PIECE', x, y });
      } else if (state.board[y][x] !== '') {
        dispatch({ type: 'SELECT_CELL', x, y });
      }
    },
    [state.selected, state.board, state.pendingPromotion]
  );

  const dropPiece = useCallback(
    (piece: string, x: number, y: number) => {
      // 成り選択中は駒打ち無効
      if (state.pendingPromotion) return;

      dispatch({ type: 'DROP_PIECE', piece, x, y });
    },
    [state.pendingPromotion]
  );

  const promotePiece = useCallback(
    (promote: boolean) => {
      if (!state.pendingPromotion) return;
      dispatch({ type: 'PROMOTE', promote });
    },
    [state.pendingPromotion]
  );

  return {
    board: state.board,
    selected: state.selected,
    legalMoves: state.legalMoves,
    hands: state.hands,
    pendingPromotion: state.pendingPromotion,
    handleCellClick,
    dropPiece,
    promotePiece,
  };
}