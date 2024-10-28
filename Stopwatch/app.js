let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;

const timeDisplay = document.querySelector('.time-display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const restartBtn = document.getElementById('restartBtn');
const lapBtn = document.getElementById('lapBtn');
const resetLapsBtn = document.getElementById('resetLapsBtn');
const lapsList = document.getElementById('lapsList');

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    const date = new Date(ms);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 100)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 100);
        startPauseBtn.textContent = "Pause";
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        startPauseBtn.textContent = "Start";
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = "00 : 00 : 00 : 00";
    startPauseBtn.textContent = "Start";
    isRunning = false;
}

function restartStopwatch() {
    resetStopwatch();
    startStopwatch();
}

function lap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = formatTime(elapsedTime);
        lapsList.appendChild(lapTime);
    }
}

function resetLaps() {
    lapsList.innerHTML = '';
}

// Event Listeners
startPauseBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
restartBtn.addEventListener('click', restartStopwatch);
lapBtn.addEventListener('click', lap);
resetLapsBtn.addEventListener('click', resetLaps);
