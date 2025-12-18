import { MoveFunc, Position } from './types';

const isSentePiece = (piece: string) =>
  piece !== '' && piece === piece.toLowerCase();

/* ================= 王 ================= */
export const kingMoves: MoveFunc = ({ x, y }, board) => {
  const moves: Position[] = [];
  const piece = board[y][x];
  const isSente = isSentePiece(piece);

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= 9 || ny < 0 || ny >= 9) continue;

      const target = board[ny][nx];
      if (
        target === '' ||
        (isSente
          ? target === target.toUpperCase()
          : target === target.toLowerCase())
      ) {
        moves.push({ x: nx, y: ny });
      }
    }
  }
  return moves;
};

/* ================= 金 ================= */
export const goldMoves: MoveFunc = ({ x, y }, board) => {
  const moves: Position[] = [];
  const piece = board[y][x];
  const isSente = isSentePiece(piece);
  const dir = isSente ? -1 : 1;

  const pattern = [
    { dx: 0, dy: dir },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -dir },
    { dx: -1, dy: dir },
    { dx: 1, dy: dir },
  ];

  for (const { dx, dy } of pattern) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || nx >= 9 || ny < 0 || ny >= 9) continue;

    const target = board[ny][nx];
    if (
      target === '' ||
      (isSente
        ? target === target.toUpperCase()
        : target === target.toLowerCase())
    ) {
      moves.push({ x: nx, y: ny });
    }
  }
  return moves;
};

/* ================= 銀 ================= */
export const silverMoves: MoveFunc = ({ x, y }, board) => {
  const moves: Position[] = [];
  const piece = board[y][x];
  const isSente = isSentePiece(piece);
  const dir = isSente ? -1 : 1;

  const pattern = [
    { dx: 0, dy: dir },
    { dx: -1, dy: dir },
    { dx: 1, dy: dir },
    { dx: -1, dy: -dir },
    { dx: 1, dy: -dir },
  ];

  for (const { dx, dy } of pattern) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || nx >= 9 || ny < 0 || ny >= 9) continue;

    const target = board[ny][nx];
    if (
      target === '' ||
      (isSente
        ? target === target.toUpperCase()
        : target === target.toLowerCase())
    ) {
      moves.push({ x: nx, y: ny });
    }
  }
  return moves;
};

/* ================= 桂 ================= */
export const knightMoves: MoveFunc = ({ x, y }, board) => {
  const moves: Position[] = [];
  const piece = board[y][x];
  const isSente = isSentePiece(piece);
  const dir = isSente ? -1 : 1;

  const jumps = [
    { dx: -1, dy: 2 * dir },
    { dx: 1, dy: 2 * dir },
  ];

  for (const { dx, dy } of jumps) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || nx >= 9 || ny < 0 || ny >= 9) continue;

    const target = board[ny][nx];
    if (
      target === '' ||
      (isSente
        ? target === target.toUpperCase()
        : target === target.toLowerCase())
    ) {
      moves.push({ x: nx, y: ny });
    }
  }
  return moves;
};

/* ================= 香 ================= */
export const lanceMoves: MoveFunc = ({ x, y }, board) => {
  const moves: Position[] = [];
  const piece = board[y][x];
  const isSente = isSentePiece(piece);
  const dir = isSente ? -1 : 1;

  for (let ny = y + dir; ny >= 0 && ny < 9; ny += dir) {
    const target = board[ny][x];
    if (target === '') moves.push({ x, y: ny });
    else {
      if (
        isSente
          ? target === target.toUpperCase()
          : target === target.toLowerCase()
      ) {
        moves.push({ x, y: ny });
      }
      break;
    }
  }
  return moves;
};

/* ================= 歩 ================= */
export const pawnMoves: MoveFunc = ({ x, y }, board) => {
  const moves: Position[] = [];
  const piece = board[y][x];
  const isSente = isSentePiece(piece);
  const ny = y + (isSente ? -1 : 1);

  if (ny < 0 || ny >= 9) return moves;

  const target = board[ny][x];
  if (
    target === '' ||
    (isSente
      ? target === target.toUpperCase()
      : target === target.toLowerCase())
  ) {
    moves.push({ x, y: ny });
  }
  return moves;
};

/* ================= 飛・角・成り ================= */
export const rookMoves: MoveFunc = (pos, board) => {
  const moves: Position[] = [];
  const piece = board[pos.y][pos.x];
  const isSente = isSentePiece(piece);

  const dirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ];

  for (const [dx, dy] of dirs) {
    let x = pos.x + dx;
    let y = pos.y + dy;
    while (x >= 0 && x < 9 && y >= 0 && y < 9) {
      const target = board[y][x];
      if (target === '') moves.push({ x, y });
      else {
        if (
          isSente
            ? target === target.toUpperCase()
            : target === target.toLowerCase()
        ) {
          moves.push({ x, y });
        }
        break;
      }
      x += dx;
      y += dy;
    }
  }
  return moves;
};

export const bishopMoves: MoveFunc = (pos, board) => {
  const moves: Position[] = [];
  const piece = board[pos.y][pos.x];
  const isSente = isSentePiece(piece);

  const dirs = [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
  ];

  for (const [dx, dy] of dirs) {
    let x = pos.x + dx;
    let y = pos.y + dy;
    while (x >= 0 && x < 9 && y >= 0 && y < 9) {
      const target = board[y][x];
      if (target === '') moves.push({ x, y });
      else {
        if (
          isSente
            ? target === target.toUpperCase()
            : target === target.toLowerCase()
        ) {
          moves.push({ x, y });
        }
        break;
      }
      x += dx;
      y += dy;
    }
  }
  return moves;
};

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