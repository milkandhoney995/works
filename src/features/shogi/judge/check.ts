import { Position } from '@/features/shogi/model/types';
import { isSentePiece } from '../utils/shogiHelpers';
import { pieceMoves } from '../move/rules';

const findKing = (board: string[][], isSente: boolean): Position | null => {
  const king = isSente ? 'k' : 'K';

  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (board[y][x] === king) return { x, y };
    }
  }
  return null;
};

/**
 * 王が王手されているかを判定する
 * @function check
 * @param board 現在の盤面
 * @param isSente 先手かどうか
 * @returns 王手されている場合は true、それ以外は false
 */
export const check = (
  board: string[][],
  isSente: boolean
): boolean => {
  const kingPos = findKing(board, isSente);
  if (!kingPos) return false;

  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      const piece = board[y][x];
      if (!piece) continue;

      // 相手の駒だけ見る
      if (isSentePiece(piece) === isSente) continue;

      const moves = pieceMoves[piece.toLowerCase()]?.({ x, y }, board) ?? [];
      if (moves.some(m => m.x === kingPos.x && m.y === kingPos.y)) {
        return true;
      }
    }
  }
  return false;
};