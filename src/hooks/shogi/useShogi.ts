import { useReducer, useState } from 'react';
import { shogiReducer } from './shogiReducer';
import { initialShogiState, ShogiState, ShogiAction } from './shogiState';
import { Position, UseShogiReturn } from './types';

/**
 * 将棋用カスタムフック
 */
export const useShogi = (): UseShogiReturn => {
  const [state, dispatch] = useReducer(shogiReducer, initialShogiState);

  // 持ち駒選択用の一時 state
  const [selectedHand, setSelectedHand] = useState<string | null>(null);

  /** 盤面セルクリック時の処理 */
  const handleCellClick = (x: number, y: number) => {
    if (state.pendingPromotion) return; // 成り選択中は盤面クリック無効

    if (selectedHand) {
      // 持ち駒を打つ
      dispatch({ type: 'DROP_PIECE', piece: selectedHand, x, y });
      setSelectedHand(null);
      return;
    }

    if (state.selected) {
      // 駒を移動
      dispatch({ type: 'MOVE_PIECE', x, y });
    } else {
      // 駒を選択
      dispatch({ type: 'SELECT_CELL', x, y });
    }
  };

  /** 持ち駒選択時 */
  const onHandSelect = (piece: string) => {
    setSelectedHand(piece);
  };

  /** 成り選択 */
  const promotePiece = (promote: boolean) => {
    dispatch({ type: 'PROMOTE', promote });
  };

  return {
    board: state.board,
    selected: state.selected,
    legalMoves: state.legalMoves,
    hands: state.hands,
    pendingPromotion: state.pendingPromotion,
    handleCellClick,
    promotePiece,
    dropPiece: (piece: string, x: number, y: number) => {
      dispatch({ type: 'DROP_PIECE', piece, x, y });
    },
    onHandSelect, // ← ここで追加
  };
};