import { applyMoveWithRules } from "../model/rules";
import { ShogiState } from "../state/shogiState"
import { evaluateCheck } from "../judge/evaluateCheck";

export const movePiece  = (
  state: ShogiState,
  action: { type: 'MOVE_PIECE'; x: number; y: number }
): ShogiState => {
  if (!state.selected) return state;

  // 合法手があるか確認
  const isLegal = state.legalMoves.some(
    m => m.x === action.x && m.y === action.y
  );

  if (!isLegal) {
    return {
      ...state,
      selected: null,
      legalMoves: []
    }
  }

  const result = applyMoveWithRules(
    state.board,
    state.hands,
    state.turn,
    state.selected,
    { x: action.x, y: action.y }
  );

  if (result.type === 'promotionRequired') {
    return {
      ...state,
      pendingPromotion: result,
      selected: null,
      legalMoves: [],
    };
  }

  return {
    ...state,
    board: result.board,
    hands: result.hands,
    turn: result.turn,
    ...evaluateCheck(result.board, result.turn),
    selected: null,
    selectedHandPiece: null,
    legalMoves: []
  };
}