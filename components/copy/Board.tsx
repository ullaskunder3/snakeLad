"use client";
import React from 'react';

const Board = ({ playerPositions, snakes, ladders, playerCount }:any) => {
  const renderCells = () => {
    const cells = [];
    for (let i = 100; i >= 1; i--) {
      const playersInCell = playerPositions.reduce(
        (count:any, position:any) => (position === i ? count + 1 : count),
        0
      );

      let cellClass = 'cell';

      if (playersInCell > 1) {
        cellClass += ` multi-player multi-player-${playersInCell}`;
      } else if (playersInCell === 1) {
        cellClass += ` player-${playerPositions.findIndex(
          (position:any) => position === i
        ) + 1}`;
      }

      if (snakes[i] || ladders[i]) {
        cellClass += ' special-cell';
      }

      cells.push(
        <div key={i} className={cellClass}>
          {i}
        </div>
      );
    }
    return cells;
  };

  return <div className="board">{renderCells()}</div>;
};

export default Board;
