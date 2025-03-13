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

// AI ASSISTANT
let voiceEnabled = true;
let speech = null;

function announceLeader() {
    if (!voiceEnabled) return;
    
    const homeScore = parseInt(document.getElementById('home-score').textContent);
    const guestScore = parseInt(document.getElementById('guest-score').textContent);
    
    if (homeScore === guestScore) return;
    
    const message = new SpeechSynthesisUtterance();
    message.text = `Team ${homeScore > guestScore ? 'Home' : 'Guest'} is leading with ${Math.abs(homeScore - guestScore)} points`;
    
    // Configure voice settings
    message.volume = 1;
    message.rate = 0.9;
    message.pitch = 1;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Select a voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => voice.name.includes('Female'));
    if (femaleVoice) {
        message.voice = femaleVoice;
    }
    
    window.speechSynthesis.speak(message);
}

function toggleVoice() {
    voiceEnabled = !voiceEnabled;
    const button = document.querySelector('.voice-toggle');
    button.textContent = `VOICE: ${voiceEnabled ? 'ON' : 'OFF'}`;
    button.classList.toggle('active', !voiceEnabled);
}

// Modify addPoints function to include announcement
function addPoints(team, points) {
    const scoreElement = document.getElementById(`${team}-score`);
    let score = parseInt(scoreElement.textContent);
    score += points;
    scoreElement.textContent = score;
    announceLeader();
}

// Initialize speech synthesis
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        // Voices loaded
    };
} else {
    console.warn('Speech synthesis not supported');
}