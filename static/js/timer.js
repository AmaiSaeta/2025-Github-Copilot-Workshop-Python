let timer;
let timeLeft = 25 * 60; // 25分
let isRunning = false;

function updateDisplay() {
    const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const sec = String(timeLeft % 60).padStart(2, '0');
    document.getElementById('timer-display').textContent = `${min}:${sec}`;
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
    timeLeft = 25 * 60;
    updateDisplay();
}

document.getElementById('start-btn').onclick = startTimer;
document.getElementById('stop-btn').onclick = stopTimer;
document.getElementById('reset-btn').onclick = resetTimer;

updateDisplay();
