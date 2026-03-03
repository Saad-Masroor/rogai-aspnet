// wwwroot/js/game.js
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 32;

const map = [
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

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

let player = {
    gridX: 2,
    gridY: 2,
    color: 'blue',
}
function drawMap() {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {

            let tile = map[row][col];

            if (tile === 0) {
                ctx.fillStyle = "#444"; // floor
            } else if (tile === 1) {
                ctx.fillStyle = "#222"; // wall
            }

            ctx.fillRect(
                col * TILE_SIZE,
                row * TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
            );
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawMap();

    ctx.fillStyle = "blue";
    ctx.fillRect(
        player.gridX * TILE_SIZE,
        player.gridY * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
    );
}
function checkMovement(x, y) {
    min_x = 0;
    min_y = 0;
    max_x = GRID_WIDTH-1;
    max_y = GRID_HEIGHT-1;
    if (x < min_x || x > max_x || y < min_y || y > max_y) {
        return false;
    }
    else if (map[y][x] === 1) {
            return false;
    }
    return true;
}
window.addEventListener('keydown', (e) => {

    const key = e.key.toLowerCase();

    switch (key) {
        case 'arrowup':
        case 'w':
            if (checkMovement(player.gridX, player.gridY - 1)) {
                player.gridY--;
            }
            break;

        case 'arrowdown':
        case 's':
            if (checkMovement(player.gridX, player.gridY + 1)) {
                player.gridY++;
            }
            break;

        case 'arrowleft':
        case 'a':
            if (checkMovement(player.gridX - 1, player.gridY)) {
                player.gridX--;
            }
            break;

        case 'arrowright':
        case 'd':
            if (checkMovement(player.gridX + 1, player.gridY)) {

                player.gridX++;
            }
            break;
    }

    draw();
});

draw();