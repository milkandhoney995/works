import { Position } from '@/features/shogi/model/types';
import { copyBoard } from '../model/board';

interface Move {
  from: Position;
  to: Position;
  piece: string;
}

/**
 * 手を適用した盤面を作る
 * @function applyMove
 * @param board 現在の盤面
 * @param move 移動情報
 * @returns 適用後の盤面
 */
export const applyMove = (
  board: string[][],
  move: Move
): string[][] => {
  const next = copyBoard(board);

  next[move.from.y][move.from.x] = '';
  next[move.to.y][move.to.x] = move.piece;

  return next;
};