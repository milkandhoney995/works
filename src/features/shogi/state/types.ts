// 座標
export type Position = { x: number; y: number };

// 持ち駒
export type Hands = { [piece: string]: number };

// プレイヤーごとの持ち駒
export interface HandsByPlayer {
  sente: Hands;
  gote: Hands;
}


// 成り選択中の状態
export type PendingPromotion =
  | { from: Position; to: Position; piece: string }
  | null;

// 移動関数の型
export type MoveFunc = (pos: Position, board: string[][]) => Position[];

// useShogiが返す型
export interface UseShogiReturn {
  board: string[][];
  selected: Position | null;
  selectedHandPiece: string | null;
  legalMoves: Position[];
  hands: HandsByPlayer;
  pendingPromotion: PendingPromotion;
  isInCheck: boolean;
  kingPosition: Position | null;
  handleCellClick: (x: number, y: number) => void;
  promotePiece: (promote: boolean) => void;
  dropPiece: (piece: string, x: number, y: number) => void;
  onHandSelect: (piece: string) => void;
  turn: 'sente' | 'gote';
}
