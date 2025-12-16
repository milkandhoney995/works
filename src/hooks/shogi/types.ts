// 座標
export type Position = { x: number; y: number };

// 持ち駒
export type Hands = { [piece: string]: number };

// 成り選択中の状態
export type PendingPromotion = { x: number; y: number; piece: string } | null;

// 移動関数の型
export type MoveFunc = (pos: Position, board: string[][], isUpper: boolean) => Position[];

// useShogiが返す型
export interface UseShogiReturn {
  board: string[][];
  selected: Position | null;
  legalMoves: Position[];
  hands: Hands;
  pendingPromotion: PendingPromotion;
  handleCellClick: (x: number, y: number) => void;
  promotePiece: (promote: boolean) => void;
  dropPiece: (piece: string, x: number, y: number) => void;
}
