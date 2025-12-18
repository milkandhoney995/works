import { ShogiState, ShogiAction } from './shogiState';
import { promotable } from './pieces';
import { pieceMoves } from './moveRules';
import { inEnemyCamp } from './helpers';

export const shogiReducer = (state: ShogiState, action: ShogiAction): ShogiState => {
  switch (action.type) {
    case 'SELECT_CELL': {
      const piece = state.board[action.y][action.x];
      if (!piece) return state;

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
        return { ...state, selected: null, legalMoves: [] };
      }

      const board = state.board.map(r => [...r]);
      const from = state.selected;
      const piece = board[from.y][from.x];
      const captured = board[y][x];

      const hands = { ...state.hands };
      if (captured) {
        const handPiece =
          captured === captured.toUpperCase()
            ? captured.toLowerCase()
            : captured.toUpperCase();
        hands[handPiece] = (hands[handPiece] || 0) + 1;
      }

      const canPromote =
        promotable[piece] &&
        (inEnemyCamp(from.y, piece) || inEnemyCamp(y, piece));

      if (canPromote) {
        return {
          ...state,
          pendingPromotion: { from, to: { x, y }, piece },
          selected: null,
          legalMoves: [],
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
      };
    }

    case 'PROMOTE': {
      if (!state.pendingPromotion) return state;
      const { from, to, piece } = state.pendingPromotion;

      const board = state.board.map(r => [...r]);
      board[to.y][to.x] = action.promote ? promotable[piece]! : piece;
      board[from.y][from.x] = '';

      return {
        ...state,
        board,
        pendingPromotion: null,
        selected: null,
        legalMoves: [],
      };
    }

    case 'DROP_PIECE': {
      if (state.board[action.y][action.x] !== '') return state;
      if (!state.hands[action.piece]) return state;

      const board = state.board.map(r => [...r]);
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
      };
    }

    case 'CANCEL_SELECTION':
      return { ...state, selected: null, legalMoves: [] };

    default:
      return state;
  }
};