"use client";
// import React from 'react';

// const Board = ({ playerPositions, snakes, ladders, numPlayers, playerColors }:any) => {
//   const renderCell = (cellNumber:any) => {
//     const isSnake = snakes[cellNumber];
//     const isLadder = ladders[cellNumber];

//     return (
//       <div
//         key={cellNumber}
//         className={`cell ${isSnake ? "snake" : ""} ${isLadder ? "ladder" : ""}`}
//       >
//         {cellNumber}
//         {playerPositions.map((position:any, index:any) => {
//           if (position === cellNumber) {
//             const playerClass = `player-${index + 1}`;  const playerTurnText = ["Your turn.", "Go.", "Please proceed.", "Let's win this.", "Are you ready?", ""];
//             return (
//               <div
//                 key={index}
//                 className={playerClass}
//                 style={{
//                   backgroundColor:
//                     numPlayers >= index + 1 ? playerColors[index] : "transparent",
//                 }}
//               >
//                 {index + 1}
//               </div>
//             );
//           }
//           return null;
//         })}
//       </div>
//     );
//   };

//   return <div className="board">{Array.from({ length: 100 }, (_, i) => renderCell(i + 1))}</div>;
// };

// export default Board;
// --------------------------------------
import React from "react";

const Board = ({
  playerPositions,
  snakes,
  ladders,
  numPlayers,
  playerColors,
}: any) => {
  const renderCell = (cellNumber: any) => {
    const isSnake = snakes[cellNumber];
    const isLadder = ladders[cellNumber];
  
    const playerPositionsInCell = playerPositions
      .map((position: any, index: any) => {
        if (position === cellNumber) {
          return {
            playerClass: `player-${index + 1}`,
            playerNumber: index + 1, // Add a unique player number property
            backgroundColor: numPlayers >= index + 1 ? playerColors[index] : "transparent",
          };
        }
        return null;
      })
      .filter((playerPosition: any) => playerPosition !== null);
  
    return (
      <div
        key={cellNumber}
        className={`cell ${isSnake ? "snake" : ""} ${isLadder ? "ladder" : ""}`}
      >
        {cellNumber}
        {playerPositionsInCell.map((playerPosition: any, index: any) => (
          <div
            key={index}
            className={playerPosition.playerClass}
            style={{
              backgroundColor: playerPosition.backgroundColor,
              left: index === 0 ? "0" : index === 1 ? "auto" : "",
              right: index === 1 ? "0" : index === 2 ? "auto" : "",
              top: index === 2 ? "0" : index === 3 ? "auto" : "",
              bottom: index === 3 ? "0" : "",
            }}
          >
            {playerPosition.playerNumber} {/* Display unique player number */}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="board">
      {Array.from({ length: 100 }, (_, i) => renderCell(i + 1))}
    </div>
  );
};

export default Board;
