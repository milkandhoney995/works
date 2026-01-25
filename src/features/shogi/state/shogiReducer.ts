import { ShogiState, ShogiAction } from '@/features/shogi/state/shogiState';
import {
  isSentePiece,
  isInsideBoard,
  isIllegalDropPosition,
  isNifu,
} from '@/features/shogi/utils/shogiHelpers';
import { generateLegalMoves } from '@/features/shogi/move/generateLegalMoves';
import { withCheckState } from '@/features/shogi/utils/withCheckState';
import { isUchifuzume } from '@/features/shogi/check/isUchifuzume';
import {
  finalizePromotion,
  tryDropPiece,
  applyMoveWithRules,
  resetSelection,
} from '../domain/shogiRules';
import { Position } from '@/features/shogi/state/types';

/**
 * 王手中の合法 DROP マスを計算
 */
const getLegalDropMoves = (
  state: ShogiState,
  piece: string
): Position[] => {
  const moves: Position[] = [];
  const base = piece.toLowerCase();

  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (!isInsideBoard(x, y)) continue;
      if (state.board[y][x] !== '') continue;

      // 不成り駒の打ち位置制限（歩・香・桂）
      if (isIllegalDropPosition(piece, y)) continue;

      // 二歩チェック（歩のみ）
      if (base === 'p' && isNifu(state.board, x, piece)) continue;

      const dropped = tryDropPiece(state, piece, { x, y });
      const evaluated = withCheckState(dropped);

      // 王手が解消される打ちだけ許可
      if (!evaluated.isInCheck) {
        moves.push({ x, y });
      }
    }
  }

  return moves;
};

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

    /* ================= セル選択 ================= */
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
        selectedHandPiece: null,
        legalMoves: generateLegalMoves(selected, state.board),
      };
    }

    /* ================= 持ち駒選択 ================= */
    case 'SELECT_HAND_PIECE': {
      return {
        ...state,
        selected: null,
        selectedHandPiece: action.piece,
        legalMoves: getLegalDropMoves(state, action.piece),
      };
    }

    /* ================= 駒移動 ================= */
    case 'MOVE_PIECE': {
      const next = applyMoveWithRules(state, { x: action.x, y: action.y });
      return withCheckState({
        ...next,
        selected: null,
        selectedHandPiece: null,
      });
    }

    /* ================= 成り ================= */
    case 'PROMOTE': {
      const next = finalizePromotion(state, action.promote);
      return withCheckState({
        ...next,
        selected: null,
        selectedHandPiece: null,
      });
    }

    /* ================= 打ち駒 ================= */
    case 'DROP_PIECE': {
      const { piece, x, y } = action;
      const base = piece.toLowerCase();

      // 不成り駒の打ち位置制限
      if (isIllegalDropPosition(piece, y)) {
        return state;
      }

      // 二歩チェック（歩のみ）
      if (base === 'p' && isNifu(state.board, x, piece)) {
        return state;
      }

      const next = tryDropPiece(state, piece, { x, y });
      const evaluated = withCheckState(next);

      // 王手が解消されていなければ無効
      if (state.isInCheck && evaluated.isInCheck) {
        return state;
      }

      // 打歩詰めチェック
      if (base === 'p' && isUchifuzume(evaluated, piece)) {
        return state;
      }

      return {
        ...evaluated,
        selected: null,
        selectedHandPiece: null,
      };
    }

    /* ================= 選択解除 ================= */
    case 'CANCEL_SELECTION':
      return {
        ...resetSelection(state),
        selectedHandPiece: null,
      };

    default:
      return state;
  }
};