import { Position } from './types';
import { pieceMoves } from './moveRules';

/**
 * 指定マスの合法手を取得する
 */
export const getLegalMoves = (board: string[][], x: number, y: number): Position[] => {
  const piece = board[y][x]; // 移動元の駒
  if (!piece) return [];

  const isUpper = piece === piece.toUpperCase();
  const moveFn = pieceMoves[piece];

  return moveFn ? moveFn({ x, y }, board, isUpper) : [];
};

/**
 * 敵陣内かどうかを判定するヘルパー関数
 * isUpper: 自分が先手か後手か
 */
export const inEnemyCamp = (y: number, isUpper: boolean): boolean => {
  return isUpper ? y <= 2 : y >= 6;
};