import { ShogiState } from '@/features/shogi/state/shogiState';
import { check } from '../judge/check';
import { findKing } from '../judge/findKing';

/**
 * 局面が確定したら、王手状態などを再評価する
 * @function evaluateCheckState
 * @param state 現在の将棋の状態
 * @returns 王手情報を付与した将棋の状態
 */
export const evaluateCheckState = (state: ShogiState): ShogiState => {
  const isSenteTurn = state.turn === 'sente';

  return {
    ...state,
    isInCheck: check(state.board, isSenteTurn),
    kingPosition: findKing(state.board, state.turn),
  };
};