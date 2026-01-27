import { resetSelection } from "../model/rules";
import { ShogiState } from "../state/shogiState";

export const cancelSelectionUseCase = (
  state: ShogiState,
  action: { type: 'CANCEL_SELECTION' }
): ShogiState => {
  return {
    ...resetSelection(state),
    selectedHandPiece: null,
  }
}