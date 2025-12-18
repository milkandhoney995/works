import { Position } from './types';
import { pieceMovePatterns } from "./movePatterns";

/**
 * 駒が先手かどうか
 */
export const isSentePiece = (piece: string): boolean =>
  piece !== '' && piece === piece.toLowerCase();

/**
 * 敵陣内かどうかを判定するヘルパー関数
 * @param y 行番号
 * @param isSente 先手か後手か
 * 先手の敵陣：y = 0〜2
 * 後手の敵陣：y = 6〜8
 */
export const inEnemyCamp = (y: number, piece: string): boolean => {
  const isSente = isSentePiece(piece);
  return isSente ? y <= 2 : y >= 6;
};

/**
 * 駒の合法手を取得するヘルパー関数
 * @param piece 駒の種類 ('p', 'P', '+r' など)
 * @param pos 現在位置
 * @param board 現在盤面
 * @returns 合法手の配列（移動可能な Position 配列）
 */
export const getLegalMoves = (
  piece: string,
  pos: Position,
  board: string[][]
): Position[] => {
  const moves: Position[] = [];
  if (!piece) return moves;

  const isSente = isSentePiece(piece);
  const normalizedPiece = piece.toLowerCase();
  const patterns = pieceMovePatterns[normalizedPiece]?.normal;

  if (!patterns) return moves;

  for (const pattern of patterns) {
    const stepX = pattern.deltaX;
    const stepY = isSente ? pattern.deltaY : -pattern.deltaY;

    let targetX = pos.x + stepX;
    let targetY = pos.y + stepY;

    while (targetX >= 0 && targetX < 9 && targetY >= 0 && targetY < 9) {
      const target = board[targetY][targetX];

      const isEnemy =
        target !== '' &&
        (isSente
          ? target === target.toUpperCase()
          : target === target.toLowerCase());

      if (target === '' || isEnemy) {
        moves.push({ x: targetX, y: targetY });
      }

      // 連続移動できるかチェック
      if (!pattern.repeat || target !== '') break;

      targetX += stepX;
      targetY += stepY;
    }
  }

  return moves;
};