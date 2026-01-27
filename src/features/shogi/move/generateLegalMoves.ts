import { Position } from '@/features/shogi/model/types';
import { pieceMoves } from './moveRules';
import { applyMove } from './applyMove';
import { check } from '../judge/check';
import { isSentePiece } from '../utils/shogiHelpers';

/**
 * 自殺手を除外した合法手を取得する
 * @function generateLegalMoves
 * @param pos 現在の駒の位置
 * @param board 現在の盤面
 * @returns 合法手の配列
 */
export const generateLegalMoves = (
  pos: Position,
  board: string[][]
): Position[] => {
  const piece = board[pos.y][pos.x];
  if (!piece) return [];

  const isSente = isSentePiece(piece);

  // 擬似合法手
  const pseudoMoves = pieceMoves[piece]?.(pos, board) ?? [];

  // 自殺手を除外
  return pseudoMoves.filter(to => {
    const nextBoard = applyMove(board, {
      from: pos,
      to,
      piece,
    });

    return !check(nextBoard, isSente);
  });
};