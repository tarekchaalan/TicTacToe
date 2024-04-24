import React, { useState, useEffect } from "react";

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
  };

  function formatTally(key) {
    const marks = score[key];
    let result = [];
    let group = "";
    let count = 0;

    for (let i = 1; i <= marks; i++) {
      if (count < 4) {
        group += "|";
        count++;
      } else {
        result.push(
          <span style={{ textDecoration: "line-through" }}>{group}</span>
        );
        result.push(" ");
        group = "|";
        count = 1;
      }
    }
    if (group.length > 0) {
      result.push(group);
    }
    return <div>{result}</div>;
  }

  return (
    <div className="App">
      <header className="game-info">
        <div onClick={toggleGameMode} style={{ cursor: "pointer" }}>
          {isPvP ? (
            <img src="./svgs/PvP.svg" alt="PvP Mode" />
          ) : (
            <img src="./svgs/PvC.svg" alt="PvC Mode" />
          )}
        </div>
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

function findBestMove(board) {
  let bestVal = -1000;
  let bestMove = -1;
  let tempBoard = [
    [board[0], board[1], board[2]],
    [board[3], board[4], board[5]],
    [board[6], board[7], board[8]],
  ];

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = "O";
      let moveVal = minimax(tempBoard, 0, false);
      board[i] = null;
      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }
  return bestMove;
}

function isMovesLeft(board) {
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) return true;
  }
  return false;
}

function evaluate(board) {
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
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      if (board[a] === "X") {
        return 10;
      } else if (board[a] === "O") {
        return -10;
      }
    }
  }
  return 0;
}

function minimax(board, depth, isMax) {
  let score = evaluate(board);
  if (score !== 0) return score;
  if (!isMovesLeft(board)) return 0;

  if (isMax) {
    let best = -1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X";
        best = Math.max(best, minimax(board, depth + 1, !isMax));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = 1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        best = Math.min(best, minimax(board, depth + 1, !isMax));
        board[i] = null;
      }
    }
    return best;
  }
}

export default Game;
