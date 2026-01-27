import { uchifuzume } from "../judge/uchifuzume";
import { tryDropPiece } from "../model/rules";
import { ShogiState } from "../state/shogiState";
import { isIllegalDropPosition, isNifu } from "../utils/shogiHelpers";
import { evaluateCheckState } from "../utils/evaluateCheckState";

export const dropPiece = (
  state: ShogiState,
  action: { type: 'DROP_PIECE'; piece: string; x: number; y: number }
): ShogiState => {
  const { piece, x, y } = action;
  const base = piece.toLowerCase();

  if (isIllegalDropPosition(piece, y)) return state;
  if (base === 'p' && isNifu(state.board, x, piece)) return state;

  const next = tryDropPiece(state, piece, { x, y });
  const evaluated = evaluateCheckState(next);

  if (state.isInCheck && evaluated.isInCheck) return state;
  if (base === 'p' && uchifuzume(evaluated, piece)) return state;

  return {
    ...evaluated,
    selected: null,
    selectedHandPiece: null,
  };
};