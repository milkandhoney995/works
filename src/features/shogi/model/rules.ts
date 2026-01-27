import { Position, MoveResult } from './types';
import { copyBoard } from './board';
import { capturePiece, promotable } from './pieces';
import { inEnemyCamp } from './helpers/camp';
import { nextTurn } from './helpers/turn';
import { mustPromote } from './helpers/promotion';

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
 * @function dropPieceWithRules
 * @param board 現在の盤面
 * @param hands 各プレイヤーの持ち駒
 * @param turn 現在の手番（先手か後手）
 * @param piece 打つ駒
 * @param pos 打つ位置
 * @returns 更新された将棋の状態
 */
export const dropPieceWithRules = (
  board: string[][],
  hands: Record<string, number>,
  turn: 'sente' | 'gote',
  piece: string,
  pos: Position
) => {
  const nextBoard = copyBoard(board);
  nextBoard[pos.y][pos.x] = piece.toLowerCase();

  return {
    board: nextBoard,
    hands: {
      ...hands,
      [piece]: hands[piece] - 1,
    },
    turn: nextTurn(turn),
  };
};