const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const scoreElement = document.getElementById('score');

// Set canvas size
canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [];
let food = {};
let dx = gridSize;
let dy = 0;
let score = 0;
let gameLoop = null;

function initGame() {
    snake = [
        { x: 5 * gridSize, y: 5 * gridSize }
    ];
    score = 0;
    scoreElement.textContent = score;
    placeFood();
    if (gameLoop) clearInterval(gameLoop);
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * tileCount) * gridSize,
        y: Math.floor(Math.random() * tileCount) * gridSize
    };
}

function drawGame() {
    // Clear canvas
    ctx.fillStyle = '#34495e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = '#2ecc71';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize - 2, gridSize - 2);
    });

    // Draw food
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(food.x, food.y, gridSize - 2, gridSize - 2);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check for wall collision
    if (head.x >= canvas.width || head.x < 0 || head.y >= canvas.height || head.y < 0) {
        gameOver();
        return;
    }

    // Check for self collision
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        placeFood();
    } else {
        snake.pop();
    }
}

function gameOver() {
    clearInterval(gameLoop);
    alert(`Game Over! Your score: ${score}`);
    initGame();
}

function startGame() {
    initGame();
    gameLoop = setInterval(() => {
        moveSnake();
        drawGame();
    }, 100);
}

// Event Listeners
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (dy === 0) { dx = 0; dy = -gridSize; }
            break;
        case 'ArrowDown':
            if (dy === 0) { dx = 0; dy = gridSize; }
            break;
        case 'ArrowLeft':
            if (dx === 0) { dx = -gridSize; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx === 0) { dx = gridSize; dy = 0; }
            break;
    }
});

startButton.addEventListener('click', startGame);

// Initialize the game
initGame();
drawGame();
