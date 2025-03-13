let timer;
let seconds = 720;
let isTimerRunning = false;
let period = 1;

function addPoints(team, points) {
    const scoreElement = document.getElementById(`${team}-score`);
    let score = parseInt(scoreElement.textContent);
    score += points;
    scoreElement.textContent = score;
}

function newGame() {
    document.getElementById('home-score').textContent = '0';
    document.getElementById('guest-score').textContent = '0';
    resetTimer();
    period = 1;
    document.getElementById('period').textContent = period;
}

function changePeriod(change) {
    period = Math.max(1, period + change);
    document.getElementById('period').textContent = period;
}

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    isTimerRunning = false;
}

function resetTimer() {
    stopTimer();
    seconds = 720;
    updateDisplay();
}

function updateTimer() {
    if (seconds > 0) {
        seconds--;
        updateDisplay();
    } else {
        stopTimer();
    }
}

function updateDisplay() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('timer').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Initialize timer display
updateDisplay();