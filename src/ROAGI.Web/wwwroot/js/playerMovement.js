// js/playerMovement.js
import { player, checkMovement, draw } from './game.js';
import { GameState, currentState } from './gameState.js';

export function initMovement() {
    window.addEventListener('keydown', (e) => {
        let newX = player.gridX;
        let newY = player.gridY;

        // Only allow to move when user is in PLAYING state
        if (currentState !== GameState.PLAYING) {
            return;
        }

        switch (e.key) {
            case 'ArrowUp': newY--; break;
            case 'ArrowDown': newY++; break;
            case 'ArrowLeft': newX--; break;
            case 'ArrowRight': newX++; break;
            default: return;
        }

        if (checkMovement(newX, newY)) {
            player.gridX = newX;
            player.gridY = newY;
            draw(); // redraw only when moved
        }
    });
}