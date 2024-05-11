// Tarek Chaalan
// Tic Tac Toe Game
// CWID 885512020

import React, { useState, useEffect } from "react";
import { PvPIcon, PvCIcon } from "./SVGs";
import { findBestMove } from "./Minimax-Algorithm";

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null)); // 9 cells
  const [xIsNext, setXIsNext] = useState(true); // X goes first
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [isDraw, setIsDraw] = useState(false); // Draw state
  const [flashActive, setFlashActive] = useState(false); // Flashing state
  const [isPvP, setIsPvP] = useState(true); // Player vs Player [true] or Player vs Computer [false]
  const winInfo = calculateWinner(board); // Check if there is a winner
  const winner = winInfo.winner; // Winner

  // Check if there is a winner or a draw
  useEffect(() => {
    if (winner) {
      setScore((prevScore) => ({
        ...prevScore,
        [winner]: prevScore[winner] + 1,
      }));
      setIsDraw(false);
      setFlashActive(true);
    } else if (!winner && board.every((cell) => cell !== null)) {
      setIsDraw(true);
      setFlashActive(true);
    } else {
      setIsDraw(false);
      setFlashActive(false);
    }
  }, [board, winner]);

  // Computer's turn
  useEffect(() => {
    if (!isPvP && !xIsNext && !winner && !isDraw) {
      setTimeout(() => {
        // Delay the AI's move to make it more realistic
        const move = findBestMove(board);
        if (move != null) {
          const newBoard = [...board];
          newBoard[move] = "O";
          setBoard(newBoard);
          setXIsNext(true);
        }
      }, 500); // .5 secs
    }
  }, [xIsNext, board, isPvP, winner, isDraw]);

  // Handle player's turn
  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // Toggle between Player vs Player and Player vs Computer
  const toggleGameMode = () => {
    setIsPvP(!isPvP);
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  // Format the tally as 4 bars and the fifth being the line-through
  function formatTally(key) {
    const marks = score[key];
    let result = [];
    let group = "";
    let count = 0;

    for (let i = 1; i <= marks; i++) {
      if (count < 4) {
        // groups of four
        group += "|";
        count++;
      } else {
        result.push(
          <span style={{ textDecoration: "line-through" }}>{group}</span>
        ); // line-through to simulate the fifth bar
        result.push(" "); // space between groups
        group = "";
        count = 0;
      }
    }

    // If there are less than five bars left over, add them without line-through
    if (count > 0 && group.length > 0) {
      result.push(group);
    }

    return <div>{result}</div>;
  }

  // Calculate the winner
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return { winner: null, line: [] };
  }

  // Render the game
  return (
    <div className="App">
      <header className="game-info">
        <div className="tally x">
          <h2>
            X <span className="numeric-score">({score.X})</span>
          </h2>
          {formatTally("X")}
        </div>
        <div className="status">
          {winner
            ? `Winner: ${winner}`
            : isDraw
            ? "Draw"
            : `${xIsNext ? "X" : "O"}'s turn`}
        </div>
        <div className="tally o">
          <h2>
            O <span className="numeric-score">({score.O})</span>
          </h2>
          {formatTally("O")}
        </div>
      </header>
      <div className="board">
        {board.map((value, i) => (
          <button
            key={i}
            className={`square ${winInfo.line.includes(i) ? "highlight" : ""}`}
            onClick={() => handleClick(i)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="game-mode">
        <div onClick={toggleGameMode} style={{ cursor: "pointer" }}>
          {isPvP ? (
            <PvPIcon style={{ width: "70px", height: "70px" }} />
          ) : (
            <PvCIcon style={{ width: "70px", height: "70px" }} />
          )}
        </div>
      </div>
      <div className="buttons">
        <button
          className="reset"
          onClick={() => {
            setBoard(Array(9).fill(null));
            setScore({ X: 0, O: 0 });
            setXIsNext(true);
          }}
        >
          New Game
        </button>
        <button
          className={`next ${flashActive ? "flash-active" : ""}`}
          onClick={() => {
            setBoard(Array(9).fill(null));
            setIsDraw(false);
            setFlashActive(false);
          }}
        >
          Next Round
        </button>
      </div>
    </div>
  );
}

export default Game;
