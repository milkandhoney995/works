import { TeamType } from "../types";

/**
 * 出番を切り替えるヘルパー関数
 * @param turn 現在の手番
 * @returns 次の手番
 */
export const nextTurn = (turn: TeamType): TeamType =>
  turn === TeamType.OUR ? TeamType.OPPONENT : TeamType.OUR;