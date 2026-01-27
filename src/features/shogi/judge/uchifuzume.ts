import { generateLegalMoves } from '../move/generateLegalMoves';
import { isSentePiece } from '../model/helpers/camp';
import { check } from '../judge/check';
import { nextTurn } from '../model/helpers/turn';

/**
 * 打歩詰めかどうかを判定
 * @param board 現在の盤面
 * @param turn 手番
 * @param droppedPiece 打った駒の種類
 * @returns 打歩詰めなら true、そうでなければ false
 */
export const uchifuzume = (
  board: string[][],
  turn: 'sente' | 'gote',
  droppedPiece: string
): boolean => {
  // 歩以外は関係なし
  const base = droppedPiece.startsWith('+') ? droppedPiece[1] : droppedPiece[0];
  if (base.toLowerCase() !== 'p') return false;

  // 相手番
  const opponentTurn = nextTurn(turn);
  const opponentIsSente = opponentTurn === 'sente';

  // 相手玉が王手されていなければ詰みではない
  if (!check(board, opponentIsSente)) {
    return false;
  }

  // 相手の全合法手を探す
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      const piece = board[y][x];
      if (!piece) continue;

      // 相手の駒だけ
      if (isSentePiece(piece) !== opponentIsSente) continue;

      const moves = generateLegalMoves({ x, y }, board);
      if (moves.length > 0) {
        return false;
      }
    }
  }

  // 応手なし → 打歩詰め
  return true;
};