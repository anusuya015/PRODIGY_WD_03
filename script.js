const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset-button");

let currentPlayer = "X";
let isGameActive = true;

// Winning combinations
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Handle player's move
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.id);

    if (cell.textContent || !isGameActive) return;

    cell.textContent = currentPlayer;
    cell.style.backgroundColor= currentPlayer === "X" ? '#dac292' : 'white';

    if (checkWin(currentPlayer)) {
        message.innerText = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (isBoardFull()) {
        message.innerText = "It's a draw!";
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.innerText = `${currentPlayer}'s turn`;
        if (currentPlayer === "O" && isGameActive) {
            setTimeout(makeAIMove, 1000);
        }
    }
}

// Handle AI's move (simplified)
function makeAIMove() {
    if (!isGameActive) return;

    let emptyCells = [...cells].filter((cell) => !cell.textContent);
    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    handleCellClick({ target: emptyCells[randomIndex] });
}

// Check for a win
function checkWin(player) {
    for (const pattern of winPatterns) {
        if (
            cells[pattern[0]].textContent === player &&
            cells[pattern[1]].textContent === player &&
            cells[pattern[2]].textContent === player
        ) {
            return true;
        }
    }
    return false;
}

// Check if the board is full
function isBoardFull() {
    return [...cells].every((cell) => cell.textContent);
}

// Reset the game
function resetGame() {
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.style.backgroundColor = "#eee";
    });
    message.innerText = `${currentPlayer}'s turn`;
    currentPlayer = "X";
    isGameActive = true;
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

resetGame();
