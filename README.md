# Tic Tac Toe

## Running the Game

### 1. Setup:

Make sure you have [Node.js](https://nodejs.org/) installed.

### 2. Installation:

Clone the repository.

```bash
git clone https://github.com/tarekchaalan/TicTacToe.git
```

    Open your terminal/cmd, navigate to the project directory using:

```bash
cd TicTacToe
```

    Install Dependencies Using:

```bash
npm install
```

### 3. Start the Game:

    In the same directory, start the game by running:

```bash
npm start
```

This will open the game in your default web browser in localhost.

## Main Features

- **Two Modes of Play:** Choose between Player vs. Player (PvP) and Player vs. Computer (PvC). The computer's moves are calculated using an unbeatable Minimax algorithm, source code taken from [here](https://www.geeksforgeeks.org/finding-optimal-move-in-tic-tac-toe-using-minimax-algorithm-in-game-theory/?ref=ml_lbp).
- **Dynamic Score Tally:** Scores are updated with a visual representation using tally marks grouped in fives for easy reading, but I also included numeric values for easier reading.
- **Interactive Board:** Click on any square to make a move. The game highlights the winning combination green if a player wins.
- **Responsive Design:** The game layout adjusts to different screen sizes, ensuring a good playing experience on desktops, mobiles, and tablets.
- **Flashy UI Elements:** Visual feedback through flashing effects when the round ends, indicating a win, loss, or draw.
- **Easy Game Reset:** Buttons allow resetting the entire game or starting a new round without refreshing the browser.
