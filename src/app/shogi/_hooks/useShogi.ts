import { useReducer, useMemo } from 'react';
import { initialShogiState, shogiReducer, isSentePiece, HandsByPlayer, UseShogiReturn } from '@/features/shogi';

/**
 * 将棋用カスタムフック
 */
export const useShogi = (): UseShogiReturn => {
  const [state, dispatch] = useReducer(shogiReducer, initialShogiState);

  /**
  * 盤面セルクリック時の処理
  * @param x クリックされたセルの列番号（UI座標系）
  * @param y クリックされたセルの行番号（UI座標系）
  * @returns void
  */
  const handleCellClick = (x: number, y: number) => {
    if (state.pendingPromotion) return;

    // 持ち駒選択中なら打ち駒
    if (state.selectedHandPiece) {
      dispatch({ type: 'DROP_PIECE', piece: state.selectedHandPiece, x, y });
      return;
    }

    // 駒選択 or 移動
    if (state.selected) {
      dispatch({ type: 'MOVE_PIECE', x, y });
    } else {
      dispatch({ type: 'SELECT_CELL', x, y });
    }
  };

  /**
  * 持ち駒選択時の処理
  * @param piece 選択された持ち駒の種類
  * @returns void
  */
  const onHandSelect = (piece: string) => {
    // 手番チェック
    if (
      (state.turn === 'sente' && !isSentePiece(piece)) ||
      (state.turn === 'gote' && isSentePiece(piece))
    ) {
      return;
    }

    dispatch({ type: 'SELECT_HAND_PIECE', piece });
  };

  /**
  * 駒の成り選択時の処理
  * @param promote 成るかどうかのフラグ
  * @returns void
  */
  const promotePiece = (promote: boolean) => {
    dispatch({ type: 'PROMOTE', promote });
  };

  /**
   * 表示用：先手・後手の持ち駒に分離
   */
  const hands: HandsByPlayer = useMemo(() => {
    const result: HandsByPlayer = { sente: {}, gote: {} };

    Object.entries(state.hands).forEach(([piece, count]) => {
      if (count <= 0) return;
      if (isSentePiece(piece)) result.sente[piece] = count;
      else result.gote[piece] = count;
    });

    return result;
  }, [state.hands]);

  return {
    board: state.board,
    selected: state.selected,
    selectedHandPiece: state.selectedHandPiece,
    legalMoves: state.legalMoves,
    hands,
    pendingPromotion: state.pendingPromotion,
    turn: state.turn,
    isInCheck: state.isInCheck,
    kingPosition: state.kingPosition,
    handleCellClick,
    promotePiece,
    dropPiece: (piece: string, x: number, y: number) => {
      dispatch({ type: 'DROP_PIECE', piece, x, y });
    },
    onHandSelect
  };
};