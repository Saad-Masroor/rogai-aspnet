// js/playerMovement.js
import { player, checkMovement, draw, enemies } from './game.js';
import { GameState, currentState } from './gameState.js';

function attackEnemy(x, y) {
    const enemy = enemies.find(e => e.gridX === x && e.gridY === y);
    if (!enemy) {
        return false;
    }

    enemy.hp--;
    console.log("You have hit an enemy, [HP LEFT] ",enemy.hp);

    if (enemy.hp <= 0) {
        enemies.splice(enemies.indexOf(enemy), 1);
        console.log("Enemy Defeated!")
    }
    draw();
    return true; // attack happened
}

function enemyTurn() {
    enemies.forEach(enemy => {
        let dx = player.gridX - enemy.gridX;
        let dy = player.gridY - enemy.gridY;

        // If enemy is next to player
        if (Math.abs(dx) + Math.abs(dy) === 1) {
            player.hp--;
            console.log("Enemy has hit Player! [HP LEFT]", player.hp);

            if (player.hp <= 0) {
                console.log("YOU DIED");
            }
            return;
        }
    });
}

export function initMovement() {
    window.addEventListener('keydown', (e) => {
        let newX = player.gridX;
        let newY = player.gridY;

        // Only allow to move when user is in PLAYING state
        if (currentState !== GameState.PLAYING) {
            return;
        }

        const key = e.key.toLowerCase();

        switch (key) {
            case 'arrowup':
            case 'w':
                newY--;
                break;

            case 'arrowdown':
            case 's':
                newY++;
                break;

            case 'arrowleft':
            case 'a':
                newX--;
                break;

            case 'arrowright':
            case 'd':
                newX++;
                break;

            default:
                return;
        }

        
        if (attackEnemy(newX, newY)) {
            enemyTurn(); // enemy respond after attack
            draw();
            return; // Attack happend then dont move
        }

        if (checkMovement(newX, newY)) {
            player.gridX = newX; 
            player.gridY = newY;
            enemyTurn();// enemy respond after movement
            draw(); // redraw only when moved
        }
    });
}