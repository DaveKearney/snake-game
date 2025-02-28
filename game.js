// Game constants
const GRID_SIZE = 20;
const CANVAS_SIZE = 400;

// Game variables
let snake = [];
let food = {};
let dx = GRID_SIZE;
let dy = 0;
let score = 0;
let gameLoop = null;

// Initialize canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const scoreElement = document.getElementById('score');

// Set canvas size
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

function initGame() {
    snake = [
        { x: 5 * GRID_SIZE, y: 5 * GRID_SIZE }
    ];
    score = 0;
    scoreElement.textContent = score;
    placeFood();
    if (gameLoop) clearInterval(gameLoop);
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)) * GRID_SIZE,
        y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)) * GRID_SIZE
    };
}

function drawGame() {
    // Clear canvas
    ctx.fillStyle = '#34495e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = '#2ecc71';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, GRID_SIZE - 2, GRID_SIZE - 2);
    });

    // Draw food
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(food.x, food.y, GRID_SIZE - 2, GRID_SIZE - 2);
}

function checkCollision(head) {
    // Check wall collision
    if (head.x >= canvas.width || head.x < 0 || head.y >= canvas.height || head.y < 0) {
        return true;
    }

    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (checkCollision(head)) {
        gameOver();
        return;
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
            if (dy === 0) { dx = 0; dy = -GRID_SIZE; }
            break;
        case 'ArrowDown':
            if (dy === 0) { dx = 0; dy = GRID_SIZE; }
            break;
        case 'ArrowLeft':
            if (dx === 0) { dx = -GRID_SIZE; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx === 0) { dx = GRID_SIZE; dy = 0; }
            break;
    }
});

startButton.addEventListener('click', startGame);

// Initialize the game
initGame();
drawGame();

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkCollision,
        moveSnake,
        GRID_SIZE,
        CANVAS_SIZE
    };
}
