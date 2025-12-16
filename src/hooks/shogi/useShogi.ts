'use client';

import { useState } from 'react';
import { initialBoard } from './board';
import { pieceMap, promotable } from './pieces';
import { kingMoves, goldMoves, MoveFunc, pieceMoves } from './moveRules';
import { inEnemyCamp } from './helpers';
import { Position } from './types';


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
