import { ShogiState, ShogiAction } from '@/features/shogi/state/shogiState';
import { isSentePiece } from '@/features/shogi/logic/shogiHelpers';
import { getLegalMoves } from '@/features/shogi/logic/getLegalMoves';
import { withCheckState } from '@/features/shogi/logic/withCheckState';
import {
  finalizePromotion,
  tryDropPiece,
  tryMovePiece,
  resetSelection,
} from '../logic/shogiRules';

/**
 * 将棋の状態を管理するリデューサー関数
 * @param state 現在の将棋の状態
 * @param action 実行するアクション
 * @return 更新後の将棋の状態
 */
export const shogiReducer = (
  state: ShogiState,
  action: ShogiAction
): ShogiState => {
  switch (action.type) {
    case 'SELECT_CELL': {
      const piece = state.board[action.y][action.x];
      if (!piece) return state;

      // 手番チェック
      const isSente = isSentePiece(piece);
      if (
        (state.turn === 'sente' && !isSente) ||
        (state.turn === 'gote' && isSente)
      ) {
        return state;
      }

      const selected = { x: action.x, y: action.y };

      return {
        ...state,
        selected,
        legalMoves: getLegalMoves(selected, state.board),
      };
    }

    case 'MOVE_PIECE': {
      const next = tryMovePiece(state, { x: action.x, y: action.y });
      return withCheckState(next);
    }

    case 'PROMOTE':
      const next = finalizePromotion(state, action.promote);
      return withCheckState(next);

    case 'DROP_PIECE': {
      const next = tryDropPiece(state, action.piece, { x: action.x, y: action.y });
      return withCheckState(next);
    }

    case 'CANCEL_SELECTION':
      return resetSelection(state);

    default:
      return state;
  }
};