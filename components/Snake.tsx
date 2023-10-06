"use client";

import React, { useState, useEffect } from "react";
import Board from "./Board";
import { clearGameState, loadGameState, saveGameState } from "./storage";

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
  const [numPlayers, setNumPlayers] = useState(0);
  const [playerNames, setPlayerNames] = useState<Array<string>>([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerPositions, setPlayerPositions] = useState<Array<number>>([]);
  const [diceValue, setDiceValue] = useState(0);
  const [isRollDiceDisabled, setIsRollDiceDisabled] = useState(true);
  const playerColors = ["red", "yellow", "green", "blue"].slice(0, numPlayers);

  const snakeBite: any = ["boohoo", "bummer", "snake bite", "oh no", "dang"];

  const GAME_STATE_KEY = "snakeAndLadderGameState"; // Key for local storage

  const ladderJump: any = [
    "woohoo",
    "woww",
    "nailed it",
    "oh my God...",
    "yaayyy",
  ];

  useEffect(() => {
    // Load game state from local storage when component mounts
    const savedGameState = loadGameState(GAME_STATE_KEY);
    if (savedGameState) {
      setNumPlayers(savedGameState.numPlayers);
      setPlayerNames(savedGameState.playerNames);
      setPlayerPositions(savedGameState.playerPositions);
      setCurrentPlayer(savedGameState.currentPlayer);
      setDiceValue(savedGameState.diceValue);
      setIsRollDiceDisabled(savedGameState.isRollDiceDisabled);
    }

    return () => {
      // Clear game state from local storage when component unmounts
      clearGameState(GAME_STATE_KEY);
    };
  }, []);

  useEffect(() => {
    saveGameState(GAME_STATE_KEY, {
      numPlayers,
      playerNames,
      playerPositions,
      currentPlayer,
      diceValue,
      isRollDiceDisabled,
    });
    if (playerPositions.some((position) => position >= 100)) {
      alert(`${playerNames[currentPlayer - 1]} won the game!`);
      resetGame();
      clearGameState(GAME_STATE_KEY);
    }
  }, [playerPositions, currentPlayer, playerNames, numPlayers, diceValue, isRollDiceDisabled]);

  const resetGame = () => {
    setPlayerNames([]);
    setPlayerPositions([]);
    setCurrentPlayer(1);
    setDiceValue(0);
  };

  const rollDice = () => {
    const randomValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(randomValue);

    const newPosition = playerPositions[currentPlayer - 1] + randomValue;
    const newPlayerPositions = [...playerPositions];
    newPlayerPositions[currentPlayer - 1] = newPosition;

    if (newPosition in SNAKES) {
      const snakeBiteMsg =
        snakeBite[Math.floor(Math.random() * snakeBite.length)];
      alert(`${playerNames[currentPlayer - 1]} Snake bite! ${snakeBiteMsg}`);
      newPlayerPositions[currentPlayer - 1] = SNAKES[newPosition];
    } else if (newPosition in LADDERS) {
      const ladderJumpMsg =
        ladderJump[Math.floor(Math.random() * ladderJump.length)];
      alert(`${playerNames[currentPlayer - 1]} Climbed a ladder! ${ladderJumpMsg}`);
      newPlayerPositions[currentPlayer - 1] = LADDERS[newPosition];
    }

    setPlayerPositions(newPlayerPositions);
    setCurrentPlayer((currentPlayer % numPlayers) + 1);
  };

  const handleNumPlayersChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const num = parseInt(event.target.value);
    setNumPlayers(num);
    setPlayerNames(Array(num).fill(""));
    setPlayerPositions(Array(num).fill(0));
    setIsRollDiceDisabled(false);
  };

  const renderPlayerInputs = () => {
    return (
      <div>
        {Array.from({ length: numPlayers }).map((_, index) => (
          <div key={index} className="flex items-center justify-between space-x-2 mb-2">
            <label className="">
              Player {index + 1} Name:
            </label>
            <input
              className="h-10 w-full rounded-md bg-blue-400/20 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
              type="text"
              value={playerNames[index] || ""}
              onChange={(e) => {
                const newPlayerNames = [...playerNames];
                newPlayerNames[index] = e.target.value;
                setPlayerNames(newPlayerNames);
                setIsRollDiceDisabled(newPlayerNames.includes(""));
              }}
            />
          </div>
        ))}
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={rollDice}
            disabled={isRollDiceDisabled}
          >
            Roll Dice
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="main h-[90vh] flex items-center justify-evenly">
      <div className="px-4">
        <div className="flex items-center">
          <label className="mr-2 py-5">Select Number of Players (1-4):</label>
          <input
            className="outline-1 outline outline-blue-400 py-1 w-20"
            type="number"
            min="1"
            max="4"
            value={numPlayers}
            onChange={handleNumPlayersChange}
          />
        </div>

        {numPlayers > 0 && renderPlayerInputs()}
        <div>
          <div className="flex justify-between">
            <div>
            <p className="py-3">
              {playerNames[currentPlayer - 1] &&
                `${playerNames[currentPlayer - 1]}'s trurn`}{" "}
            </p>
            <p>Dice Roll: {diceValue}</p>
            </div>
            <div>
              {playerNames.map(
                (name, index) =>
                  name && (
                    <p key={index}>
                      {playerColors[index].charAt(0).toUpperCase()}-{name}: {playerPositions[index]}
                    </p>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
      <Board
        playerPositions={playerPositions}
        snakes={SNAKES}
        ladders={LADDERS}
        numPlayers={numPlayers}
        playerColors={playerColors}
      />
    </div>
  );
};

export default SnakeAndLadder;
