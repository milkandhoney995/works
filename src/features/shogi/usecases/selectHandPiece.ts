import { tryDropPiece } from "../domain/shogiRules";
import { ShogiState } from "../state/shogiState";
import { Position } from "../state/types";
import { isIllegalDropPosition, isInsideBoard, isNifu } from "../utils/shogiHelpers";
import { withCheckState } from "../utils/withCheckState";

export const selectHandPieceUseCase = (
  state: ShogiState,
  action: { type: 'SELECT_HAND_PIECE'; piece: string }
): ShogiState => {
  return {
    ...state,
    selected: null,
    selectedHandPiece: action.piece,
    legalMoves: getLegalDropMoves(state, action.piece),
  };
}

/**
 * 王手中の合法 DROP マスを計算
 */
const getLegalDropMoves = (
  state: ShogiState,
  piece: string
): Position[] => {
  const moves: Position[] = [];
  const base = piece.toLowerCase();

  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (!isInsideBoard(x, y)) continue;
      if (state.board[y][x] !== '') continue;

      // 不成り駒の打ち位置制限（歩・香・桂）
      if (isIllegalDropPosition(piece, y)) continue;

      // 二歩チェック（歩のみ）
      if (base === 'p' && isNifu(state.board, x, piece)) continue;

      const dropped = tryDropPiece(state, piece, { x, y });
      const evaluated = withCheckState(dropped);

      // 王手が解消される打ちだけ許可
      if (!evaluated.isInCheck) {
        moves.push({ x, y });
      }
    }
  }

  return moves;
};