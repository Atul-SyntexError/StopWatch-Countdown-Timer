const toggle = document.querySelector('.toggle');
const stopwatch = document.getElementById('stopwatch');
const countdown = document.getElementById('countdown');
let isVisible = 'stopwatch';

toggle.addEventListener('click', function() {
    pause(true);
    if (stopwatch.style.display === 'none') {    
        stopwatch.style.display = 'block';
        countdown.style.display = 'none';
        toggle.textContent = 'Stop Watch';
        isVisible = 'stopwatch';
    } else {                                       
        stopwatch.style.display = 'none';
        countdown.style.display = 'block';
        toggle.textContent = 'Count Down Timer';
        isVisible = 'countdown';
    }
});

function writeStopwatch(hours, mins, sec, ms) {
    document.getElementById('stopwatch-hours').innerHTML = hours;
    document.getElementById('stopwatch-mins').innerHTML = mins;
    document.getElementById('stopwatch-sec').innerHTML = sec;
    document.getElementById('stopwatch-ms').innerHTML = ms;
}

function writeCountDown(hours, mins, sec, ms) {
    document.getElementById('cdtimer-hours').innerHTML = hours;
    document.getElementById('cdtimer-mins').innerHTML = mins;
    document.getElementById('cdtimer-sec').innerHTML = sec;
    document.getElementById('cdtimer-ms').innerHTML = ms;
}

function writeMilliSecondToDoc(givenMilliSecondTime, writeToDiv) {
    let diffInHrs = givenMilliSecondTime / 3600000;
    let hour = Math.floor(diffInHrs);
    
    let diffInMin = (diffInHrs - hour) * 60;
    let minute = Math.floor(diffInMin);
    
    let diffInSec = (diffInMin - minute) * 60;
    let second = Math.floor(diffInSec);
    
    let diffInMs = (diffInSec - second) * 100;
    let milliSecond = Math.floor(diffInMs);
    
    hour = hour.toString().padStart(2, '0');
    minute = minute.toString().padStart(2, '0');
    second = second.toString().padStart(2, '0');
    milliSecond = milliSecond.toString().padStart(2, '0');
    if (writeToDiv == 'stopwatch') {
        writeStopwatch(hour, minute, second, milliSecond);
    } else if (writeToDiv == 'cdtimer') {
        writeCountDown(hour, minute, second, milliSecond);
    } else {
        alert('Error in `function writeMilliSecondToDoc()`: Wrong Parameters');
    }

}

let elapsedTime = 0;
let hasPausedStopWatch = true;
let timerIntervalStopWatchId = null;

function pause(forResetOrToggle = false) {
    if (hasPausedStopWatch && hasPausedCountDownTimer && !forResetOrToggle) {
        confirm('The timer is already Paused...');
    }
    else if (isVisible == 'stopwatch') {
        clearInterval(timerIntervalStopWatchId);
        hasPausedStopWatch = true;

    } 
    else if (isVisible == 'countdown') {
        clearInterval(timerIntervalCountDownTimerId);
        hasPausedCountDownTimer = true;
        
    } 
    else {
        alert('Error in `function pause()`');
    }
}

function startStopWatch() {
    
    if(hasPausedStopWatch){
        
        hasPausedStopWatch = false;
        let startTime = Date.now() - elapsedTime;
        
        timerIntervalStopWatchId = setInterval(function() {
            
            elapsedTime = Date.now() - startTime;
            
            writeMilliSecondToDoc(elapsedTime, 'stopwatch');
            
        }, 10);
    }
}

function resetStopWatch() {
    
    pause(true);
    
    
    writeStopwatch('00', '00', '00', '00');
    
    
    
    elapsedTime = 0;
}

let isTimerSet = false;
let milliSecCountDown = 0;
let timerIntervalCountDownTimerId = null;
let hasPausedCountDownTimer = true;

function setCountDownTimer() {
    let min = parseFloat(prompt("Set your timer (in min):", "5.0"));
    if (min == null || isNaN(min) || min == "" || min <= 0) {
        alert('Enter a Valid value !!!...');
    } else {
        milliSecCountDown = min * 60000;
        writeMilliSecondToDoc(milliSecCountDown, 'cdtimer');
        isTimerSet = true;
        pause(true);
        
    }
}

function startCountDownTimer() {
    if( !isTimerSet ) {
        alert('Please Set the Timer !!!...');
    } 
    else if(hasPausedCountDownTimer) {
        hasPausedCountDownTimer = false;
        timerIntervalCountDownTimerId = setInterval(function() {
            
            milliSecCountDown = milliSecCountDown-10;
            
            writeMilliSecondToDoc(milliSecCountDown, 'cdtimer');
            
            if (milliSecCountDown <= 0) {
                resetCountDownTimer();
                alert('Times Up !!!...');
            }
            
        }, 10);
    }
}
function resetCountDownTimer() {
    pause(true);
    writeCountDown('00', '00', '00', '00');
    milliSecCountDown = 0;
    isTimerSet = false;
}
