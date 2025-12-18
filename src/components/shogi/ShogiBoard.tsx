import { Position } from '@/hooks/shogi/types';
import { ShogiCell } from './ShogiCell';
import classes from '@/app/shogi/page.module.scss';

interface Props {
  board: string[][];
  selected: Position | null;
  legalMoves: Position[];
  onCellClick: (x: number, y: number) => void;
}

const KANJI_RANKS = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

export const ShogiBoard = ({
  board,
  selected,
  legalMoves,
  onCellClick,
}: Props) => {
  return (
    <div className={classes.shogi__wrapper}>
      {/* 上：筋（9〜1） */}
      <div className={classes.shogi__files}>
        {[...Array(9)].map((_, i) => (
          <div key={i} className={classes.shogi__file}>
            {9 - i}
          </div>
        ))}
      </div>

      <div className={classes.shogi__main}>
        {/* 盤面 */}
        <div className={classes.shogi__board}>
          {board.map((row, y) =>
            row.map((piece, x) => (
              <ShogiCell
                key={`${x}-${y}`}
                x={x}
                y={y}
                piece={piece}
                selected={selected}
                legal={legalMoves.some(p => p.x === x && p.y === y)}
                onClick={onCellClick}
              />
            ))
          )}
        </div>

        {/* 右：段（漢数字） */}
        <div className={classes.shogi__ranks}>
          {KANJI_RANKS.map((k, i) => (
            <div key={i} className={classes.shogi__rank}>
              {k}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};