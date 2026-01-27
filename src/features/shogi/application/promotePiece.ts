import { finalizePromotion } from "../model/rules";
import { ShogiState } from "../state/shogiState"
import { evaluateCheck } from "../judge/evaluateCheck";

export const promotePiece  = (
  state: ShogiState,
  action: { type: 'PROMOTE', promote: boolean }
): ShogiState => {
  if (!state.pendingPromotion) return state;
  const { from, to, piece } = state.pendingPromotion;

  const next = finalizePromotion(
    state.board,
    state.hands,
    state.turn,
    from,
    to,
    piece,
    action.promote
  );
  return {
    ...state,
    board: next.board,
    hands: next.hands,
    turn: next.turn,
    ...evaluateCheck(next.board, next.turn),
    pendingPromotion: null,
    selected: null,
    selectedHandPiece: null,
    legalMoves: []
  };
}