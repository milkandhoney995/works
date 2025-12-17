import { Position } from "./types";

export type MoveFunc = (pos: Position, board: string[][], isUpper: boolean) => Position[];

// --- 移動ルール（簡易版：合法手） ---
// 王の移動
export const kingMoves: MoveFunc = ({x, y}, board, isUpper) => {
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

//　金の移動
export const goldMoves: MoveFunc = ({x, y}, board, isUpper) => {
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

// 銀・桂・香・角・飛・歩の移動
export const silverMoves: MoveFunc = ({x, y}, board, isUpper) => {
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

export const knightMoves: MoveFunc = ({x, y}, board, isUpper) => {
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

export const lanceMoves: MoveFunc = ({x, y}, board, isUpper) => {
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

export const pawnMoves: MoveFunc = ({x,y},board,isUpper)=>{
  const moves: Position[]=[];
  const dir=isUpper?-1:1;
  const ny=y+dir;
  if(ny>=0 && ny<9){
    const target=board[ny][x];
    if(target==='' || (isUpper? target===target.toLowerCase(): target===target.toUpperCase())) moves.push({x, y:ny});
  }
  return moves;
};

export const rookMoves: MoveFunc = ({x,y},board,isUpper)=>{
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

export const bishopMoves: MoveFunc = ({x,y},board,isUpper)=>{
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

// 成り駒の移動（王＋角、王＋飛）
export const bishopMovesWithKingLike: MoveFunc = (pos, board, isUpper) => {
  const moves = bishopMoves(pos, board, isUpper);
  moves.push(...kingMoves(pos, board, isUpper));
  return moves;
};

// 成り駒の移動（王＋飛）
export const rookMovesWithKingLike: MoveFunc = (pos, board, isUpper) => {
  const moves = rookMoves(pos, board, isUpper);
  moves.push(...kingMoves(pos, board, isUpper));
  return moves;
};


// --- 駒マップ ---
export const pieceMoves: Record<string, MoveFunc> = {
  k: kingMoves, K: kingMoves,
  g: goldMoves, G: goldMoves,
  s: silverMoves, S: silverMoves,
  n: knightMoves, N: knightMoves,
  l: lanceMoves, L: lanceMoves,
  p: pawnMoves, P: pawnMoves,
  r: rookMoves, R: rookMoves,
  b: bishopMoves, B: bishopMoves,
  '+s': goldMoves, '+n': goldMoves, '+l': goldMoves, '+b': bishopMovesWithKingLike, '+r': rookMovesWithKingLike,
};