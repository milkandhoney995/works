export const BOARD_SIZE = 9;

// 将棋の初期盤面
export const initialBoard: string[][] = [
  // 後手
  ['L','N','S','G','K','G','S','N','L'],
  ['','R','','','','','','B',''],
  ['P','P','P','P','P','P','P','P','P'],

  ['','','','','','','','',''],
  ['','','','','','','','',''],
  ['','','','','','','','',''],

  // 先手
  ['p','p','p','p','p','p','p','p','p'],
  ['','b','','','','','','r',''],
  ['l','n','s','g','k','g','s','n','l'],
];

/**
 * 盤面内判定するヘルパー関数
 * @param x 列番号
 * @param y 行番号
 */
export const isInsideBoard = (x: number, y: number): boolean =>
  x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;

/**
 * 盤面をコピーするヘルパー関数
 * @param board コピー元の盤面
 * @returns コピーされた盤面
 */
export const copyBoard = (board: string[][]) => board.map(r => [...r]);