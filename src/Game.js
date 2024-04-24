import React, { useState, useEffect } from "react";
import { PvPIcon, PvCIcon } from "./SVGs";
import { findBestMove } from "./Minimax-Algorithm";

// Tic Tac Toe Computer Algorithm Taken From:
// https://www.geeksforgeeks.org/finding-optimal-move-in-tic-tac-toe-using-minimax-algorithm-in-game-theory/?ref=ml_lbp
// Algorithm is unbeatable, you will only draw or lose against it
// Can be found in the Minimax-Algorithm.js file

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [isDraw, setIsDraw] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [isPvP, setIsPvP] = useState(true); // True if PvP, false if PvC
  const winInfo = calculateWinner(board);
  const winner = winInfo.winner;

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

  useEffect(() => {
    if (!isPvP && !xIsNext && !winner && !isDraw) {
      const move = findBestMove(board);
      if (move != null) {
        const newBoard = [...board];
        newBoard[move] = "O";
        setBoard(newBoard);
        setXIsNext(true);
      }
    }
  }, [xIsNext, board, isPvP, winner, isDraw]);

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const toggleGameMode = () => {
    setIsPvP(!isPvP);
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  function formatTally(key) {
    const marks = score[key];
    let result = [];
    let group = "";
    let count = 0;

    for (let i = 1; i <= marks; i++) {
      if (count < 4) {
        // Build up groups of four
        group += "|";
        count++;
      } else {
        result.push(
          <span style={{ textDecoration: "line-through" }}>{group}</span>
        );
        result.push(" ");
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: [] };
}

export default Game;
