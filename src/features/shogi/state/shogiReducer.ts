import { ShogiState, ShogiAction } from '@/features/shogi/state/shogiState';
import { withCheckState } from '@/features/shogi/utils/withCheckState';
import {
  finalizePromotion,
  applyMoveWithRules,
  resetSelection,
} from '../domain/shogiRules';
import { dropPieceUseCase } from '../usecases/dropPiece';
import { selectCellUseCase } from '../usecases/selectCell';
import { selectHandPieceUseCase } from '../usecases/selectHandPiece';
import { cancelSelectionUseCase } from '../usecases/cancelSelection';
import { promotePieceUseCase } from '../usecases/promotePiece';
import { movePieceUseCase } from '../usecases/movePiece';


/**
 * 将棋の状態を管理するリデューサー関数
 * @param state 現在の将棋の状態
 * @param action 実行するアクション
 * @return 更新後の将棋の状態
 */
export const shogiReducer = (
  state: ShogiState,
  action: ShogiAction
): ShogiState => {
  switch (action.type) {

    case 'SELECT_CELL':
      return selectCellUseCase(state, action)

    case 'SELECT_HAND_PIECE':
      return selectHandPieceUseCase(state, action)

    case 'MOVE_PIECE':
      return movePieceUseCase(state, action)

    case 'PROMOTE':
      return promotePieceUseCase(state, action)

    case 'DROP_PIECE':
      return dropPieceUseCase(state, action);

    case 'CANCEL_SELECTION':
      return cancelSelectionUseCase(state, action);

    default:
      return state;
  }
};