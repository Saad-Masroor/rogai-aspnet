
async function auth(type) {
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
            }, 1000);
        } else {
            output.innerText = "ERROR: " + (result.message || "Unauthorized");
            clearState();
        }
    } catch (err) {
        output.innerText = "CONNECTION ERROR: System Offline";
    }
}

function clearState() {
    const userInput = document.getElementById('username');
    const passInput = document.getElementById('password');

    userInput.value = "";
    passInput.value = "";

    userInput.focus();
}
usernameInput = document.getElementById('username');
passwordInput = document.getElementById('password');
// When Enter is pressed in username > move to password
usernameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        passwordInput.focus();
    }
});

// When Enter is pressed in password > trigger login
passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        auth('login'); // change if your button uses a different type
    }
});