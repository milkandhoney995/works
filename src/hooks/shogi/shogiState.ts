import { initialBoard } from './board';
import { Position, Hands, PendingPromotion } from './types';

export interface ShogiState {
  board: string[][];
  selected: Position | null;
  legalMoves: Position[];
  hands: Hands;
  pendingPromotion: PendingPromotion;
}

/**
 * UIイベント単位で Action を設計
 */
export type ShogiAction =
  | { type: 'SELECT_CELL'; x: number; y: number }
  | { type: 'MOVE_PIECE'; x: number; y: number }
  | { type: 'DROP_PIECE'; piece: string; x: number; y: number }
  | { type: 'CANCEL_SELECTION' }
  | { type: 'PROMOTE'; promote: boolean };

export const initialShogiState: ShogiState = {
  board: initialBoard,
  selected: null,
  legalMoves: [],
  hands: {},
  pendingPromotion: null,
};