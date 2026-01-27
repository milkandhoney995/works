/**
 * 出番を切り替えるヘルパー関数
 * @param turn 現在の手番
 * @returns 次の手番
 */
export const nextTurn = (turn: 'sente' | 'gote'): 'sente' | 'gote' =>
  turn === 'sente' ? 'gote' : 'sente';