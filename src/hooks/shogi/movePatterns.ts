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

export const pieceMovePatterns: Record<string, PiecePatterns> = {
  k: { normal: [
    { deltaX: -1, deltaY: -1 }, { deltaX: 0, deltaY: -1 }, { deltaX: 1, deltaY: -1 },
    { deltaX: -1, deltaY: 0 },                     { deltaX: 1, deltaY: 0 },
    { deltaX: -1, deltaY: 1 }, { deltaX: 0, deltaY: 1 }, { deltaX: 1, deltaY: 1 },
  ]},
  g: { normal: [
    { deltaX: -1, deltaY: -1 }, { deltaX: 0, deltaY: -1 }, { deltaX: 1, deltaY: -1 },
    { deltaX: -1, deltaY: 0 },                      { deltaX: 1, deltaY: 0 },
    { deltaX: 0, deltaY: 1 },
  ]},
  s: { normal: [
    { deltaX: -1, deltaY: -1 }, { deltaX: 0, deltaY: -1 }, { deltaX: 1, deltaY: -1 },
    { deltaX: -1, deltaY: 1 },                     { deltaX: 1, deltaY: 1 },
  ], promoted: [
    // 成り後は金と同じ
    { deltaX: -1, deltaY: -1 }, { deltaX: 0, deltaY: -1 }, { deltaX: 1, deltaY: -1 },
    { deltaX: -1, deltaY: 0 },                      { deltaX: 1, deltaY: 0 },
    { deltaX: 0, deltaY: 1 },
  ]},
  n: { normal: [
    { deltaX: -1, deltaY: -2 }, { deltaX: 1, deltaY: -2 },
  ], promoted: [
    // 成り後は金と同じ
    { deltaX: -1, deltaY: -1 }, { deltaX: 0, deltaY: -1 }, { deltaX: 1, deltaY: -1 },
    { deltaX: -1, deltaY: 0 },                      { deltaX: 1, deltaY: 0 },
    { deltaX: 0, deltaY: 1 },
  ]},
  l: { normal: [
    { deltaX: 0, deltaY: -1, repeat: true },
  ], promoted: [
    // 成り後は金と同じ
    { deltaX: -1, deltaY: -1 }, { deltaX: 0, deltaY: -1 }, { deltaX: 1, deltaY: -1 },
    { deltaX: -1, deltaY: 0 },                      { deltaX: 1, deltaY: 0 },
    { deltaX: 0, deltaY: 1 },
  ]},
  p: { normal: [
    { deltaX: 0, deltaY: -1 },
  ], promoted: [
    // 成り後は金と同じ
    { deltaX: -1, deltaY: -1 }, { deltaX: 0, deltaY: -1 }, { deltaX: 1, deltaY: -1 },
    { deltaX: -1, deltaY: 0 },                      { deltaX: 1, deltaY: 0 },
    { deltaX: 0, deltaY: 1 },
  ]},
  r: { normal: [
    { deltaX: 0, deltaY: -1, repeat: true },
    { deltaX: 0, deltaY: 1, repeat: true },
    { deltaX: -1, deltaY: 0, repeat: true },
    { deltaX: 1, deltaY: 0, repeat: true },
  ], promoted: [
    // 成り後は飛 + 王
    { deltaX: 0, deltaY: -1, repeat: true },
    { deltaX: 0, deltaY: 1, repeat: true },
    { deltaX: -1, deltaY: 0, repeat: true },
    { deltaX: 1, deltaY: 0, repeat: true },
    { deltaX: -1, deltaY: -1 }, { deltaX: 0, deltaY: -1 }, { deltaX: 1, deltaY: -1 },
    { deltaX: -1, deltaY: 0 },                      { deltaX: 1, deltaY: 0 },
    { deltaX: -1, deltaY: 1 }, { deltaX: 0, deltaY: 1 }, { deltaX: 1, deltaY: 1 },
  ]},
  b: { normal: [
    { deltaX: -1, deltaY: -1, repeat: true },
    { deltaX: 1, deltaY: -1, repeat: true },
    { deltaX: -1, deltaY: 1, repeat: true },
    { deltaX: 1, deltaY: 1, repeat: true },
  ], promoted: [
    // 成り後は角 + 王
    { deltaX: -1, deltaY: -1, repeat: true },
    { deltaX: 1, deltaY: -1, repeat: true },
    { deltaX: -1, deltaY: 1, repeat: true },
    { deltaX: 1, deltaY: 1, repeat: true },
    { deltaX: -1, deltaY: -1 }, { deltaX: 0, deltaY: -1 }, { deltaX: 1, deltaY: -1 },
    { deltaX: -1, deltaY: 0 },                      { deltaX: 1, deltaY: 0 },
    { deltaX: -1, deltaY: 1 }, { deltaX: 0, deltaY: 1 }, { deltaX: 1, deltaY: 1 },
  ]},
};