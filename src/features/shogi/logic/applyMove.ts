import { Position } from '@/features/shogi/state/types';
import { copyBoard } from './shogiHelpers';

interface Move {
  from: Position;
  to: Position;
  piece: string;
}

/**
 * 盤面に移動を適用する
 * @function applyMove
 * @param board 現在の盤面
 * @param move 移動情報
 * @returns 移動後の盤面
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