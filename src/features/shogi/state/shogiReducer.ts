import { ShogiState, ShogiAction } from '@/features/shogi/state/shogiState';
import { promotable } from '@/hooks/shogi/pieces';
import { pieceMoves } from '@/hooks/shogi/moveRules';
import { capturePiece, copyBoard, inEnemyCamp, isSentePiece, nextTurn, resetSelection } from '@/utils/shogiHelpers';
/**
 * 将棋の状態を管理するリデューサー関数
 * @param state 現在の将棋の状態
 * @param action 実行するアクション
 * @return 更新後の将棋の状態
 */
export const shogiReducer = (state: ShogiState, action: ShogiAction): ShogiState => {
  switch (action.type) {
    case 'SELECT_CELL': {
      const piece = state.board[action.y][action.x];
      if (!piece) return state;

      const isSente = isSentePiece(piece);
      if ((state.turn === 'sente' && !isSente) || (state.turn === 'gote' && isSente)) {
        return state; // 相手の駒は選択不可
      }

      const moveFunc = pieceMoves[piece.toLowerCase()];
      if (!moveFunc) return state;

      return {
        ...state,
        selected: { x: action.x, y: action.y },
        legalMoves: moveFunc({ x: action.x, y: action.y }, state.board),
      };
    }

    case 'MOVE_PIECE': {
      if (!state.selected) return state;
      const { x, y } = action;

      if (!state.legalMoves.some(p => p.x === x && p.y === y)) {
        return resetSelection(state);
      }

      const board = copyBoard(state.board);
      const from = state.selected;
      const piece = board[from.y][from.x];
      const captured = board[y][x];
      let hands = { ...state.hands };

      hands = capturePiece(hands, captured);

      const canPromote =
        promotable[piece] &&
        (inEnemyCamp(from.y, piece) || inEnemyCamp(y, piece));

      if (canPromote) {
        return {
          ...state,
          pendingPromotion: { from, to: { x, y }, piece },
          selected: null,
          legalMoves: []
        };
      }

      board[y][x] = piece;
      board[from.y][from.x] = '';


      return {
        ...state,
        board,
        hands,
        selected: null,
        legalMoves: [],
        turn: nextTurn(state.turn)
      };
    }

    case 'PROMOTE': {
      if (!state.pendingPromotion) return state;
      const { from, to, piece } = state.pendingPromotion;

      const board = copyBoard(state.board);
      const captured = board[to.y][to.x]; // 取った駒（あれば）
      let hands = { ...state.hands };
      hands = capturePiece(hands, captured);

      board[to.y][to.x] = action.promote ? promotable[piece]! : piece;
      board[from.y][from.x] = '';

      return {
        ...state,
        board,
        hands,
        pendingPromotion: null,
        selected: null,
        legalMoves: [],
        turn: nextTurn(state.turn)
      };
    }

    case 'DROP_PIECE': {
      if (state.board[action.y][action.x] !== '') return state;
      if (!state.hands[action.piece]) return state;

      const board = copyBoard(state.board);
      board[action.y][action.x] = action.piece.toLowerCase();

      return {
        ...state,
        board,
        hands: {
          ...state.hands,
          [action.piece]: state.hands[action.piece] - 1,
        },
        selected: null,
        legalMoves: [],
        turn: nextTurn(state.turn)
      };
    }

    case 'CANCEL_SELECTION':
      return resetSelection(state);

    default:
      return state;
  }
};