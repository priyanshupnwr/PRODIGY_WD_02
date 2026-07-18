const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const clearLapsBtn = document.getElementById("clearLaps");

const lapList = document.getElementById("lapList");

let startTime = 0;
let elapsedTime = 0;
let timer = null;
let lapCount = 1;

function formatTime(time) {

    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0")
    );
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {

    if (timer) return;

    startTime = Date.now() - elapsedTime;

    timer = setInterval(() => {

        elapsedTime = Date.now() - startTime;
        updateDisplay();

    }, 10);
}

function pauseTimer() {

    clearInterval(timer);
    timer = null;

}

function resetTimer() {

    clearInterval(timer);

    timer = null;
    elapsedTime = 0;
    lapCount = 1;

    updateDisplay();

    lapList.innerHTML = "";

}

function addLap() {

    if (elapsedTime === 0) return;

    const lap = document.createElement("li");

    lap.innerHTML = `
        <span>Lap ${lapCount++}</span>
        <span>${formatTime(elapsedTime)}</span>
    `;

    lapList.prepend(lap);

}

function clearLaps() {

    lapList.innerHTML = "";
    lapCount = 1;

}

startBtn.addEventListener("click", startTimer);

pauseBtn.addEventListener("click", pauseTimer);

resetBtn.addEventListener("click", resetTimer);

lapBtn.addEventListener("click", addLap);

clearLapsBtn.addEventListener("click", clearLaps);

updateDisplay();