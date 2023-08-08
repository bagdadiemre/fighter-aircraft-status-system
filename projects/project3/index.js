import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "images/space.png";

const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;

function game() {
  if (!gameStarted || isPaused) {
    return; // Don't run the game loop if it hasn't started yet
  }
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}

function displayGameOver() {
  if (isGameOver) {
    let text = didWin ? "You Win!" : "Game Over!";
    let textOffset = didWin ? 3.5 : 5;

    ctx.fillStyle = "white";
    ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
  }
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.enemyRows.length === 0) {
    isGameOver = true;
    didWin = true;
  }
}

const homeScreen = document.getElementById("home-screen");
const startButton = document.getElementById("start-button");
let gameStarted = false;
startButton.addEventListener("click", () => {
  startGame();
});
function startGame() {
  homeScreen.style.display = "none"; // Hide home screen
  canvas.style.display = "block"; // Show canvas
  gameStarted = true;
}

const pauseScreen = document.getElementById("pause-screen");
const continueButton = document.getElementById("continue-button");
const exitButton = document.getElementById("exit-button");

let isPaused = false;

continueButton.addEventListener("click", () => {
  pauseGame(false);
});

exitButton.addEventListener("click", () => {
  location.reload(); // Reload the page to exit the game
});

function pauseGame(pause) {
  isPaused = pause;
  if (pause) {
    pauseScreen.style.display = "flex"; // Show pause screen
  } else {
    pauseScreen.style.display = "none"; // Hide pause screen
  }
}

document.addEventListener("keydown", (event) => {
  if (event.code === "KeyP") {
    // Press 'P' key to toggle pause
    pauseGame(!isPaused);
  }
});

setInterval(game, 1000 / 60);
