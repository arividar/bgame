"use strict";
let canvas = document.getElementById("skjarinn");
let ctx = canvas.getContext("2d");

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#F6F6F6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const draw = () => {
    clearCanvas();
    requestAnimationFrame(draw);
};
