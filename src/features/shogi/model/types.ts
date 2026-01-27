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

export type MoveResult =
  | {
      type: 'moved';
      board: string[][];
      hands: Record<string, number>;
      turn: 'sente' | 'gote';
    }
  | {
      type: 'promotionRequired';
      from: Position;
      to: Position;
      piece: string;
    };

/**
 * useShogiが返す型
 * @interface UseShogiReturn
 * @param board 現在の盤面
 * @param selected 選択されている駒の位置
 * @param selectedHandPiece 選択されている持ち駒
 * @param legalMoves 選択されている駒の合法手リスト
 * @param hands 各プレイヤーの持ち駒
 * @param pendingPromotion 昇格待ちの駒情報
 * @param turn 現在の手番（先手か後手）
 * @param isInCheck 現在の王手状態
 * @param kingPosition 王の位置
 * @param handleCellClick 盤面セルクリック時の処理
 * @param promotePiece 駒の成り選択時の処理
 * @param dropPiece 打ち駒の処理
 * @param onHandSelect 持ち駒選択時の処理
 */
export interface UseShogiReturn {
  board: string[][];
  selected: Position | null;
  selectedHandPiece: string | null;
  legalMoves: Position[];
  hands: HandsByPlayer;
  pendingPromotion: PendingPromotion;
  turn: 'sente' | 'gote';
  isInCheck: boolean;
  kingPosition: Position | null;
  handleCellClick: (x: number, y: number) => void;
  promotePiece: (promote: boolean) => void;
  dropPiece: (piece: string, x: number, y: number) => void;
  onHandSelect: (piece: string) => void;
}
