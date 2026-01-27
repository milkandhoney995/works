import { applyMoveWithRules } from "../model/rules";
import { ShogiState } from "../state/shogiState"
import { evaluateCheck } from "../judge/evaluateCheck";

export const movePiece  = (
  state: ShogiState,
  action: { type: 'MOVE_PIECE'; x: number; y: number }
): ShogiState => {
  const next = applyMoveWithRules(state, { x: action.x, y: action.y });
  return {
    ...next,
    ...evaluateCheck(next.board, next.turn),
    selected: null,
    selectedHandPiece: null,
  };
}