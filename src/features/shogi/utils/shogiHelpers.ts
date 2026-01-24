import { unpromote } from "../board/pieces";

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
 * 出番を切り替えるヘルパー関数
 * @param turn 現在の手番
 * @returns 次の手番
 */
export const nextTurn = (turn: 'sente' | 'gote'): 'sente' | 'gote' =>
  turn === 'sente' ? 'gote' : 'sente';

/* ================= 駒移動関連 ================= */
/**
 * 強制成が必要かを判定するヘルパー関数
 * #### 強制成りが必要なケース
 * - 歩・香：敵陣最終列(先手y=0、後手y=8)への移動
 * - 桂：敵陣最終列・その手前(先手y ≤ 1、後手y ≥ 7)への移動
 * @param piece 駒の種類
 * @param toY 移動先の行番号
 * @returns 強制成が必要なら true、そうでなければ false
 */
export const mustPromote = (
  piece: string,
  toY: number
): boolean => {
  const base = piece.startsWith('+') ? piece[1] : piece[0];
  const isSente = isSentePiece(piece);

  if (base.toLowerCase() === 'p' || base.toLowerCase() === 'l') {
    return isSente ? toY === 0 : toY === 8;
  }

  if (base.toLowerCase() === 'n') {
    return isSente ? toY <= 1 : toY >= 7;
  }

  return false;
};

/**
 * 打ち駒位置の違法判定ヘルパー関数
 * #### 違法な打ち駒位置
 * - 歩・香：敵陣最終列(先手y=0、後手y=8)
 * - 桂：敵陣最終列・その手前(先手y ≤ 1、後手y ≥ 7)
 * @param piece 駒の種類
 * @param y 打ち駒位置の行番号
 * @returns 違法な位置なら true、そうでなければ false
 */
export const isIllegalDropPosition = (
  piece: string,
  y: number
): boolean => {
  const base = piece.toLowerCase();
  const isSente = piece === piece.toLowerCase();

  // 歩・香
  if (base === 'p' || base === 'l') {
    return isSente ? y === 0 : y === 8;
  }

  // 桂
  if (base === 'n') {
    return isSente ? y <= 1 : y >= 7;
  }

  return false;
};

/**
 * 二歩判定
 * - 同じ筋（x列）に自分の歩がある場合は二歩
 * - 成歩は対象外
 * @param board 現在の盤面
 * @param x 打つ筋
 * @param piece 打つ駒（p or P）
 */
export const isNifu = (
  board: string[][],
  x: number,
  piece: string
): boolean => {
  const isSente = piece === piece.toLowerCase();
  const pawn = isSente ? 'p' : 'P';

  for (let y = 0; y < 9; y++) {
    if (board[y][x] === pawn) {
      return true;
    }
  }
  return false;
};
