import { generateLegalMoves } from "../move/generateLegalMoves";
import { ShogiState } from "../state/shogiState";
import { isSentePiece } from "../model/helpers/camp";

export const selectCell = (
  state: ShogiState,
  action: { type: 'SELECT_CELL'; x: number; y: number }
): ShogiState => {
  const piece = state.board[action.y][action.x];
  if (!piece) return state;

  const isSente = isSentePiece(piece);
  if ((state.turn === 'sente' && !isSente) || (state.turn === 'gote' && isSente)) {
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