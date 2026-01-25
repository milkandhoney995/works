import { Position } from '@/features/shogi/state/types';
import {
  capturePiece,
  copyBoard,
  inEnemyCamp,
  mustPromote,
  nextTurn,
} from '../utils/shogiHelpers';
import { ShogiState } from '../state/shogiState';
import { promotable } from '../board/pieces';

/**
 * 駒を移動する
 * @function applyMoveWithRules
 * @param state 現在の将棋の状態
 * @param to 移動先の位置
 * @returns 更新された将棋の状態
 */
export const applyMoveWithRules = (
  state: ShogiState,
  to: Position
) => {
  const { selected, board } = state;
  if (!selected) return state;

  if (!state.legalMoves.some(p => p.x === to.x && p.y === to.y)) {
    return {
      ...state,
      selected: null,
      legalMoves: [],
    };
  }

  const from = selected;
  const piece = board[from.y][from.x];
  const captured = board[to.y][to.x];

  const canPromote =
    promotable[piece] &&
    (inEnemyCamp(from.y, piece) || inEnemyCamp(to.y, piece));

  if (canPromote) {

    if (mustPromote(piece, to.y)) {
      const nextBoard = copyBoard(board);
      nextBoard[to.y][to.x] = promotable[piece]!;
      nextBoard[from.y][from.x] = '';

      return {
        ...state,
        board: nextBoard,
        hands: capturePiece(state.hands, captured),
        selected: null,
        legalMoves: [],
        turn: nextTurn(state.turn),
      };
    }
    return {
      ...state,
      pendingPromotion: { from, to, piece },
      selected: null,
      legalMoves: [],
    };
  }

  const nextBoard = copyBoard(board);
  nextBoard[to.y][to.x] = piece;
  nextBoard[from.y][from.x] = '';

  return {
    ...state,
    board: nextBoard,
    hands: capturePiece(state.hands, captured),
    selected: null,
    legalMoves: [],
    turn: nextTurn(state.turn),
  };
};

/**
 * 駒を成る・成らないを確定する
 * @function finalizePromotion
 * @param state 現在の将棋の状態
 * @param promote 成るかどうか
 * @returns 更新された将棋の状態
 */
export const finalizePromotion = (state: ShogiState, promote: boolean) => {
  const { from, to, piece } = state.pendingPromotion!;
  const board = copyBoard(state.board);

  const captured = board[to.y][to.x];
  board[to.y][to.x] = promote ? promotable[piece]! : piece;
  board[from.y][from.x] = '';

  return {
    ...state,
    board,
    hands: capturePiece(state.hands, captured),
    pendingPromotion: null,
    turn: nextTurn(state.turn),
  };
};

/**
 * 駒を打つ
 * @function tryDropPiece
 * @param state 現在の将棋の状態
 * @param piece 打つ駒
 * @param pos 打つ位置
 * @returns 更新された将棋の状態
 */
export const tryDropPiece = (
  state: ShogiState,
  piece: string,
  pos: Position
) => {
  if (state.board[pos.y][pos.x] !== '') return state;
  if (!state.hands[piece]) return state;

  const board = copyBoard(state.board);
  board[pos.y][pos.x] = piece.toLowerCase();

  return {
    ...state,
    board,
    hands: {
      ...state.hands,
      [piece]: state.hands[piece] - 1,
    },
    turn: nextTurn(state.turn),
  };
};

/**
 * 選択解除処理
 * @function resetSelection
 * @param state 現在の状態
 * @returns 選択解除後の状態
 */
export const resetSelection = <T extends { selected: any; legalMoves: any[] }>(state: T) => ({
  ...state,
  selected: null,
  legalMoves: [],
});