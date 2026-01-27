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

/**
 * 選択解除処理
 * @function resetSelection
 * @param state 現在の状態
 * @returns 選択解除後の状態
 */
const resetSelection = <T extends { selected: any; legalMoves: any[] }>(state: T) => ({
  ...state,
  selected: null,
  legalMoves: [],
});