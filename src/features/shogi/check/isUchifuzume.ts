import { ShogiState } from '@/features/shogi/state/shogiState';
import { isKingInCheck } from './isKingInCheck';
import { getLegalMoves } from '../move/getLegalMoves';
import { nextTurn, isSentePiece } from '../utils/shogiHelpers';

/**
 * 打歩詰めかどうかを判定
 * @param stateAfterDrop 駒を打った後の将棋の状態
 * @param droppedPiece 打った駒の種類
 * @returns 打歩詰めなら true、そうでなければ false
 */
export const isUchifuzume = (
  stateAfterDrop: ShogiState,
  droppedPiece: string
): boolean => {
  // 歩以外は関係なし
  const base = droppedPiece.startsWith('+') ? droppedPiece[1] : droppedPiece[0];
  if (base.toLowerCase() !== 'p') return false;

  // 相手番
  const opponentTurn = nextTurn(stateAfterDrop.turn);
  const opponentIsSente = opponentTurn === 'sente';

  // 相手玉が王手されていなければ詰みではない
  if (!isKingInCheck(stateAfterDrop.board, opponentIsSente)) {
    return false;
  }

  // 相手の全合法手を探す
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      const piece = stateAfterDrop.board[y][x];
      if (!piece) continue;

      // 相手の駒だけ
      if (isSentePiece(piece) !== opponentIsSente) continue;

      const moves = getLegalMoves({ x, y }, stateAfterDrop.board);
      if (moves.length > 0) {
        return false;
      }
    }
  }

  // 応手なし → 打歩詰め
  return true;
};