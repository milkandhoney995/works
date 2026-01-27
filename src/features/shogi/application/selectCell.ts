import { generateLegalMoves } from "../move/generateLegalMoves";
import { ShogiState } from "../state/shogiState";
import { isOwnPiece, isSentePiece } from "../model/helpers/camp";

export const selectCell = (
  state: ShogiState,
  action: { type: 'SELECT_CELL'; x: number; y: number }
): ShogiState => {
  const piece = state.board[action.y][action.x];
  if (!piece) return state;

  // 自分の駒でなければ選択不可
  if (!isOwnPiece(piece, state.turn)) {
    return state;
  }

  const selected = { x: action.x, y: action.y };

  return {
    ...state,
    selected,
    selectedHandPiece: null,
    legalMoves: generateLegalMoves(selected, state.board),
  };
}