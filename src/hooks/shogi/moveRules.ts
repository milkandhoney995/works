import { MoveFunc, Position } from './types';
import { isSentePiece, isEnemyPiece, isInsideBoard } from './helpers';

/* ================= 共通 ================= */
/**
 * 駒の合法手を取得するヘルパー関数
 * @param moves 合法手の配列（引数で渡された配列に追加される）
 * @param board 現在盤面
 * @param x 列番号
 * @param y 行番号
 * @param isSente 先手か後手か
 * @returns 合法手の配列
 */

const pushIfValid = (
  moves: Position[],
  board: string[][],
  x: number,
  y: number,
  isSente: boolean
) => {
  if (!isInsideBoard(x, y)) return;
  const target = board[y][x];
  if (target === '' || isEnemyPiece(target, isSente)) {
    moves.push({ x, y });
  }
};

/* ================= 王 ================= */
export const kingMoves: MoveFunc = ({ x, y }, board) => {
  const moves: Position[] = [];
  const isSente = isSentePiece(board[y][x]);

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      pushIfValid(moves, board, x + dx, y + dy, isSente);
    }
  }
  return moves;
};

/* ================= 金 ================= */
export const goldMoves: MoveFunc = ({ x, y }, board) => {
  const moves: Position[] = [];
  const isSente = isSentePiece(board[y][x]);
  const dir = isSente ? -1 : 1;

  [
    [0, dir], [-1, 0], [1, 0],
    [0, -dir], [-1, dir], [1, dir],
  ].forEach(([dx, dy]) =>
    pushIfValid(moves, board, x + dx, y + dy, isSente)
  );

  return moves;
};

/* ================= 銀 ================= */
export const silverMoves: MoveFunc = ({ x, y }, board) => {
  const moves: Position[] = [];
  const isSente = isSentePiece(board[y][x]);
  const dir = isSente ? -1 : 1;

  [
    [0, dir], [-1, dir], [1, dir],
    [-1, -dir], [1, -dir],
  ].forEach(([dx, dy]) =>
    pushIfValid(moves, board, x + dx, y + dy, isSente)
  );

  return moves;
};

/* ================= 桂 ================= */
export const knightMoves: MoveFunc = ({ x, y }, board) => {
  const moves: Position[] = [];
  const isSente = isSentePiece(board[y][x]);
  const dir = isSente ? -1 : 1;

  [
    [-1, 2 * dir],
    [1, 2 * dir],
  ].forEach(([dx, dy]) =>
    pushIfValid(moves, board, x + dx, y + dy, isSente)
  );

  return moves;
};

/* ================= 香 ================= */
export const lanceMoves: MoveFunc = ({ x, y }, board) => {
  const moves: Position[] = [];
  const isSente = isSentePiece(board[y][x]);
  const dir = isSente ? -1 : 1;

  for (let ny = y + dir; isInsideBoard(x, ny); ny += dir) {
    const target = board[ny][x];
    if (target === '') moves.push({ x, y: ny });
    else {
      if (isEnemyPiece(target, isSente)) moves.push({ x, y: ny });
      break;
    }
  }
  return moves;
};

/* ================= 歩 ================= */
export const pawnMoves: MoveFunc = ({ x, y }, board) => {
  const moves: Position[] = [];
  const isSente = isSentePiece(board[y][x]);
  const ny = y + (isSente ? -1 : 1);

  if (isInsideBoard(x, ny)) {
    const target = board[ny][x];
    if (target === '' || isEnemyPiece(target, isSente)) {
      moves.push({ x, y: ny });
    }
  }
  return moves;
};

/* ================= 飛 ================= */
export const rookMoves: MoveFunc = ({ x, y }, board) => {
  const moves: Position[] = [];
  const isSente = isSentePiece(board[y][x]);

  [
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ].forEach(([dx, dy]) => {
    let nx = x + dx;
    let ny = y + dy;
    while (isInsideBoard(nx, ny)) {
      const target = board[ny][nx];
      if (target === '') moves.push({ x: nx, y: ny });
      else {
        if (isEnemyPiece(target, isSente)) moves.push({ x: nx, y: ny });
        break;
      }
      nx += dx;
      ny += dy;
    }
  });

  return moves;
};

/* ================= 角 ================= */
export const bishopMoves: MoveFunc = ({ x, y }, board) => {
  const moves: Position[] = [];
  const isSente = isSentePiece(board[y][x]);

  [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
  ].forEach(([dx, dy]) => {
    let nx = x + dx;
    let ny = y + dy;
    while (isInsideBoard(nx, ny)) {
      const target = board[ny][nx];
      if (target === '') moves.push({ x: nx, y: ny });
      else {
        if (isEnemyPiece(target, isSente)) moves.push({ x: nx, y: ny });
        break;
      }
      nx += dx;
      ny += dy;
    }
  });

  return moves;
};

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