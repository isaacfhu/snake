/** @type {HTMLCanvasElement} */
const gameBoard = document.querySelector("#game-board");
const ctx = gameBoard.getContext("2d"); //context
const scoreText = document.querySelector("#score-text");
const highscoreText = document.querySelector("#highscore-text");
const resetBtn = document.querySelector("#reset-btn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const UNIT_SIZE = 25; //px
const SPEED = 500;

let running = false;
let tickTimeout;
let xVelocity = UNIT_SIZE;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let highscore = 0;
let snake = [
  { x: UNIT_SIZE * 4, y: 0 },
  { x: UNIT_SIZE * 3, y: 0 },
  { x: UNIT_SIZE * 2, y: 0 },
  { x: UNIT_SIZE, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
}
function nextTick() {
  if (running) {
    tickTimeout = setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, SPEED);
  } else {
    displayGameOver();
  }
}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function createFood() {
  function randomFood(min, max) {
    const randNum = // numbers divisible by UNIT_SIZE
      Math.round((Math.random() * (max - min) + min) / UNIT_SIZE) * UNIT_SIZE;
    return randNum;
  }
  foodX = randomFood(0, gameWidth - UNIT_SIZE);
  foodY = randomFood(0, gameHeight - UNIT_SIZE);
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, UNIT_SIZE, UNIT_SIZE);
}
function moveSnake() {
  const head = {
    x: snake[0].x + xVelocity,
    y: snake[0].y + yVelocity,
  };
  snake.unshift(head);
  // if food eaten
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;

    if (score > highscore) {
      highscore = score;
      highscoreText.textContent = `High-score: ${highscore}`;
    }

    createFood();
  } else {
    snake.pop();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, UNIT_SIZE, UNIT_SIZE);
    ctx.strokeRect(snakePart.x, snakePart.y, UNIT_SIZE, UNIT_SIZE);
  });
}

function changeDirection(event) {
  code = event.code;

  const goingLEFT = xVelocity == -UNIT_SIZE;
  const goingUP = yVelocity == -UNIT_SIZE;
  const goingRIGHT = xVelocity == UNIT_SIZE;
  const goingDOWN = yVelocity == UNIT_SIZE;

  switch (code) {
    case "ArrowLeft":
    case "KeyA":
      if (!goingRIGHT) {
        xVelocity = -UNIT_SIZE;
        yVelocity = 0;
      }
      break;

    case "ArrowUp":
    case "KeyW":
      if (!goingDOWN) {
        xVelocity = 0;
        yVelocity = -UNIT_SIZE;
      }
      break;

    case "ArrowRight":
    case "KeyD":
      if (!goingLEFT) {
        xVelocity = UNIT_SIZE;
        yVelocity = 0;
      }
      break;

    case "ArrowDown":
    case "KeyS":
      if (!goingUP) {
        xVelocity = 0;
        yVelocity = UNIT_SIZE;
      }
      break;

    case "KeyR":
      resetGame();
      break;
  }
}

function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}

function displayGameOver() {
  ctx.font = "50px MV Boli, serif";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
  running = false;
}
function resetGame() {
  clearTimeout(tickTimeout);
  score = 0;
  xVelocity = UNIT_SIZE;
  yVelocity = 0;
  snake = [
    { x: UNIT_SIZE * 4, y: 0 },
    { x: UNIT_SIZE * 3, y: 0 },
    { x: UNIT_SIZE * 2, y: 0 },
    { x: UNIT_SIZE, y: 0 },
    { x: 0, y: 0 },
  ];
  gameStart();
}
