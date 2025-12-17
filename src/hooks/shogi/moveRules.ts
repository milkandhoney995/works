/**
 * 変数名一覧（直感的に変更）
 *
 * currentX / currentY       : 現在の駒位置
 * deltaX / deltaY           : 移動量（相対座標）
 * targetX / targetY         : 移動先座標
 * moveDirectionY            : 上下方向の進行方向（上: -1 / 下: 1）
 * movePattern               : 駒の移動パターン（相対座標の配列）
 * step                      : 連続移動用の一歩ごとの座標増分
 * jumpPositions             : ジャンプ移動用の座標（桂馬など）
 * straightStepY             : 直進移動用のY座標増分（香車など）
 * promotedMoveFunc          : 成り駒用の移動関数（例: 銀 → 金）
 */

import { Position } from "./types";

export type MoveFunc = (pos: Position, board: string[][], isUpper: boolean) => Position[];

// --- 移動ルール（簡易版：合法手） ---
// 王の移動
export const kingMoves: MoveFunc = ({ x: currentX, y: currentY }, board, isUpper) => {
  const moves: Position[] = [];
  for (let deltaX = -1; deltaX <= 1; deltaX++) {
    for (let deltaY = -1; deltaY <= 1; deltaY++) {
      if (deltaX === 0 && deltaY === 0) continue;
      const targetX = currentX + deltaX;
      const targetY = currentY + deltaY;
      if (targetX >= 0 && targetX < 9 && targetY >= 0 && targetY < 9) {
        const target = board[targetY][targetX];
        if (target === '' || (isUpper ? target === target.toLowerCase() : target === target.toUpperCase())) {
          moves.push({ x: targetX, y: targetY });
        }
      }
    }
  }
  return moves;
};

// 金の移動
export const goldMoves: MoveFunc = ({ x: currentX, y: currentY }, board, isUpper) => {
  const moves: Position[] = [];
  const moveDirectionY = isUpper ? -1 : 1;
  const movePattern = [
    { deltaX: 0, deltaY: moveDirectionY },
    { deltaX: -1, deltaY: 0 },
    { deltaX: 1, deltaY: 0 },
    { deltaX: 0, deltaY: -moveDirectionY },
    { deltaX: -1, deltaY: moveDirectionY },
    { deltaX: 1, deltaY: moveDirectionY },
  ];
  for (const { deltaX, deltaY } of movePattern) {
    const targetX = currentX + deltaX;
    const targetY = currentY + deltaY;
    if (targetX >= 0 && targetX < 9 && targetY >= 0 && targetY < 9) {
      const target = board[targetY][targetX];
      if (target === '' || (isUpper ? target === target.toLowerCase() : target === target.toUpperCase())) {
        moves.push({ x: targetX, y: targetY });
      }
    }
  }
  return moves;
};

// 銀の移動
export const silverMoves: MoveFunc = ({ x: currentX, y: currentY }, board, isUpper) => {
  const moves: Position[] = [];
  const moveDirectionY = isUpper ? -1 : 1;
  const movePattern = [
    { deltaX: 0, deltaY: moveDirectionY },
    { deltaX: -1, deltaY: moveDirectionY },
    { deltaX: 1, deltaY: moveDirectionY },
    { deltaX: -1, deltaY: -moveDirectionY },
    { deltaX: 1, deltaY: -moveDirectionY },
  ];
  for (const { deltaX, deltaY } of movePattern) {
    const targetX = currentX + deltaX;
    const targetY = currentY + deltaY;
    if (targetX >= 0 && targetX < 9 && targetY >= 0 && targetY < 9) {
      const target = board[targetY][targetX];
      if (target === '' || (isUpper ? target === target.toLowerCase() : target === target.toUpperCase())) {
        moves.push({ x: targetX, y: targetY });
      }
    }
  }
  return moves;
};

// 桂馬の移動（ジャンプ）
export const knightMoves: MoveFunc = ({ x: currentX, y: currentY }, board, isUpper) => {
  const moves: Position[] = [];
  const moveDirectionY = isUpper ? -1 : 1;
  const jumpPositions = [
    { deltaX: -1, deltaY: 2 * moveDirectionY },
    { deltaX: 1, deltaY: 2 * moveDirectionY },
  ];
  for (const { deltaX, deltaY } of jumpPositions) {
    const targetX = currentX + deltaX;
    const targetY = currentY + deltaY;
    if (targetX >= 0 && targetX < 9 && targetY >= 0 && targetY < 9) {
      const target = board[targetY][targetX];
      if (target === '' || (isUpper ? target === target.toLowerCase() : target === target.toUpperCase())) {
        moves.push({ x: targetX, y: targetY });
      }
    }
  }
  return moves;
};

// 香車の移動（直進）
export const lanceMoves: MoveFunc = ({ x: currentX, y: currentY }, board, isUpper) => {
  const moves: Position[] = [];
  const moveDirectionY = isUpper ? -1 : 1;
  for (let targetY = currentY + moveDirectionY; targetY >= 0 && targetY < 9; targetY += moveDirectionY) {
    const target = board[targetY][currentX];
    if (target === '') moves.push({ x: currentX, y: targetY });
    else {
      if (isUpper ? target === target.toLowerCase() : target === target.toUpperCase()) moves.push({ x: currentX, y: targetY });
      break;
    }
  }
  return moves;
};

// 歩の移動
export const pawnMoves: MoveFunc = ({ x: currentX, y: currentY }, board, isUpper) => {
  const moves: Position[] = [];
  const moveDirectionY = isUpper ? -1 : 1;
  const targetY = currentY + moveDirectionY;
  if (targetY >= 0 && targetY < 9) {
    const target = board[targetY][currentX];
    if (target === '' || (isUpper ? target === target.toLowerCase() : target === target.toUpperCase())) {
      moves.push({ x: currentX, y: targetY });
    }
  }
  return moves;
};

// 飛車の移動
export const rookMoves: MoveFunc = ({ x: currentX, y: currentY }, board, isUpper) => {
  const moves: Position[] = [];
  const directions = [
    { deltaX: 1, deltaY: 0 },
    { deltaX: -1, deltaY: 0 },
    { deltaX: 0, deltaY: 1 },
    { deltaX: 0, deltaY: -1 },
  ];
  for (const { deltaX, deltaY } of directions) {
    let targetX = currentX + deltaX;
    let targetY = currentY + deltaY;
    while (targetX >= 0 && targetX < 9 && targetY >= 0 && targetY < 9) {
      const target = board[targetY][targetX];
      if (target === '') moves.push({ x: targetX, y: targetY });
      else {
        if (isUpper ? target === target.toLowerCase() : target === target.toUpperCase()) moves.push({ x: targetX, y: targetY });
        break;
      }
      targetX += deltaX;
      targetY += deltaY;
    }
  }
  return moves;
};

// 角の移動
export const bishopMoves: MoveFunc = ({ x: currentX, y: currentY }, board, isUpper) => {
  const moves: Position[] = [];
  const directions = [
    { deltaX: 1, deltaY: 1 },
    { deltaX: -1, deltaY: 1 },
    { deltaX: 1, deltaY: -1 },
    { deltaX: -1, deltaY: -1 },
  ];
  for (const { deltaX, deltaY } of directions) {
    let targetX = currentX + deltaX;
    let targetY = currentY + deltaY;
    while (targetX >= 0 && targetX < 9 && targetY >= 0 && targetY < 9) {
      const target = board[targetY][targetX];
      if (target === '') moves.push({ x: targetX, y: targetY });
      else {
        if (isUpper ? target === target.toLowerCase() : target === target.toUpperCase()) moves.push({ x: targetX, y: targetY });
        break;
      }
      targetX += deltaX;
      targetY += deltaY;
    }
  }
  return moves;
};

// 成り駒の移動（角＋王）
export const bishopMovesWithKingLike: MoveFunc = (pos, board, isUpper) => {
  const moves = bishopMoves(pos, board, isUpper);
  moves.push(...kingMoves(pos, board, isUpper));
  return moves;
};

// 成り駒の移動（飛＋王）
export const rookMovesWithKingLike: MoveFunc = (pos, board, isUpper) => {
  const moves = rookMoves(pos, board, isUpper);
  moves.push(...kingMoves(pos, board, isUpper));
  return moves;
};

// 成り駒（銀・桂・香・歩）→ 金と同じ動き
export const promotedPawnMoves: MoveFunc = goldMoves;
export const promotedSilverMoves: MoveFunc = goldMoves;
export const promotedKnightMoves: MoveFunc = goldMoves;
export const promotedLanceMoves: MoveFunc = goldMoves;

// --- 駒マップ ---
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