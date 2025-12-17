import { ShogiState, ShogiAction } from './shogiState';
import { Position } from './types';
import { promotable } from './pieces';
import { getLegalMoves, inEnemyCamp } from './helpers'; // helpers.ts からインポート

export const shogiReducer = (state: ShogiState, action: ShogiAction): ShogiState => {
  switch (action.type) {
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

    case 'MOVE_PIECE': {
      if (!state.selected) return state;
      const { x, y } = action;
      const { selected, board } = state;

      // 合法手でない場合は選択解除
      if (!state.legalMoves.some(p => p.x === x && p.y === y)) {
        return { ...state, selected: null, legalMoves: [] };
      }

      const newBoard = board.map(row => [...row]);
      let movingPiece = newBoard[selected.y][selected.x];
      const capturedPiece = newBoard[y][x];
      const newHands = { ...state.hands };

      // 持ち駒に加える
      if (capturedPiece) {
        const handPiece = capturedPiece === capturedPiece.toUpperCase()
          ? capturedPiece.toLowerCase()
          : capturedPiece.toUpperCase();
        newHands[handPiece] = (newHands[handPiece] || 0) + 1;
      }

      const isUpper = movingPiece === movingPiece.toUpperCase();
      const canPromote =
        promotable[movingPiece] &&
        (inEnemyCamp(selected.y, isUpper) || inEnemyCamp(y, isUpper));

      if (canPromote) {
        return {
          ...state,
          board: newBoard,
          hands: newHands,
          pendingPromotion: { from: { ...selected }, to: { x, y }, piece: movingPiece },
          selected: null,
          legalMoves: [],
        };
      }

      newBoard[y][x] = movingPiece;
      newBoard[selected.y][selected.x] = '';

      return { ...state, board: newBoard, hands: newHands, selected: null, legalMoves: [], pendingPromotion: null };
    }

    case 'DROP_PIECE': {
      const { piece, x, y } = action;
      if (state.board[y][x] !== '' || !state.hands[piece]) return state;

      const newBoard = state.board.map(row => [...row]);
      newBoard[y][x] = piece.toLowerCase();

      return {
        ...state,
        board: newBoard,
        hands: { ...state.hands, [piece]: state.hands[piece] - 1 },
        selected: null,
        legalMoves: [],
      };
    }

    case 'CANCEL_SELECTION':
      return { ...state, selected: null, legalMoves: [] };

    case 'PROMOTE': {
      if (!state.pendingPromotion) return state;
      const { from, to, piece } = state.pendingPromotion;
      const newBoard = state.board.map(row => [...row]);
      newBoard[to.y][to.x] = action.promote ? promotable[piece]! : piece;
      newBoard[from.y][from.x] = '';
      return { ...state, board: newBoard, pendingPromotion: null };
    }

    default:
      return state;
  }
};