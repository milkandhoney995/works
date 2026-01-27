import { finalizePromotion } from "../model/rules";
import { ShogiState } from "../state/shogiState"
import { evaluateCheck } from "../judge/evaluateCheck";

export const promotePiece  = (
  state: ShogiState,
  action: { type: 'PROMOTE', promote: boolean }
): ShogiState => {
  const next = finalizePromotion(state, action.promote);
  return {
    ...next,
    ...evaluateCheck(next.board, next.turn),
    selected: null,
    selectedHandPiece: null,
  };
}