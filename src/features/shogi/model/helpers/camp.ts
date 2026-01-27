/**
 * 駒が先手かどうか
 * @param piece 駒の種類
 * @returns 先手なら true、後手なら false
 */
export const isSentePiece = (piece: string): boolean => {
  if (piece === '') return false;
  const base = piece.startsWith('+') ? piece[1] : piece[0];
  return base === base.toLowerCase();
}

/**
 * 敵駒かどうかを判定するヘルパー関数
 * @param target 盤上の駒
 * @param isSente 先手か後手か
 */
export const isEnemyPiece = (target: string, isSente: boolean): boolean => {
  if (!target) return false;
  return isSente
    ? target === target.toUpperCase()
    : target === target.toLowerCase();
};

/**
 * 敵陣判定するヘルパー関数
 * @param y 行番号
 * @param isSente 先手か後手か
 * 先手の敵陣：y = 0〜2
 * 後手の敵陣：y = 6〜8
 */
export const inEnemyCamp = (y: number, piece: string): boolean => {
  const isSente = isSentePiece(piece);
  return isSente ? y <= 2 : y >= 6;
};