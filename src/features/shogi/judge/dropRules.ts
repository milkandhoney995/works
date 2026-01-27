/**
 * 打ち駒位置の違法判定ヘルパー関数
 * #### 違法な打ち駒位置
 * - 歩・香：敵陣最終列(先手y=0、後手y=8)
 * - 桂：敵陣最終列・その手前(先手y ≤ 1、後手y ≥ 7)
 * @param piece 駒の種類
 * @param y 打ち駒位置の行番号
 * @returns 違法な位置なら true、そうでなければ false
 */
export const isIllegalDropPosition = (
  piece: string,
  y: number
): boolean => {
  const base = piece.toLowerCase();
  const isSente = piece === piece.toLowerCase();

  // 歩・香
  if (base === 'p' || base === 'l') {
    return isSente ? y === 0 : y === 8;
  }

  // 桂
  if (base === 'n') {
    return isSente ? y <= 1 : y >= 7;
  }

  return false;
};

/**
 * 二歩判定
 * - 同じ筋（x列）に自分の歩がある場合は二歩
 * - 成歩は対象外
 * @param board 現在の盤面
 * @param x 打つ筋
 * @param piece 打つ駒（p or P）
 */
export const isNifu = (
  board: string[][],
  x: number,
  piece: string
): boolean => {
  const isSente = piece === piece.toLowerCase();
  const pawn = isSente ? 'p' : 'P';

  for (let y = 0; y < 9; y++) {
    if (board[y][x] === pawn) {
      return true;
    }
  }
  return false;
};