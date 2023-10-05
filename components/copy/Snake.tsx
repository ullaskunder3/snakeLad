// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import Board from "./Board";

const SnakeAndLadder = () => {
  const [playerNames, setPlayerNames] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [playerPositions, setPlayerPositions] = useState([]);
  const [diceValue, setDiceValue] = useState(0);

  const playerTurnText = [
    'Your turn.',
    'Go.',
    'Please proceed.',
    'Let\'s win this.',
    'Are you ready?',
    '',
  ];

  const snakes:any = {
    8: 4,
    18: 1,
    26: 10,
    39: 5,
    51: 6,
    54: 36,
    56: 1,
    60: 23,
    75: 28,
    83: 45,
    85: 59,
    90: 48,
    92: 25,
    97: 87,
    99: 63,
  };
  
  const ladders:any = {
    3: 20,
    6: 14,
    11: 28,
    15: 34,
    17: 74,
    22: 37,
    38: 59,
    49: 67,
    57: 76,
    61: 78,
    73: 86,
    81: 98,
    88: 91,
  };

  const rollDice = () => {
    const randomValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(randomValue);

    const newPosition = playerPositions[currentPlayerIndex] + randomValue;

    if (newPosition in snakes) {
      alert('Snake bite!');
      setPlayerPositions(playerPositions =>
        playerPositions.map((position, index) =>
          index === currentPlayerIndex ? snakes[newPosition] : position
        )
      );
    } else if (newPosition in ladders) {
      alert('Climbed a ladder!');
      setPlayerPositions(playerPositions =>
        playerPositions.map((position, index) =>
          index === currentPlayerIndex ? ladders[newPosition] : position
        )
      );
    } else {
      setPlayerPositions(playerPositions =>
        playerPositions.map((position, index) =>
          index === currentPlayerIndex ? newPosition : position
        )
      );
    }

    setCurrentPlayerIndex(currentPlayerIndex === playerNames.length - 1 ? 0 : currentPlayerIndex + 1);
  };

  return (
    <div>
      <h1>Snake and Ladder Game</h1>
      <div>
        <label>Number of Players:</label>
        <input
          type="number"
          min="1"
          max="4"
          value={playerNames.length}
          onChange={(e) => {
            const numPlayers = parseInt(e.target.value);
            setPlayerNames(new Array(numPlayers).fill('').map((_, i) => `Player ${i + 1}`));
            setPlayerPositions(new Array(numPlayers).fill(0));
          }}
        />
      </div>
      {playerNames.map((playerName, index) => (
        <div key={index}>
          <label>{playerName} Name:</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) =>
              setPlayerNames((playerNames) =>
                playerNames.map((name, i) => (i === index ? e.target.value : name))
              )
            }
          />
        </div>
      ))}
      <div>
        <button onClick={rollDice}>Roll Dice</button>
      </div>
      <div>
        <p>{playerNames[currentPlayerIndex]} turn.</p>
        <p>Dice Roll: {diceValue}</p>
        {playerNames.map((playerName, index) => (
          <p key={index}>
            {playerName}: {playerPositions[index]}
          </p>
        ))}
      </div>
      <Board
        playerPositions={playerPositions}
        snakes={snakes}
        ladders={ladders}
        playerCount={playerNames.length}
      />
    </div>
  );
};

export default SnakeAndLadder;
