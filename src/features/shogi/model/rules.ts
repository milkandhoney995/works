import { Position, MoveResult } from '@/features/shogi/model/types';
import {
  capturePiece,
  copyBoard,
  inEnemyCamp,
  mustPromote,
  nextTurn,
} from '../utils/shogiHelpers';
import { ShogiState } from '../state/shogiState';
import { promotable } from './pieces';

/**
 * 駒を移動する
 * @function applyMoveWithRules
 * @param board 現在の盤面
 * @param hands 各プレイヤーの持ち駒
 * @param turn 現在の手番（先手か後手）
 * @param from 移動元の位置
 * @param to 移動先の位置
 * @returns 更新された将棋の状態
 */
export const applyMoveWithRules = (
  board: string[][],
  hands: Record<string, number>,
  turn: 'sente' | 'gote',
  from: Position,
  to: Position
): MoveResult => {
  const piece = board[from.y][from.x];
  const captured = board[to.y][to.x];

  const canPromote =
    promotable[piece] &&
    (inEnemyCamp(from.y, piece) || inEnemyCamp(to.y, piece));

  if (canPromote && mustPromote(piece, to.y)) {
    const nextBoard = copyBoard(board);
    nextBoard[to.y][to.x] = promotable[piece]!;
    nextBoard[from.y][from.x] = '';

    return {
      type: 'moved',
      board: nextBoard,
      hands: capturePiece(hands, captured),
      turn: nextTurn(turn),
    };
  }

  if (canPromote) {
    return {
      type: 'promotionRequired',
      from,
      to,
      piece,
    };
  }

  const nextBoard = copyBoard(board);
  nextBoard[to.y][to.x] = piece;
  nextBoard[from.y][from.x] = '';

  return {
    type: 'moved',
    board: nextBoard,
    hands: capturePiece(hands, captured),
    turn: nextTurn(turn),
  };
};

/**
 * 駒を成る・成らないを確定する
 * @function finalizePromotion
 * @param board 現在の盤面
 * @param hands 各プレイヤーの持ち駒
 * @param turn 現在の手番（先手か後手）
 * @param from 移動元の位置
 * @param to 移動先の位置
 * @param piece 駒の種類
 * @param promote 成るかどうか
 * @returns 更新された将棋の状態
 */
export const finalizePromotion = (
  board: string[][],
  hands: Record<string, number>,
  turn: 'sente' | 'gote',
  from: Position,
  to: Position,
  piece: string,
  promote: boolean
) => {
  const nextBoard = copyBoard(board);
  const captured = nextBoard[to.y][to.x];

  nextBoard[to.y][to.x] = promote ? promotable[piece]! : piece;
  nextBoard[from.y][from.x] = '';

  return {
    board: nextBoard,
    hands: capturePiece(hands, captured),
    turn: nextTurn(turn),
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