const gameBoard = document.querySelector("#game-board");
const ctx = gameBoard.getContext("2d"); //context
const scoreText = document.querySelector("#score");
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
createFood();
drawFood();

function gameStart() {}
function nextTick() {}
function clearBoard() {}
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
function drawSnake() {}
function changeDirection() {}
function checkGameOver() {}
function displayGameOver() {}
function resetGame() {}
