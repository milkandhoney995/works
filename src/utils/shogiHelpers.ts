import { unpromote } from "@/hooks/shogi/pieces";
import { Position } from "@/hooks/shogi/types";


/* ================= 定数 ================= */
export const BOARD_SIZE = 9;

/* ================= 陣営判定 ================= */
/**
 * 駒が先手かどうか
 * @param piece 駒の種類
 * @returns 先手なら true、後手なら false
 */
export const isSentePiece = (piece: string): boolean => {
  if (piece === '') return false;
  const base = piece.startsWith('+') ? piece[1] : piece[0];
  return base === base.toLowerCase();
}

/**
 * 敵駒かどうかを判定するヘルパー関数
 * @param target 盤上の駒
 * @param isSente 先手か後手か
 */
export const isEnemyPiece = (target: string, isSente: boolean): boolean => {
  if (!target) return false;
  return isSente
    ? target === target.toUpperCase()
    : target === target.toLowerCase();
};

/**
 * 敵陣判定するヘルパー関数
 * @param y 行番号
 * @param isSente 先手か後手か
 * 先手の敵陣：y = 0〜2
 * 後手の敵陣：y = 6〜8
 */
export const inEnemyCamp = (y: number, piece: string): boolean => {
  const isSente = isSentePiece(piece);
  return isSente ? y <= 2 : y >= 6;
};

/**
 * 盤面内判定するヘルパー関数
 * @param x 列番号
 * @param y 行番号
 */
export const isInsideBoard = (x: number, y: number): boolean =>
  x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;

/**
 * 駒の合法手を取得するヘルパー関数
 * @param moves 合法手の配列（引数で渡された配列に追加される）
 * @param board 現在盤面
 * @param x 列番号
 * @param y 行番号
 * @param isSente 先手か後手か
 * @returns 合法手の配列
 */

export const pushIfValid = (
  moves: Position[],
  board: string[][],
  x: number,
  y: number,
  isSente: boolean
) => {
  if (!isInsideBoard(x, y)) return;
  const target = board[y][x];
  if (target === '' || isEnemyPiece(target, isSente)) {
    moves.push({ x, y });
  }
};

/* ================= 盤面操作 ================= */
/**
 * 盤面をコピーするヘルパー関数
 * @param board コピー元の盤面
 * @returns コピーされた盤面
 */
export const copyBoard = (board: string[][]) => board.map(r => [...r]);

/**
 * 駒を取って持ち駒に加えるヘルパー関数
 * @param hands 現在の持ち駒
 * @param captured 取った駒
 * @returns 更新後の持ち駒
 */
export const capturePiece = (hands: Record<string, number>, captured: string): Record<string, number> => {
  if (!captured) return hands;
  const basePiece = unpromote[captured] || captured;
  const handPiece =
    basePiece === basePiece.toUpperCase() ? basePiece.toLowerCase() : basePiece.toUpperCase();
  return { ...hands, [handPiece]: (hands[handPiece] || 0) + 1 };
};

/**
 * 選択解除処理
 * @param state 現在の状態
 * @returns 選択解除後の状態
 */
export const resetSelection = <T extends { selected: any; legalMoves: any[] }>(state: T) => ({
  ...state,
  selected: null,
  legalMoves: [],
});

/**
 * 出番を切り替えるヘルパー関数
 * @param turn 現在の手番
 * @returns 次の手番
 */
export const nextTurn = (turn: 'sente' | 'gote'): 'sente' | 'gote' =>
  turn === 'sente' ? 'gote' : 'sente';