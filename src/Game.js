import React, { useState, useEffect } from "react";

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [isDraw, setIsDraw] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const winInfo = calculateWinner(board);
  const winner = winInfo.winner;

  useEffect(() => {
    const winInfo = calculateWinner(board);
    const winner = winInfo.winner;

    if (winner) {
      setScore((prevScore) => ({
        ...prevScore,
        [winner]: prevScore[winner] + 1,
      }));
      setIsDraw(false); // Reset draw state if there's a winner
      setFlashActive(true);
    } else if (!winner && board.every((cell) => cell !== null)) {
      setIsDraw(true);
      setFlashActive(true);
    } else {
      setIsDraw(false);
      setFlashActive(false);
    }
  }, [board]); // Dependency on board only as winner is derived from it

  const handleClick = (i) => {
    if (board[i] || calculateWinner(board).winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleNextRoundClick = () => {
    setBoard(Array(9).fill(null));
    setIsDraw(false);
    setFlashActive(false);
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
        // After four, add the fifth as a diagonal strike-through
        result.push(
          <span style={{ textDecoration: "line-through" }}>
            {group}
          </span>
        );
        result.push(" "); // Add space after the striked group
        group = ""; // Reset for next group
        count = 0; // Reset count
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
          <div>{formatTally("X")}</div>
        </div>
        <div className="status">
          {calculateWinner(board).winner
            ? `Winner: ${calculateWinner(board).winner}`
            : isDraw
            ? "Draw"
            : `${xIsNext ? "X" : "O"}'s turn`}
        </div>
        <div className="tally o">
          <h2>
            O <span className="numeric-score">({score.O})</span>
          </h2>
          <div>{formatTally("O")}</div>
        </div>
      </header>
      <div className="board">
        {board.map((value, i) => (
          <button
            key={i}
            className={`square ${
              calculateWinner(board).line.includes(i) ? "highlight" : ""
            }`}
            onClick={() => handleClick(i)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="buttons">
        <button
          className="reset"
          onClick={() =>
            setBoard(
              Array(9).fill(null),
              setScore({ X: 0, O: 0 }),
              setXIsNext(true)
            )
          }
        >
          New Game
        </button>
        <button
          className={`next ${flashActive ? "flash-active" : ""}`}
          onClick={handleNextRoundClick}
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
