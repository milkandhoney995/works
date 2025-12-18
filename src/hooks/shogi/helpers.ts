import { Position } from './types';
import { pieceMovePatterns } from "./movePatterns";

/**
 * 敵陣内かどうかを判定するヘルパー関数
 * @param y 行番号
 * @param isSente 先手か後手か
 */
export const inEnemyCamp = (y: number, isSente: boolean): boolean => {
  // 先手の敵陣は上、後手の敵陣は下
  return isSente ? y <= 2 : y >= 6;
};

/**
 * 駒の合法手を取得する
 * @param piece 駒の種類 ('p', 'P', '+r' など)
 * @param pos 現在位置
 * @param board 現在盤面
 * @param isUpper 上下プレイヤー
 * @returns 移動可能な Position 配列
 */
export const getLegalMoves = (
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
    const isSente = piece === piece.toLowerCase();
    // deltaX はそのまま、deltaY は後手なら反転
    const stepX = pattern.deltaX;
    const stepY = isSente ? pattern.deltaY : -pattern.deltaY;

    let targetX = pos.x + stepX;
    let targetY = pos.y + stepY;

    while (targetX >= 0 && targetX < 9 && targetY >= 0 && targetY < 9) {
      const targetCell = board[targetY][targetX];

      // 敵駒判定
      const isEnemy = targetCell !== '' &&
        (isSente
          ? targetCell === targetCell.toUpperCase()
          : targetCell === targetCell.toLowerCase());

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