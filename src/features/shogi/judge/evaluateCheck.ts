import { check } from '../judge/check';
import { findKing } from '../judge/findKing';
import { TeamType } from '../model/types';

/**
 * 局面が確定したら、王手状態などを再評価する
 * @function evaluateCheck
 * @param board 現在の盤面
 * @param turn 手番
 * @returns 王手情報を付与した将棋の状態
 */
export const evaluateCheck = (
  board: string[][],
  turn: TeamType
) => {
  return {
    isInCheck: check(board, turn === TeamType.OUR),
    kingPosition: findKing(board, turn),
  };
};