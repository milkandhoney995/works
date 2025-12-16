'use client';
import classes from './page.module.scss';
import { useShogi, pieceMap } from '@/hooks/useShogi';

const Shogi = () => {
  const { board, selected, legalMoves, handleCellClick } = useShogi();

  return (
    <div className={classes.shogi}>
      <h1 className={classes.shogi__title}>Shogi App</h1>
      <div className={classes.shogi__board}>
        {board.map((row, y) => (
          <div key={y} className={classes.shogi__row}>
            {row.map((cell, x) => (
              <div
                key={x}
                className={`${classes.shogi__cell}
                  ${selected?.x === x && selected?.y === y ? classes.selected : ''}
                  ${legalMoves.some(pos => pos.x === x && pos.y === y) ? classes.legal : ''}`}
                onClick={() => handleCellClick(x, y)}
              >
                {pieceMap[cell]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Shogi;