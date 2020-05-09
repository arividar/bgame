"use strict";

let canvas = document.getElementById("skjarinn");
let ctx = canvas.getContext("2d");

const barHeight = 20;
const barWidth = 140;
const ballR = 10;
const barSpeed = 8;
const bgColor = "#acf";
const maxBallY = canvas.height - ballR;
const maxBallX = canvas.width - ballR;

let leftKeyPressed = false;
let rightKeyPressed = false;

let isPaused;
let isGameOver;
let ballX;
let ballY;
let ballDirectionX;
let ballDirectionY;
let barX;
let ballSpeed;

const startNewGame = () => {
  barX = canvas.width / 2 - barWidth / 2;
  ballX = barX + Math.floor(Math.random() * barWidth);
  ballY = canvas.height - barHeight - ballR - 1;
  ballSpeed = 2;
  ballDirectionX = Math.random() > 0.5 ? 1 : -1;
  ballDirectionY = -1;
  isGameOver = false;
  isPaused = false;
  drawBar();
  drawBall();
  draw();
};

const playSound = (soundFile, volume) => {
  const snd = new Audio(soundFile);
  snd.volume = volume;
  snd.play();
};

const playTick = () => playSound("media/tick.mp3", 0.2);
const playBeep = () => playSound("media/button-16.wav", 0.2);
const playGameOver = () =>
  playSound("media/Funny-game-over-sound.mp3", 0.3);

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#F6F6F6';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
};

const drawBar = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(barX, canvas.height - barHeight, barWidth, barHeight);
};

const draw = () => {
  if (isPaused || isGameOver) {
    requestAnimationFrame(draw);
    return;
  }
  clearCanvas();

  ballX += ballDirectionX * ballSpeed;
  ballY += ballDirectionY * ballSpeed;

  if (ballY >= maxBallY) {
    ballY = maxBallY;
    drawBar();
    drawBall();
    playGameOver();
    isPaused = true;
    isGameOver = true;
    return;
  }

  drawBall();

  if (ballX >= maxBallX || ballX <= ballR) {
    ballDirectionX = -ballDirectionX;
    playTick();
  }

  if (ballY <= ballR) {
    ballDirectionY = 1;
    playTick();
  }

  if (
    ballX + ballR > barX &&
    ballX - ballR < barX + barWidth &&
    ballY + ballR >= canvas.height - barHeight
  ) {
    ballDirectionY = -1;
    ballY = maxBallY - barHeight - ballR;
    ballSpeed++;
    playBeep();
  }

  if (leftKeyPressed && barX > 0) barX -= barSpeed;
  if (rightKeyPressed && barX < canvas.width - barWidth) barX += barSpeed;

  drawBar();
  requestAnimationFrame(draw);
};

document.addEventListener(
  "keyup",
  event => {
    if (event.keyCode === 37) leftKeyPressed = false;
    if (event.keyCode === 39) rightKeyPressed = false;
  },
  false
);

document.addEventListener(
  "keydown",
  event => {
    leftKeyPressed = event.keyCode === 37;
    rightKeyPressed = event.keyCode === 39;
    if (event.keyCode === 32)
      isGameOver ? startNewGame() : (isPaused = !isPaused);
  },
  false
);

startNewGame();
