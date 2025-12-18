import { initialBoard } from './board';
import { Position, Hands, PendingPromotion } from './types';

/**
 * 将棋の状態を表すインターフェース
 * @property board 現在の盤面
 * @property selected 選択されている駒の位置
 * @property legalMoves 選択されている駒の合法手リスト
 * @property hands 各プレイヤーの持ち駒
 * @property pendingPromotion 昇格待ちの駒情報
 */
export interface ShogiState {
  board: string[][];
  selected: Position | null;
  legalMoves: Position[];
  hands: Hands;
  pendingPromotion: PendingPromotion;
}

/**
 * UIイベント単位で Action を設計
 * @property type アクションの種類
 * @property SELECT_CELL セルを選択するアクション
 * @property MOVE_PIECE 駒を移動するアクション
 * @property DROP_PIECE 駒を打つアクション
 * @property CANCEL_SELECTION 選択をキャンセルするアクション
 * @property PROMOTE 駒を昇格させるアクション
 */
export type ShogiAction =
  | { type: 'SELECT_CELL'; x: number; y: number }
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
  legalMoves: [],
  hands: {},
  pendingPromotion: null,
};