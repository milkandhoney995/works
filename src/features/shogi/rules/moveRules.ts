import { MoveFunc } from '@/features/shogi/state/types';
import { isSentePiece } from '@/features/shogi/logic/shogiHelpers';
import { stepMoves, rayMoves } from './moveGenerators';

/* ================= 王 ================= */
export const kingMoves: MoveFunc = ({ x, y }, board) => {
  const isSente = isSentePiece(board[y][x]);
  return stepMoves(x, y, board, isSente, [
    [-1, -1], [0, -1], [1, -1],
    [-1,  0],          [1,  0],
    [-1,  1], [0,  1], [1,  1],
  ]);
};

/* ================= 金 ================= */
export const goldMoves: MoveFunc = ({ x, y }, board) => {
  const isSente = isSentePiece(board[y][x]);
  const dir = isSente ? -1 : 1;

  return stepMoves(x, y, board, isSente, [
    [0, dir],
    [-1, 0], [1, 0],
    [0, -dir],
    [-1, dir], [1, dir],
  ]);
};

/* ================= 銀 ================= */
export const silverMoves: MoveFunc = ({ x, y }, board) => {
  const isSente = isSentePiece(board[y][x]);
  const dir = isSente ? -1 : 1;

  return stepMoves(x, y, board, isSente, [
    [0, dir],
    [-1, dir], [1, dir],
    [-1, -dir], [1, -dir],
  ]);
};

/* ================= 桂 ================= */
export const knightMoves: MoveFunc = ({ x, y }, board) => {
  const isSente = isSentePiece(board[y][x]);
  const dir = isSente ? -1 : 1;

  return stepMoves(x, y, board, isSente, [
    [-1, 2 * dir],
    [ 1, 2 * dir],
  ]);
};

/* ================= 香 ================= */
export const lanceMoves: MoveFunc = ({ x, y }, board) => {
  const isSente = isSentePiece(board[y][x]);
  const dir = isSente ? -1 : 1;

  return rayMoves(x, y, board, isSente, [[0, dir]]);
};

/* ================= 歩 ================= */
export const pawnMoves: MoveFunc = ({ x, y }, board) => {
  const isSente = isSentePiece(board[y][x]);
  const dir = isSente ? -1 : 1;

  return stepMoves(x, y, board, isSente, [[0, dir]]);
};

/* ================= 飛・角 ================= */
export const rookMoves: MoveFunc = ({ x, y }, board) =>
  rayMoves(x, y, board, isSentePiece(board[y][x]), [
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ]);

export const bishopMoves: MoveFunc = ({ x, y }, board) =>
  rayMoves(x, y, board, isSentePiece(board[y][x]), [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
  ]);

/* ================= 成り ================= */
export const bishopMovesWithKingLike: MoveFunc = (p, b) => [
  ...bishopMoves(p, b),
  ...kingMoves(p, b),
];

export const rookMovesWithKingLike: MoveFunc = (p, b) => [
  ...rookMoves(p, b),
  ...kingMoves(p, b),
];

export const promotedPawnMoves = goldMoves;
export const promotedSilverMoves = goldMoves;
export const promotedKnightMoves = goldMoves;
export const promotedLanceMoves = goldMoves;

/* ================= 駒マップ ================= */
export const pieceMoves: Record<string, MoveFunc> = {
  k: kingMoves, K: kingMoves,
  g: goldMoves, G: goldMoves,
  s: silverMoves, S: silverMoves,
  n: knightMoves, N: knightMoves,
  l: lanceMoves, L: lanceMoves,
  p: pawnMoves, P: pawnMoves,
  r: rookMoves, R: rookMoves,
  b: bishopMoves, B: bishopMoves,
  '+s': promotedSilverMoves,
  '+n': promotedKnightMoves,
  '+l': promotedLanceMoves,
  '+p': promotedPawnMoves,
  '+b': bishopMovesWithKingLike,
  '+r': rookMovesWithKingLike,
};