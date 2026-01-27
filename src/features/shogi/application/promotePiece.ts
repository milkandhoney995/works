import { finalizePromotion } from "../model/rules";
import { ShogiState } from "../state/shogiState"
import { evaluateCheckState } from "../utils/evaluateCheckState";

export const promotePiece  = (
  state: ShogiState,
  action: { type: 'PROMOTE', promote: boolean }
): ShogiState => {
  const next = finalizePromotion(state, action.promote);
  return evaluateCheckState({
    ...next,
    selected: null,
    selectedHandPiece: null,
  });
}