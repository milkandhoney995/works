import { useReducer, useState } from 'react';
import { shogiReducer } from './shogiReducer';
import { initialShogiState } from './shogiState';
import { HandsByPlayer, UseShogiReturn } from './types';

/**
 * 将棋用カスタムフック
 */
export const useShogi = (): UseShogiReturn => {
  const [state, dispatch] = useReducer(shogiReducer, initialShogiState);

  // 持ち駒選択用の一時 state
  const [selectedHand, setSelectedHand] = useState<string | null>(null);

  /**
  * 盤面セルクリック時の処理
  * @param uiX クリックされたセルの列番号（UI座標系）
  * @param uiY クリックされたセルの行番号（UI座標系）
  * @returns void
  */
  const handleCellClick = (uiX: number, uiY: number) => {
    // board[y][x] に合わせて座標を設定
    const x = uiX;
    const y = uiY; // 0が上段、8が下段ならこのままでOK
    if (state.pendingPromotion) return; // 成り選択中は盤面クリック無効

    if (selectedHand) {
      // 持ち駒を打つ
      dispatch({ type: 'DROP_PIECE', piece: selectedHand, x, y });
      setSelectedHand(null);
      return;
    }

    if (state.selected) {
      console.log('Moving piece to:', x, y);
      // 駒を移動
      dispatch({ type: 'MOVE_PIECE', x, y });
    } else {
      // 駒を選択
      console.log('Cell clicked:', x, y);
      dispatch({ type: 'SELECT_CELL', x, y });
    }
  };

  /**
  * 持ち駒選択時の処理
  * @param piece 選択された持ち駒の種類
  * @returns void
  */
  const onHandSelect = (piece: string) => {
    setSelectedHand(piece);
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
  * 持ち駒の初期化
  */
  const hands: HandsByPlayer = {
    sente: {},
    gote: {}
  };

  Object.entries(state.hands).forEach(([piece, count]) => {
    if (piece === piece.toLowerCase()) {
      // 小文字は先手
      hands.sente[piece] = count;
    } else {
      // 大文字は後手
      hands.gote[piece] = count;
    }
  });

  return {
    board: state.board,
    selected: state.selected,
    legalMoves: state.legalMoves,
    hands,
    pendingPromotion: state.pendingPromotion,
    handleCellClick,
    promotePiece,
    dropPiece: (piece: string, x: number, y: number) => {
      dispatch({ type: 'DROP_PIECE', piece, x, y });
    },
    onHandSelect
  };
};