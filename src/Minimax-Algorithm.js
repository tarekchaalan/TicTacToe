export function findBestMove(board) {
  let bestVal = -Infinity;
  let bestMove = -1;
  const player = "O";

  // Iterate over all cells to find the best move
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = player; // AI makes its move
      let moveVal = minimax(board, 0, false); // AI is maximizing
      board[i] = null; // Undo the move

      if (moveVal > bestVal) {
        bestVal = moveVal;
        bestMove = i; // Keep the best move
      }
    }
  }
  return bestMove;
}

export function evaluate(board) {
  const player = "O"; // AI's symbol
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
      return board[a] === player ? 10 : -10;
    }
  }
  return 0;
}

export function minimax(board, depth, isMax) {
  let score = evaluate(board);
  const player = "O";
  const opponent = "X";

  // Check if someone has won or if there are no moves left
  if (score !== 0 || !board.includes(null)) return score;

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = player;
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = opponent;
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i] = null;
      }
    }
    return best;
  }
}
