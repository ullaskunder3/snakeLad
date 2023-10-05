"use client"
import React from 'react';

const Board = ({ player1Position, player2Position, snakes, ladders }:any) => {
  const renderCells = () => {
    const cells = [];
    for (let i = 100; i >= 1; i--) {
      const isPlayer1Here = player1Position === i;
      const isPlayer2Here = player2Position === i;
      const isSnakeBite = snakes[i];
      const isLadder = ladders[i];
      

      let cellClass = 'cell';

      if (isPlayer1Here && isPlayer2Here) {
        cellClass += ' player1-and-player2';
      } else if (isPlayer1Here) {
        cellClass += ' player1';
      } else if (isPlayer2Here) {
        cellClass += ' player2';
      }
      

      if (isSnakeBite || isLadder) {
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
