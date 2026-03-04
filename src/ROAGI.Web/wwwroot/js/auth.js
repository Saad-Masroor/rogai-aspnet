// js/auth.js
import { GameState, setGameState } from './gameState.js';

export function initAuth() {
    document.getElementById('login-btn')
        .addEventListener('click', () => auth('login'));

    document.getElementById('register-btn')
        .addEventListener('click', () => auth('register'));
}

export async function auth(type) {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const output = document.getElementById('terminal-output');

    output.innerText = "Processing...";
    if (!user.trim() || !pass.trim()) {
        output.innerText = "ARGGH!: Enter both username and secret";
        return;
    }

    try {
        const response = await fetch(`/api/auth/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Username: user, Password: pass })
        });

        const result = await response.json();

        if (response.ok) {
            output.innerText = "ACCESS GRANTED";
            setTimeout(() => {
                document.getElementById('modal-overlay').style.display = 'none';
                document.getElementById('background-frame').classList.remove('blurred');

                setGameState(GameState.PLAYING);
            }, 1000); 
        } else {
            output.innerText = "ERROR: " + (result.message || "Unauthorized");
            document.getElementById('username').value = "";
            document.getElementById('password').value = "";
            document.getElementById('username').focus();
        }
    } catch (err) {
        output.innerText = "CONNECTION ERROR: System Offline";
    }
}