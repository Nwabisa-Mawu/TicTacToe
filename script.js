/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable linebreak-style */
document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const resetButton = document.getElementById('resetButton');
  const resultScreen = document.getElementById('resultScreen');
  const resultMessage = document.getElementById('resultMessage');
  const playAgainButton = document.getElementById('playAgainButton');
  const cells = [];

  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];

  function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((cell, index) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.textContent = cell;
      cellElement.addEventListener('click', () => handleCellClick(index));
      board.appendChild(cellElement);
      cells.push(cellElement);
    });
  }

  function handleCellClick(index) {
    if (gameBoard[index] !== '' || checkWinner()) return;
    gameBoard[index] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
      showResult(`${currentPlayer} wins!`);
    } else if (gameBoard.every((cell) => cell !== '')) {
      showResult('It\'s a draw!');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  function checkWinner() {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some((condition) => {
      const [a, b, c] = condition;
      return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
  }

  function showResult(message) {
    resultMessage.textContent = message;
    resultScreen.style.display = 'flex';
  }

  function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
    resultScreen.style.display = 'none';
  }

  renderBoard();
  resetButton.addEventListener('click', resetGame);
  playAgainButton.addEventListener('click', resetGame);
});
