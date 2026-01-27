import { Position } from '@/features/shogi/model/types';
import { isEnemyPiece } from '../model/helpers/camp';
import { isInsideBoard } from '../model/board';

/**
 * 決まった方向に一歩ずつ移動する駒の合法手を取得する
 * @function stepMoves
 * @param x 列番号
 * @param y 行番号
 * @param board 現在盤面
 * @param isSente 先手か後手か
 * @param deltas 移動方向の配列
 * @returns 合法手の配列
 */
export const stepMoves = (
  x: number,
  y: number,
  board: string[][],
  isSente: boolean,
  deltas: Array<[number, number]>
): Position[] => {
  const moves: Position[] = [];
  deltas.forEach(([dx, dy]) => {
    const nx = x + dx;
    const ny = y + dy;
    if (!isInsideBoard(nx, ny)) return;

    const target = board[ny][nx];
    if (target === '' || isEnemyPiece(target, isSente)) {
      moves.push({ x: nx, y: ny });
    }
  });
  return moves;
}

/**
 * 同じ方向に当たるまで移動する駒の合法手を取得する
 * @function rayMoves
 * @param x 列番号
 * @param y 行番号
 * @param board 現在盤面
 * @param isSente 先手か後手か
 * @param deltas 移動方向の配列
 * @returns 合法手の配列
 */
export const rayMoves = (
  x: number,
  y: number,
  board: string[][],
  isSente: boolean,
  deltas: Array<[number, number]>
): Position[] => {
  const moves: Position[] = [];

  deltas.forEach(([dx, dy]) => {
    let nx = x + dx;
    let ny = y + dy;

    while (isInsideBoard(nx, ny)) {
      const target = board[ny][nx];
      if (target === '') {
        moves.push({ x: nx, y: ny });
      } else {
        if (isEnemyPiece(target, isSente)) {
          moves.push({ x: nx, y: ny });
        }
        break;
      }
      nx += dx;
      ny += dy;
    }
  });

  return moves;
}