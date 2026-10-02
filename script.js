const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const restartBtn = document.getElementById('restartBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let scores = {
    X: 0,
    O: 0
};

function updateScoreboard() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

function setStatus(message) {
    statusText.textContent = message;
}

function checkWinner() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
}

function endGame(winner) {
    gameActive = false;

    if (winner) {
        scores[winner] += 1;
        updateScoreboard();
        setStatus(`Player ${winner} wins!`);
    } else {
        setStatus("It's a draw!");
    }

    cells.forEach((cell) => {
        cell.disabled = true;
    });
}

function handleCellClick(event) {
    const cell = event.target;
    const index = Number(cell.dataset.index);

    if (!gameActive || board[index] || cell.disabled) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.disabled = true;

    const winner = checkWinner();

    if (winner) {
        endGame(winner);
        return;
    }

    if (board.every((value) => value !== '')) {
        endGame(null);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setStatus(`Player ${currentPlayer}'s Turn`);
}

function restartGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;

    cells.forEach((cell) => {
        cell.textContent = '';
        cell.disabled = false;
    });

    setStatus("Player X's Turn");
}

function resetScore() {
    scores = { X: 0, O: 0 };
    updateScoreboard();
    restartGame();
}

cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', restartGame);
resetScoreBtn.addEventListener('click', resetScore);

updateScoreboard();
setStatus("Player X's Turn");
