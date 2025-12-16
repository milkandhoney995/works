import { Position } from '@/hooks/shogi/types';
import { ShogiCell } from './ShogiCell';
import classes from '@/app/shogi/page.module.scss';

interface Props {
  board: string[][];
  selected: Position | null;
  legalMoves: Position[];
  onCellClick: (x: number, y: number) => void;
}

export const ShogiBoard = ({
  board,
  selected,
  legalMoves,
  onCellClick,
}: Props) => {
  return (
    <div className={classes.shogi__board}>
      {board.map((row, y) => (
        <div key={y} className={classes.shogi__row}>
          {row.map((piece, x) => (
            <ShogiCell
              key={x}
              x={x}
              y={y}
              piece={piece}
              selected={selected}
              legal={legalMoves.some(p => p.x === x && p.y === y)} // 合法手かどうか
              onClick={onCellClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};