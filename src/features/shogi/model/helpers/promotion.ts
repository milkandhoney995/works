import { isSentePiece } from "./camp";

/**
 * 強制成が必要かを判定するヘルパー関数
 * #### 強制成りが必要なケース
 * - 歩・香：敵陣最終列(先手y=0、後手y=8)への移動
 * - 桂：敵陣最終列・その手前(先手y ≤ 1、後手y ≥ 7)への移動
 * @param piece 駒の種類
 * @param toY 移動先の行番号
 * @returns 強制成が必要なら true、そうでなければ false
 */
export const mustPromote = (
  piece: string,
  toY: number
): boolean => {
  const base = piece.startsWith('+') ? piece[1] : piece[0];
  const isSente = isSentePiece(piece);

  if (base.toLowerCase() === 'p' || base.toLowerCase() === 'l') {
    return isSente ? toY === 0 : toY === 8;
  }

  if (base.toLowerCase() === 'n') {
    return isSente ? toY <= 1 : toY >= 7;
  }

  return false;
};