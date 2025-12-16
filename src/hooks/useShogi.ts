'use client';

import { useState } from 'react';

export type Position = { x: number; y: number };
type MoveFunc = (pos: Position, board: string[][], isUpper: boolean) => Position[];

// --- 初期盤面 ---
const initialBoard = [
  ['l', 'n', 's', 'g', 'k', 'g', 's', 'n', 'l'],
  ['', 'r', '', '', '', '', '', 'b', ''],
  ['p','p','p','p','p','p','p','p','p'],
  ['','','','','','','','',''],
  ['','','','','','','','',''],
  ['','','','','','','','',''],
  ['P','P','P','P','P','P','P','P','P'],
  ['', 'B', '', '', '', '', '', 'R', ''],
  ['L','N','S','G','K','G','S','N','L'],
];

// --- 駒表示マップ ---
export const pieceMap: Record<string, string> = {
  k: '王', g: '金', s: '銀', n: '桂', l: '香', b: '角', r: '飛', p: '歩',
  K: '玉', G: '金', S: '銀', N: '桂', L: '香', B: '角', R: '飛', P: '歩',
  '+s': '成銀', '+n': '成桂', '+l': '成香', '+b': '馬', '+r': '龍',
  '': ''
};

// --- 成り可能駒 ---
const promotable: Record<string, string> = {
  s: '+s', n: '+n', l: '+l', b: '+b', r: '+r',
  S: '+s', N: '+n', L: '+l', B: '+b', R: '+r'
};

// --- 移動ルール（簡易版：合法手） ---
const kingMoves: MoveFunc = ({x, y}, board, isUpper) => {
  const moves: Position[] = [];
  for(let dx=-1; dx<=1; dx++){
    for(let dy=-1; dy<=1; dy++){
      if(dx===0 && dy===0) continue;
      const nx=x+dx, ny=y+dy;
      if(nx>=0 && nx<9 && ny>=0 && ny<9){
        const target = board[ny][nx];
        if(target === '' || (isUpper ? target===target.toLowerCase() : target===target.toUpperCase())) moves.push({x:nx, y:ny});
      }
    }
  }
  return moves;
};

const goldMoves: MoveFunc = ({x, y}, board, isUpper) => {
  const moves: Position[] = [];
  const dir = isUpper ? -1 : 1;
  const patterns = [
    {dx:0, dy:dir},{dx:-1, dy:0},{dx:1, dy:0},
    {dx:0, dy:-dir},{dx:-1, dy:dir},{dx:1, dy:dir}
  ];
  for(const {dx, dy} of patterns){
    const nx=x+dx, ny=y+dy;
    if(nx>=0 && nx<9 && ny>=0 && ny<9){
      const target = board[ny][nx];
      if(target === '' || (isUpper ? target===target.toLowerCase() : target===target.toUpperCase())) moves.push({x:nx, y:ny});
    }
  }
  return moves;
};

// 銀・桂・香・角・飛・歩（前回と同様、必要に応じて追加）
const silverMoves: MoveFunc = ({x, y}, board, isUpper) => {
  const moves: Position[] = [];
  const dir = isUpper?-1:1;
  const patterns=[{dx:0,dy:dir},{dx:-1,dy:dir},{dx:1,dy:dir},{dx:-1,dy:-dir},{dx:1,dy:-dir}];
  for(const {dx,dy} of patterns){
    const nx=x+dx, ny=y+dy;
    if(nx>=0 && nx<9 && ny>=0 && ny<9){
      const target=board[ny][nx];
      if(target==='' || (isUpper? target===target.toLowerCase(): target===target.toUpperCase())) moves.push({x:nx,y:ny});
    }
  }
  return moves;
};

const knightMoves: MoveFunc = ({x, y}, board, isUpper) => {
  const moves: Position[] = [];
  const dir = isUpper?-1:1;
  const positions=[{dx:-1,dy:2*dir},{dx:1,dy:2*dir}];
  for(const {dx,dy} of positions){
    const nx=x+dx, ny=y+dy;
    if(nx>=0 && nx<9 && ny>=0 && ny<9){
      const target=board[ny][nx];
      if(target==='' || (isUpper? target===target.toLowerCase(): target===target.toUpperCase())) moves.push({x:nx,y:ny});
    }
  }
  return moves;
};

const lanceMoves: MoveFunc = ({x, y}, board, isUpper) => {
  const moves: Position[] = [];
  const dir = isUpper?-1:1;
  for(let ny=y+dir; ny>=0 && ny<9 && ny>=0; ny+=dir){
    const target=board[ny][x];
    if(target==='') moves.push({x, y:ny});
    else{
      if(isUpper? target===target.toLowerCase(): target===target.toUpperCase()) moves.push({x,y:ny});
      break;
    }
  }
  return moves;
};

const pawnMoves: MoveFunc = ({x,y},board,isUpper)=>{
  const moves: Position[]=[];
  const dir=isUpper?-1:1;
  const ny=y+dir;
  if(ny>=0 && ny<9){
    const target=board[ny][x];
    if(target==='' || (isUpper? target===target.toLowerCase(): target===target.toUpperCase())) moves.push({x, y:ny});
  }
  return moves;
};

const rookMoves: MoveFunc = ({x,y},board,isUpper)=>{
  const moves: Position[]=[];
  const dirs=[{dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:1},{dx:0,dy:-1}];
  for(const {dx,dy} of dirs){
    let nx=x+dx, ny=y+dy;
    while(nx>=0 && nx<9 && ny>=0 && ny<9){
      const target=board[ny][nx];
      if(target==='') moves.push({x:nx,y:ny});
      else{
        if(isUpper? target===target.toLowerCase(): target===target.toUpperCase()) moves.push({x:nx,y:ny});
        break;
      }
      nx+=dx; ny+=dy;
    }
  }
  return moves;
};

const bishopMoves: MoveFunc = ({x,y},board,isUpper)=>{
  const moves: Position[]=[];
  const dirs=[{dx:1,dy:1},{dx:-1,dy:1},{dx:1,dy:-1},{dx:-1,dy:-1}];
  for(const {dx,dy} of dirs){
    let nx=x+dx, ny=y+dy;
    while(nx>=0 && nx<9 && ny>=0 && ny<9){
      const target=board[ny][nx];
      if(target==='') moves.push({x:nx,y:ny});
      else{
        if(isUpper? target===target.toLowerCase(): target===target.toUpperCase()) moves.push({x:nx,y:ny});
        break;
      }
      nx+=dx; ny+=dy;
    }
  }
  return moves;
};

// --- 駒マップ ---
const pieceMoves: Record<string, MoveFunc> = {
  k: kingMoves, K: kingMoves,
  g: goldMoves, G: goldMoves,
  s: silverMoves, S: silverMoves,
  n: knightMoves, N: knightMoves,
  l: lanceMoves, L: lanceMoves,
  p: pawnMoves, P: pawnMoves,
  r: rookMoves, R: rookMoves,
  b: bishopMoves, B: bishopMoves,
};

// --- Hook ---
export function useShogi() {
  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState<Position | null>(null);
  const [legalMoves, setLegalMoves] = useState<Position[]>([]);
  const [hands, setHands] = useState<{[key:string]: number}>({}); // 持ち駒

  const getLegalMoves = (x: number, y: number) => {
    const piece = board[y][x];
    if(!piece) return [];
    const isUpper = piece===piece.toUpperCase();
    const fn = pieceMoves[piece];
    return fn ? fn({x,y},board,isUpper) : [];
  };

  const handleCellClick = (x: number, y: number) => {
    const cell = board[y][x];
    if(selected){
      if(legalMoves.some(pos => pos.x===x && pos.y===y)){
        const newBoard = board.map(r=>[...r]);
        // 取った駒は持ち駒に追加
        const captured = newBoard[y][x];
        if(captured){
          const cap = captured.toUpperCase()!==captured ? captured.toUpperCase() : captured.toLowerCase();
          setHands(prev => ({...prev, [cap]: (prev[cap]||0)+1}));
        }
        // 移動
        let movingPiece = newBoard[selected.y][selected.x];
        // 成り判定
        if(promotable[movingPiece] && (y<3 || selected.y<3)){ // 上側が成る
          movingPiece = promotable[movingPiece];
        }
        newBoard[y][x] = movingPiece;
        newBoard[selected.y][selected.x] = '';
        setBoard(newBoard);
        setSelected(null);
        setLegalMoves([]);
      } else {
        setSelected(null);
        setLegalMoves([]);
      }
    } else if(cell!==''){
      setSelected({x,y});
      setLegalMoves(getLegalMoves(x,y));
    }
  };

  const dropPiece = (piece: string, x:number, y:number) => {
    if(board[y][x] === '' && hands[piece]){
      const newBoard = board.map(r=>[...r]);
      newBoard[y][x] = piece.toLowerCase();
      setBoard(newBoard);
      setHands(prev=>({...prev,[piece]:prev[piece]-1}));
    }
  };

  return { board, selected, legalMoves, hands, handleCellClick, dropPiece };
}
