let timer;
let isRunning = false;

// Timer modes with their durations
const MODES = {
    work: { duration: 25 * 60, label: '作業中' },
    shortBreak: { duration: 5 * 60, label: '休憩中（短い休憩）' },
    longBreak: { duration: 15 * 60, label: '休憩中（長い休憩）' }
};

let currentMode = 'work';
let timeLeft = MODES[currentMode].duration;

function updateDisplay() {
    const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const sec = String(timeLeft % 60).padStart(2, '0');
    document.getElementById('timer-display').textContent = `${min}:${sec}`;
}

function updateSessionState() {
    document.getElementById('session-state').textContent = MODES[currentMode].label;
}

function setMode(mode) {
    if (isRunning) {
        stopTimer();
    }
    currentMode = mode;
    timeLeft = MODES[mode].duration;
    updateDisplay();
    updateSessionState();
    
    // Update active button styling
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    if (mode === 'work') {
        document.getElementById('work-btn').classList.add('active');
    } else if (mode === 'shortBreak') {
        document.getElementById('short-break-btn').classList.add('active');
    } else if (mode === 'longBreak') {
        document.getElementById('long-break-btn').classList.add('active');
    }
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            alert('時間になりました！');
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    timeLeft = MODES[currentMode].duration;
    updateDisplay();
}

// Control buttons
document.getElementById('start-btn').onclick = startTimer;
document.getElementById('stop-btn').onclick = stopTimer;
document.getElementById('reset-btn').onclick = resetTimer;

// Mode buttons
document.getElementById('work-btn').onclick = () => setMode('work');
document.getElementById('short-break-btn').onclick = () => setMode('shortBreak');
document.getElementById('long-break-btn').onclick = () => setMode('longBreak');

// Initialize display
updateDisplay();
updateSessionState();
