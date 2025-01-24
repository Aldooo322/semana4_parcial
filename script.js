let timer;
let isWorking = true;
let timeLeft = 25 * 60; 
const workDuration = 25 * 60; 
const breakDuration = 5 * 60; 

const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (timer) return; 
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            timer = null;
            if (isWorking) {
                isWorking = false; 
                timeLeft = breakDuration; 
                statusDisplay.textContent = "Tiempo de Descanso"; 
            } else {
                isWorking = true; 
                timeLeft = workDuration; 
                statusDisplay.textContent = "Intervalo de Trabajo";
            }
            updateTimerDisplay();
            startTimer(); 
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
    statusDisplay.textContent = "Tiempo Pausado"; 
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    isWorking = true;
    timeLeft = workDuration; 
    statusDisplay.textContent = "Intervalo de Trabajo"; 
    updateTimerDisplay();
}


updateTimerDisplay();


document.getElementById('start').addEventListener('click', () => {
    if (!timer) {
        if (timeLeft === 0) {
            timeLeft = workDuration; 
        }
        isWorking = true; 
        statusDisplay.textContent = "Intervalo de Trabajo"; 
        startTimer(); 
    }
});
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);