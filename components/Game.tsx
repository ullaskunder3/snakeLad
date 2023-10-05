"use client"
import React, { useState } from 'react';
import Board from './Board';

const Game: React.FC = () => {
  const [playerPosition, setPlayerPosition] = useState(0);

  const handleRollDice = () => {
    const randomValue = Math.floor(Math.random() * 6) + 1;
    // Update player position based on the dice roll
    setPlayerPosition((prevPosition) =>
      Math.min(prevPosition + randomValue, 99)
    );
  };

  return (
    <div className="game">
      <h1>Grid Board Game</h1>
      <Board playerPosition={playerPosition} />
      <button onClick={handleRollDice}>Roll Dice</button>
    </div>
  );
};

export default Game;
