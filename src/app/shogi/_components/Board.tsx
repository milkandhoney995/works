import classes from '@/app/shogi/page.module.scss';
import Cell from './Cell';
import { Position } from '@/features/shogi';

interface Props {
  board: string[][];
  selected: Position | null;
  legalMoves: Position[];
  onCellClick: (x: number, y: number) => void;
  isInCheck: boolean;
  kingPosition: Position | null;
}

const KANJI_RANKS = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

const Board = ({
  board,
  selected,
  legalMoves,
  onCellClick,
  isInCheck,
  kingPosition,
}: Props) => {
  return (
    <div className={classes.shogi__wrapper}>
      {/* 上：筋（9〜1） */}
      <div className={classes.shogi__files}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={classes.shogi__file}>
            {9 - i}
          </div>
        ))}
      </div>

      <div className={classes.shogi__main}>
        {/* 盤面 */}
        <div className={classes.shogi__board}>
          {board.map((row, y) =>
            row.map((piece, x) => {
              const isLegalMove = legalMoves.some(
                (p) => p.x === x && p.y === y
              );

              const isCheckedKing =
                isInCheck &&
                kingPosition?.x === x &&
                kingPosition?.y === y;

              return (
                <Cell
                  key={`${x}-${y}`}
                  x={x}
                  y={y}
                  piece={piece}
                  isSelected={selected?.x === x && selected?.y === y}
                  legal={isLegalMove}
                  isCheckedKing={isCheckedKing}
                  onClick={onCellClick}
                />
              );
            })
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

export default Board;