import { Position, Hands, PendingPromotion } from '@/features/shogi/state/types';
import { initialBoard } from '../board/board';

/**
 * 将棋の状態を表すインターフェース
 * @interface ShogiState
 * @param board 現在の盤面
 * @param selected 選択されている駒の位置
 * @param selectedHandPiece 選択されている持ち駒
 * @param legalMoves 選択されている駒の合法手リスト
 * @param hands 各プレイヤーの持ち駒
 * @param pendingPromotion 昇格待ちの駒情報
 * @param turn 現在の手番（先手か後手）
 * @param isInCheck 現在の王手状態
 * @param kingPosition 王の位置
 */
export interface ShogiState {
  board: string[][];
  selected: Position | null;
  selectedHandPiece: string | null;
  legalMoves: Position[];
  hands: Hands;
  pendingPromotion: PendingPromotion;
  turn: 'sente' | 'gote';
  isInCheck: boolean;
  kingPosition: Position | null;
}

/**
 * UIイベント単位で Action を設計
 * @property type アクションの種類
 * @property SELECT_CELL セルを選択するアクション
 * @property SELECT_HAND_PIECE 持ち駒を選択するアクション
 * @property MOVE_PIECE 駒を移動するアクション
 * @property DROP_PIECE 駒を打つアクション
 * @property CANCEL_SELECTION 選択をキャンセルするアクション
 * @property PROMOTE 駒を昇格させるアクション
 */
export type ShogiAction =
  | { type: 'SELECT_CELL'; x: number; y: number }
  | { type: 'SELECT_HAND_PIECE'; piece: string }
  | { type: 'MOVE_PIECE'; x: number; y: number }
  | { type: 'DROP_PIECE'; piece: string; x: number; y: number }
  | { type: 'CANCEL_SELECTION' }
  | { type: 'PROMOTE'; promote: boolean };

/**
 * 将棋の初期状態
 * @return 初期状態のオブジェクト
 */
export const initialShogiState: ShogiState = {
  board: initialBoard,
  selected: null,
  selectedHandPiece: null,
  legalMoves: [],
  hands: {},
  pendingPromotion: null,
  turn: 'sente',
  isInCheck: false,
  kingPosition: null
};