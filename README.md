# Tic Tac Toe

### [For quick access, game is already hosted using Vercel](https://tic-tac-toe-zeta-two-20.vercel.app/)

### Running the Game

- Make sure you have [Node.js](https://nodejs.org/) installed.

To install and run the game with one command, use:
```
git clone https://github.com/tarekchaalan/TicTacToe.git && cd TicTacToe && npm install && npm start
```
  
If you want to do it step-by-step, 
- Open your terminal and Clone the repository.

```bash
git clone https://github.com/tarekchaalan/TicTacToe.git
```

- Navigate to the project directory using:

```bash
cd TicTacToe
```

- Install Dependencies using:

```bash
npm install
```

- Start the game by running:

```bash
npm start
```

This will open the game in your default web browser in localhost. 

### Main Features

- **Two Modes of Play:** Choose between Player vs. Player (PvP) and Player vs. Computer (PvC). The computer's moves are calculated using an unbeatable Minimax algorithm, source code taken from [here](https://www.geeksforgeeks.org/finding-optimal-move-in-tic-tac-toe-using-minimax-algorithm-in-game-theory/?ref=ml_lbp).
- **Dynamic Score Tally:** Scores are updated with a visual representation using tally marks grouped in fives for easy reading, but I also included numeric values for easier reading.
- **Interactive Board:** Click on any square to make a move. The game highlights the winning combination green if a player wins.
- **Responsive Design:** The game layout adjusts to different screen sizes, ensuring a good playing experience on desktops, mobiles, and tablets.
- **Flashy UI Elements:** Visual feedback through flashing effects when the round ends, indicating a win, loss, or draw.
- **Easy Game Reset:** Buttons allow resetting the entire game or starting a new round without refreshing the browser.
