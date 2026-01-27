import { Position, TeamType } from '@/features/shogi/model/types';

/**
 * 王の位置を見つける
 * @function findKing
 * @param board 現在の盤面
 * @param turn 先手か後手か
 * @returns 王の位置、見つからなければ null
 */
export const findKing = (
  board: string[][],
  turn: TeamType
): Position | null => {
  const king = turn === TeamType.OUR ? 'k' : 'K';

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === king) {
        return { x, y };
      }
    }
  }
  return null;
};