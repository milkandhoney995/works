import { resetSelection } from "../model/rules";
import { ShogiState } from "../state/shogiState";

export const cancelSelection = (
  state: ShogiState,
  action: { type: 'CANCEL_SELECTION' }
): ShogiState => {
  return {
    ...resetSelection(state),
    selectedHandPiece: null,
  }
}