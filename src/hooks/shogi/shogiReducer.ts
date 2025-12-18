import { ShogiState, ShogiAction } from './shogiState';
import { promotable, unpromote } from './pieces';
import { pieceMoves } from './moveRules';
import { inEnemyCamp, isSentePiece } from './helpers';

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
        return { ...state, selected: null, legalMoves: [] };
      }

      const board = state.board.map(r => [...r]);
      const from = state.selected;
      const piece = board[from.y][from.x];
      const captured = board[y][x];
      const hands = { ...state.hands };

      if (captured) {
        // 成駒の場合は元の駒に戻す
        const basePiece = unpromote[captured] || captured;
        // 持ち駒は自分の駒として加える
        const handPiece = isSentePiece(piece) ? basePiece.toLowerCase() : basePiece.toUpperCase();
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
          legalMoves: []
        };
      }

      board[y][x] = piece;
      board[from.y][from.x] = '';

      // 手番切替
      const nextTurn = state.turn === 'sente' ? 'gote' : 'sente';

      return {
        ...state,
        board,
        hands,
        selected: null,
        legalMoves: [],
        turn: nextTurn
      };
    }

    case 'PROMOTE': {
      if (!state.pendingPromotion) return state;
      const { from, to, piece } = state.pendingPromotion;

      const board = state.board.map(r => [...r]);
      board[to.y][to.x] = action.promote ? promotable[piece]! : piece;
      board[from.y][from.x] = '';

      const nextTurn = state.turn === 'sente' ? 'gote' : 'sente';

      return {
        ...state,
        board,
        pendingPromotion: null,
        selected: null,
        legalMoves: [],
        turn: nextTurn
      };
    }

    case 'DROP_PIECE': {
      if (state.board[action.y][action.x] !== '') return state;
      if (!state.hands[action.piece]) return state;

      const board = state.board.map(r => [...r]);
      board[action.y][action.x] = action.piece.toLowerCase();

      const nextTurn = state.turn === 'sente' ? 'gote' : 'sente';

      return {
        ...state,
        board,
        hands: {
          ...state.hands,
          [action.piece]: state.hands[action.piece] - 1,
        },
        selected: null,
        legalMoves: [],
        turn: nextTurn
      };
    }

    case 'CANCEL_SELECTION':
      return { ...state, selected: null, legalMoves: [] };

    default:
      return state;
  }
};