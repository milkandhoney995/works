import { finalizePromotion } from "../domain/shogiRules";
import { ShogiState } from "../state/shogiState"
import { withCheckState } from "../utils/withCheckState";

export const promotePieceUseCase  = (
  state: ShogiState,
  action: { type: 'PROMOTE', promote: boolean }
): ShogiState => {
  const next = finalizePromotion(state, action.promote);
  return withCheckState({
    ...next,
    selected: null,
    selectedHandPiece: null,
  });
}