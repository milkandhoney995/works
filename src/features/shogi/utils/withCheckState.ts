import { ShogiState } from '@/features/shogi/state/shogiState';
import { isKingInCheck } from '../check/isKingInCheck';
import { findKingPosition } from '../check/findKingPosition';

/**
 * 局面が確定したら、王手状態などを再評価する
 * @function withCheckState
 * @param state 現在の将棋の状態
 * @returns 王手情報を付与した将棋の状態
 */
export const withCheckState = (state: ShogiState): ShogiState => {
  const isSenteTurn = state.turn === 'sente';

  return {
    ...state,
    isInCheck: isKingInCheck(state.board, isSenteTurn),
    kingPosition: findKingPosition(state.board, state.turn),
  };
};