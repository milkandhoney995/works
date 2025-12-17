import { ShogiState, ShogiAction } from './shogiState';
import { Position } from './types';
import { pieceMoves } from './moveRules';
import { promotable } from './pieces';
import { inEnemyCamp } from './helpers';

/* =======================
  Helpers
======================= */

const getLegalMoves = (
  board: string[][],
  x: number,
  y: number
): Position[] => {
  const piece = board[y][x]; // 移動元の駒
  if (!piece) return [];

  const isUpper = piece === piece.toUpperCase();
  const moveFn = pieceMoves[piece];

  return moveFn ? moveFn({ x, y }, board, isUpper) : [];
};

/* =======================
  Reducer
======================= */

export const shogiReducer = (
  state: ShogiState,
  action: ShogiAction
): ShogiState => {
  switch (action.type) {
    /* ---------- マス選択 ---------- */
    case 'SELECT_CELL': {
      const { x, y } = action;
      const piece = state.board[y][x];

      if (!piece) return state;

      return {
        ...state,
        selected: { x, y },
        legalMoves: getLegalMoves(state.board, x, y),
      };
    }
    /* ---------- 駒の移動 ---------- */
    case 'MOVE_PIECE': {
      if (!state.selected) return state;
      const { x, y } = action;
      const { selected, board } = state;

      // 合法手でなければキャンセル
      if (!state.legalMoves.some(p => p.x === x && p.y === y)) {
        return {
          ...state,
          selected: null,
          legalMoves: [],
        };
      }

      const newBoard = board.map(row => [...row]);
      let movingPiece = newBoard[selected.y][selected.x];
      const capturedPiece = newBoard[y][x];
      const newHands = { ...state.hands };

      // 持ち駒処理
      if (capturedPiece) {
        const handPiece =
          capturedPiece === capturedPiece.toUpperCase()
            ? capturedPiece.toLowerCase()
            : capturedPiece.toUpperCase();
        newHands[handPiece] = (newHands[handPiece] || 0) + 1;
      }

      // 成り判定
      const isUpper = movingPiece === movingPiece.toUpperCase();
      const canPromote =
        promotable[movingPiece] &&
        (inEnemyCamp(selected.y, isUpper) || inEnemyCamp(y, isUpper));

      if (canPromote) {
        // 成り選択待ち状態にする
        return {
          ...state,
          board: newBoard,
          hands: newHands,
          pendingPromotion: { from: { ...selected }, to: { x, y }, piece: movingPiece },
          selected: null,
          legalMoves: [],
        };
      }

      // 成らない場合はそのまま移動
      newBoard[y][x] = movingPiece;
      newBoard[selected.y][selected.x] = '';

      return {
        ...state,
        board: newBoard,
        hands: newHands,
        selected: null,
        legalMoves: [],
        pendingPromotion: null,
      };
    }

    /* ---------- 持ち駒を打つ ---------- */
    case 'DROP_PIECE': {
      const { piece, x, y } = action;

      // 空マスでない / 駒を持っていない
      if (state.board[y][x] !== '' || !state.hands[piece]) {
        return state;
      }

      const newBoard = state.board.map(row => [...row]);

      // 持ち駒は必ず自分の向き（小文字）で打つ
      newBoard[y][x] = piece.toLowerCase();

      return {
        ...state,
        board: newBoard,
        hands: {
          ...state.hands,
          [piece]: state.hands[piece] - 1,
        },
        selected: null,
        legalMoves: [],
      };
    }

    /* ---------- 選択解除 ---------- */
    case 'CANCEL_SELECTION':
      return {
        ...state,
        selected: null,
        legalMoves: [],
      };

    /* ---------- 成り選択（将来用） ---------- */
    case 'PROMOTE': {
      if (!state.pendingPromotion) return state;

      // 成り選択情報の取得
      const { from, to, piece } = state.pendingPromotion;
      const newBoard = state.board.map(row => [...row]);

      // 駒の成り処理
      if (action.promote) {
        newBoard[to.y][to.x] = promotable[piece]!;
      } else {
        newBoard[to.y][to.x] = piece;
      }

      // 元のマスは空にする
      newBoard[from.y][from.x] = '';

      return {
        ...state,
        board: newBoard,
        pendingPromotion: null,
      };
    }


    default:
      return state;
  }
};