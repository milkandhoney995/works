import { evaluateCheck } from "../judge/evaluateCheck";
import { uchifuzume } from "../judge/uchifuzume";
import { dropPieceWithRules } from "../model/rules";
import { ShogiState } from "../state/shogiState";
import { isIllegalDropPosition, isNifu } from "../utils/shogiHelpers";

export const dropPiece = (
  state: ShogiState,
  action: { type: 'DROP_PIECE'; piece: string; x: number; y: number }
): ShogiState => {
  const { piece, x, y } = action;
  const base = piece.toLowerCase();

  if (isIllegalDropPosition(piece, y)) return state;
  if (base === 'p' && isNifu(state.board, x, piece)) return state;

  const next = dropPieceWithRules(
    state.board,
    state.hands,
    state.turn,
    piece, { x, y }
  );
  const evaluated = {
    ...next,
    ...evaluateCheck(next.board, next.turn)
  };

  if (state.isInCheck && evaluated.isInCheck) return state;
  if (base === 'p' && uchifuzume(evaluated.board, evaluated.turn, piece)) return state;

  return {
    ...state,
    ...evaluated,
    selected: null,
    selectedHandPiece: null,
    legalMoves: []
  };
};