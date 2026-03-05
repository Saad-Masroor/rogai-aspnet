// js/game.js
import { initMovement } from './playerMovement.js';
import { initAuth } from './auth.js';

export const player = {
    gridX: 2,
    gridY: 2,
    color: 'blue',
    hp: 10
};

export const enemies = [{
        gridX: 3,
        gridY: 10,
        color: 'red',
        hp: 3
    },
    {
        gridX: 7,
        gridY: 15,
        color: 'red',
        hp: 5
    }
];

export const TILE_SIZE = 32;

const MAP_WIDTH = 25;
const MAP_HEIGHT = 18;
export const map = [];
for (let y = 0; y < MAP_HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
        if (x === 0 || y === 0 || x === MAP_WIDTH - 1 || y === MAP_HEIGHT - 1) {
            row.push(1);
        }
        else {
            row.push(0);
        }
    }
    map.push(row);
}

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
    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.gridX * TILE_SIZE, player.gridY * TILE_SIZE, TILE_SIZE, TILE_SIZE);

    // Draw enemies
    for (const enemy of enemies) {

        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.gridX * TILE_SIZE, enemy.gridY * TILE_SIZE, TILE_SIZE, TILE_SIZE);   
    }
}

function initGame() {
    canvas = document.getElementById('game-canvas');
    canvas.width = MAP_WIDTH * TILE_SIZE;
    canvas.height = MAP_HEIGHT * TILE_SIZE;
    ctx = canvas.getContext('2d');

    initAuth();
    initMovement();

    draw();
}

document.addEventListener('DOMContentLoaded', initGame);
