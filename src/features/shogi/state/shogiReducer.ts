import { ShogiState, ShogiAction } from '@/features/shogi/state/shogiState';
import { dropPiece } from '../application/dropPiece';
import { selectCell } from '../application/selectCell';
import { selectHandPiece } from '../application/selectHandPiece';
import { cancelSelection } from '../application/cancelSelection';
import { promotePiece } from '../application/promotePiece';
import { movePiece } from '../application/movePiece';


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
      return selectCell(state, action)

    case 'SELECT_HAND_PIECE':
      return selectHandPiece(state, action)

    case 'MOVE_PIECE':
      return movePiece(state, action)

    case 'PROMOTE':
      return promotePiece(state, action)

    case 'DROP_PIECE':
      return dropPiece(state, action);

    case 'CANCEL_SELECTION':
      return cancelSelection(state, action);

    default:
      return state;
  }
};