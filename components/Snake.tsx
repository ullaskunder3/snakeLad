"use client";

import React, { useState, useEffect } from "react";
import Board from "./Board";

const SNAKES: any = {
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

const LADDERS: any = {
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

const SnakeAndLadder = () => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Position, setPlayer1Position] = useState(0);
  const [player2Position, setPlayer2Position] = useState(0);
  const [diceValue, setDiceValue] = useState(0);

  const playerTurnText = [
    "Your turn.",
    "Go.",
    "Please proceed.",
    "Lets win this.",
    "Are you ready?",
    "",
  ];

  const snakeBite: any = ["boohoo", "bummer", "snake bite", "oh no", "dang"];

  const ladderJump: any = [
    "woohoo",
    "woww",
    "nailed it",
    "oh my God...",
    "yaayyy",
  ];

  useEffect(() => {
    if (player1Position >= 100 || player2Position >= 100) {
      alert(`${currentPlayer === 1 ? player1Name : player2Name} won the game!`);
      resetGame();
    }
  }, [
    player1Position,
    player2Position,
    currentPlayer,
    player1Name,
    player2Name,
  ]);

  const resetGame = () => {
    setPlayer1Name("");
    setPlayer2Name("");
    setPlayer1Position(0);
    setPlayer2Position(0);
    setCurrentPlayer(1);
  };

  const rollDice = () => {
    const randomValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(randomValue);

    const newPosition =
      currentPlayer === 1
        ? player1Position + randomValue
        : player2Position + randomValue;

    if (currentPlayer === 1) {
      setPlayer1Position(newPosition);
    } else {
      setPlayer2Position(newPosition);
    }

    if (SNAKES[newPosition]) {
      const snakeBiteMsg =
        snakeBite[Math.floor(Math.random() * snakeBite.length)];
      alert(`Snake bite! ${snakeBiteMsg}`);
      if (currentPlayer === 1) {
        setPlayer1Position(SNAKES[newPosition]);
      } else {
        setPlayer2Position(SNAKES[newPosition]);
      }
    } else if (LADDERS[newPosition]) {
      const ladderJumpMsg =
        ladderJump[Math.floor(Math.random() * ladderJump.length)];
      alert(`Climbed a ladder! ${ladderJumpMsg}`);
      if (currentPlayer === 1) {
        setPlayer1Position(LADDERS[newPosition]);
      } else {
        setPlayer2Position(LADDERS[newPosition]);
      }
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  return (
    <div>
      <h1>Snake and Ladder Game</h1>
      <div>
        <label>Player 1 Name:</label>
        <input
          type="text"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
        />
      </div>
      <div>
        <label>Player 2 Name:</label>
        <input
          type="text"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
        />
      </div>
      <div>
        <button onClick={rollDice}>Roll Dice</button>
      </div>
      <div>
        <p>{currentPlayer === 1 ? player1Name : player2Name} s turn.</p>
        <p>Dice Roll: {diceValue}</p>
        <p>
          {player1Name}: {player1Position}
        </p>
        <p>
          {player2Name}: {player2Position}
        </p>
      </div>
      <Board
        player1Position={player1Position}
        player2Position={player2Position}
        snakes={SNAKES} // Pass the snakes object here
        ladders={LADDERS} // Pass the ladders object here
      />
    </div>
  );
};

export default SnakeAndLadder;
