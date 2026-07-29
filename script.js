const gameBoard = document.querySelector("#game-board");
const ctx = gameBoard.getContext("2d"); //context
const scoreText = document.querySelector("#score-text");
const resetBtn = document.querySelector("#reset-btn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const UNIT_SIZE = 25; //px

let running = false;
let xVelocity = UNIT_SIZE;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
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
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75);
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
  foodY = randomFood(0, gameWidth - UNIT_SIZE);
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, UNIT_SIZE, UNIT_SIZE);
}
function moveSnake() {}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, UNIT_SIZE, UNIT_SIZE);
    ctx.strokeRect(snakePart.x, snakePart.y, UNIT_SIZE, UNIT_SIZE);
  });
}
function changeDirection() {}
function checkGameOver() {}
function displayGameOver() {}
function resetGame() {}
