"use client"
import React from 'react';

const Board = ({ playerPositions, snakes, ladders, numPlayers, playerColors }:any) => {
  const renderCell = (cellNumber:any) => {
    const isSnake = snakes[cellNumber];
    const isLadder = ladders[cellNumber];

    return (
      <div
        key={cellNumber}
        className={`cell ${isSnake ? "snake" : ""} ${isLadder ? "ladder" : ""}`}
      >
        {cellNumber}
        {playerPositions.map((position:any, index:any) => {
          if (position === cellNumber) {
            const playerClass = `player-${index + 1}`;  const playerTurnText = ["Your turn.", "Go.", "Please proceed.", "Let's win this.", "Are you ready?", ""];
            return (
              <div
                key={index}
                className={playerClass}
                style={{
                  backgroundColor:
                    numPlayers >= index + 1 ? playerColors[index] : "transparent",
                }}
              >
                {index + 1}
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return <div className="board">{Array.from({ length: 100 }, (_, i) => renderCell(i + 1))}</div>;
};

export default Board;
