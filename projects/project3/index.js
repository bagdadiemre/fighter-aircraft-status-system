// index.js
import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1005;
canvas.height = 705;

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

    ctx.fillStyle = "white";
    ctx.font = "70px Arial";

    // Calculate text width
    let textWidth = ctx.measureText(text).width;

    // Calculate the x position for centered text
    let x = (canvas.width - textWidth) / 2;

    // Calculate the y position for centered text
    let y = canvas.height / 2;

    ctx.fillText(text, x, y);
  }
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    endGame(false);
  }

  if (enemyController.collideWith(player)) {
    endGame(false);
  }

  if (enemyController.enemyRows.length === 0) {
    endGame(true);
  }
}

function endGame(win) {
  isGameOver = true;
  didWin = win;

  if (didWin) {
    document.getElementById("game-over-text").textContent = "You Win!";
  } else {
    document.getElementById("game-over-text").textContent = "Game Over!";
  }

  pauseGame(false);
  document.getElementById("game-over-screen").style.display = "flex";
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
  if (event.code === "KeyP" && gameStarted && !isGameOver) {
    // Press 'P' key to toggle pause
    pauseGame(!isPaused);
  }
});

const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", restartGame);

const restartGameButton = document.getElementById("restart-game-button");
restartGameButton.addEventListener("click", restartGame);

function restartGame() {
  location.reload(); // Reload the page to restart the game
}

setInterval(game, 1000 / 60);
