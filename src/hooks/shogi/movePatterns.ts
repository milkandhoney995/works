/**
 * 駒ごとの移動パターン一覧
 *
 * 移動パターンは相対座標 (deltaX, deltaY) で表現
 * - repeat: true なら連続移動可能（飛車・角・香）
 * - promoted: 成り駒のパターン
 */

export type MovePattern = {
  deltaX: number;
  deltaY: number;
  repeat?: boolean;
};

export type PiecePatterns = {
  normal: MovePattern[];
  promoted?: MovePattern[];
};