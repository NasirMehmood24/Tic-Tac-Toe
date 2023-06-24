let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function makeMove(cellIndex) {
  if (board[cellIndex] === "" && gameActive) {
    board[cellIndex] = currentPlayer;
    document.getElementsByClassName("cell")[cellIndex].textContent = currentPlayer;
    document.getElementsByClassName("cell")[cellIndex].classList.add(currentPlayer);
    document.getElementsByClassName("cell")[cellIndex].classList.add("win-animation");
    checkResult();
    togglePlayer();
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkResult() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      endGame(board[a], [a, b, c]);
      break;
    }
    if (!board.includes("")) {
      endGame("draw", null);
    }
  }
}

function endGame(result, winningCombination) {
  gameActive = false;
  let message = "";
  if (result === "draw") {
    message = "It's a draw!";
  } else {
    message = `${result} wins!`;
    highlightWinningCombination(winningCombination);
  }
  document.getElementById("result").textContent = message;
}

function highlightWinningCombination(winningCombination) {
  if (winningCombination) {
    for (let i = 0; i < winningCombination.length; i++) {
      const cellIndex = winningCombination[i];
      document.getElementsByClassName("cell")[cellIndex].classList.add("win-animation");
    }
  }
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("result").textContent = "";
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
    cells[i].classList.remove("X");
    cells[i].classList.remove("O");
    cells[i].classList.remove("win-animation");
  }
}
