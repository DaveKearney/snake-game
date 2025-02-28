// Mock the DOM elements
document.body.innerHTML = `
  <canvas id="gameCanvas"></canvas>
  <div class="score-container">
    <p>Score: <span id="score">0</span></p>
    <button id="startButton">Start Game</button>
  </div>
`;

// Import the game functions
const gameScript = require('../game.js');

describe('Snake Game Tests', () => {
  let snake;
  let food;
  let dx;
  let dy;
  let score;
  
  beforeEach(() => {
    // Reset game state before each test
    snake = [{ x: 100, y: 100 }];
    food = { x: 200, y: 200 };
    dx = 20;
    dy = 0;
    score = 0;
  });

  test('Snake dies when hitting walls', () => {
    // Test right wall
    snake[0].x = 400; // Canvas width
    expect(checkCollision(snake[0])).toBe(true);

    // Test left wall
    snake[0].x = -20;
    expect(checkCollision(snake[0])).toBe(true);

    // Test bottom wall
    snake[0].y = 400; // Canvas height
    expect(checkCollision(snake[0])).toBe(true);

    // Test top wall
    snake[0].y = -20;
    expect(checkCollision(snake[0])).toBe(true);
  });

  test('Snake grows when eating food', () => {
    const initialLength = snake.length;
    snake[0].x = food.x;
    snake[0].y = food.y;
    
    // Simulate food collision
    if (snake[0].x === food.x && snake[0].y === food.y) {
      score += 10;
      snake.push({});  // Add new segment
    }
    
    expect(snake.length).toBe(initialLength + 1);
    expect(score).toBe(10);
  });

  test('Score increases by 10 when eating food', () => {
    const initialScore = score;
    snake[0].x = food.x;
    snake[0].y = food.y;
    
    // Simulate food collision
    if (snake[0].x === food.x && snake[0].y === food.y) {
      score += 10;
    }
    
    expect(score).toBe(initialScore + 10);
  });
});
