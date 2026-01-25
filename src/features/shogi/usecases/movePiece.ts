import { applyMoveWithRules } from "../domain/shogiRules";
import { ShogiState } from "../state/shogiState"
import { withCheckState } from "../utils/withCheckState";

export const movePieceUseCase  = (
  state: ShogiState,
  action: { type: 'MOVE_PIECE'; x: number; y: number }
): ShogiState => {
  const next = applyMoveWithRules(state, { x: action.x, y: action.y });
  return withCheckState({
    ...next,
    selected: null,
    selectedHandPiece: null,
  });
}