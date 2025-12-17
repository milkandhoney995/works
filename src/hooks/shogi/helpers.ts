import { Position } from './types';
import { pieceMoves } from './moveRules';

/**
 * 指定マスの合法手を取得する
 * board[y][x] の駒を対象に、移動可能なマスを返す
 */
export const getLegalMoves = (board: string[][], x: number, y: number): Position[] => {
  const piece = board[y][x]; // 移動元の駒
  if (!piece) return [];

  const isUpper = piece === piece.toUpperCase();
  const moveFn = pieceMoves[piece];

  // moveRules.ts の関数を呼び出して合法手を取得
  return moveFn ? moveFn({ x, y }, board, isUpper) : [];
};

/**
 * 敵陣内かどうかを判定するヘルパー関数
 * @param y 行番号
 * @param isUpper 先手か後手か
 */
export const inEnemyCamp = (y: number, isUpper: boolean): boolean => {
  return isUpper ? y <= 2 : y >= 6;
};

/**
 * デバッグ用：盤面上の合法手を取得しやすくするラッパー
 * deltaX / deltaY / targetX / targetY で直感的に計算
 */
export const getLegalMovesWithDebug = (board: string[][], x: number, y: number): Position[] => {
  const piece = board[y][x];
  if (!piece) return [];

  const isUpper = piece === piece.toUpperCase();
  const moveFn = pieceMoves[piece];
  if (!moveFn) return [];

  const moves: Position[] = [];
  const possiblePositions = moveFn({ x, y }, board, isUpper);

  for (const pos of possiblePositions) {
    const targetX = pos.x;
    const targetY = pos.y;
    const targetCell = board[targetY][targetX];
    const isEnemy = isUpper
      ? targetCell === targetCell.toLowerCase() && targetCell !== ''
      : targetCell === targetCell.toUpperCase() && targetCell !== '';

    if (!targetCell || isEnemy) {
      moves.push({ x: targetX, y: targetY });
    }
  }

  return moves;
};