// js/gameState.js
export const GameState = Object.freeze({
    LOGIN: 'login',
    PLAYING: 'playing',
    INVENTORY: 'inventory',
    PAUSED: 'paused'
});

export let currentState = GameState.LOGIN;

export function setGameState(newState) {
    currentState = newState;
}