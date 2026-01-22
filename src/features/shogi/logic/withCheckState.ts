import { ShogiState } from '@/features/shogi/state/shogiState';
import { isKingInCheck } from './isKingInCheck';
import { findKingPosition } from './findKingPosition';
import { isSentePiece } from './shogiHelpers';

/**
 * 局面が確定したら、王手状態などを再評価する
 * @function withCheckState
 * @param state 現在の将棋の状態
 * @returns 王手情報を付与した将棋の状態
 */
export const withCheckState = (state: ShogiState): ShogiState => ({
  ...state,
  isInCheck: isKingInCheck(state.board, isSentePiece(state.turn)),
  kingPosition: findKingPosition(state.board, state.turn),
});