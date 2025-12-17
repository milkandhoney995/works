import { Position } from './types';
import { pieceMovePatterns, MovePattern } from "./movePatterns";
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
 * 駒の合法手を取得する
 * @param piece 駒の種類 ('p', 'P', '+r' など)
 * @param pos 現在位置
 * @param board 現在盤面
 * @param isUpper 上下プレイヤー
 * @returns 移動可能な Position 配列
 */
export const getLegalMovesWithDebug = (
  piece: string,
  pos: Position,
  board: string[][],
  isUpper: boolean
): Position[] => {
  const moves: Position[] = [];

  const normalizedPiece = piece.toLowerCase(); // 駒の種類を小文字に統一
  const patterns = pieceMovePatterns[normalizedPiece]?.normal;

  if (!patterns) return moves;

  for (const pattern of patterns) {
    // deltaX はそのまま、deltaY は後手なら反転
    const stepX = pattern.deltaX;
    const stepY = isUpper ? pattern.deltaY : -pattern.deltaY;

    let targetX = pos.x + stepX;
    let targetY = pos.y + stepY;

    while (targetX >= 0 && targetX < 9 && targetY >= 0 && targetY < 9) {
      const targetCell = board[targetY][targetX];

      // 敵駒判定
      const isEnemy = isUpper
        ? targetCell === targetCell.toLowerCase() && targetCell !== ""
        : targetCell === targetCell.toUpperCase() && targetCell !== "";

      if (!targetCell || isEnemy) {
        moves.push({ x: targetX, y: targetY });
      }

      // 連続移動できるかチェック
      if (!pattern.repeat || targetCell) break;

      targetX += stepX;
      targetY += stepY;
    }
  }

  return moves;
};