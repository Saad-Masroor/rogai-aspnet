// js/game.js
import { initMovement } from './playerMovement.js';
import { initAuth } from './auth.js';

export const player = { gridX: 2, gridY: 2, color: 'blue' };
export const TILE_SIZE = 32;

export const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let canvas;
export let ctx;

export function checkMovement(x, y) {
    const maxX = map[0].length - 1;
    const maxY = map.length - 1;
    if (x < 0 || x > maxX || y < 0 || y > maxY) return false;
    if (map[y][x] === 1) return false;
    return true;
}

function drawMap() {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            ctx.fillStyle = map[row][col] === 1 ? "#222" : "#444";
            ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
}

export function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    ctx.fillStyle = player.color;
    ctx.fillRect(player.gridX * TILE_SIZE, player.gridY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function initGame() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');

    initAuth();
    initMovement();

    draw();
}

document.addEventListener('DOMContentLoaded', initGame);
