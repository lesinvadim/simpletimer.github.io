var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var elemAnimation = document.getElementById("timer-animation");
var elemAnimationMax = document.getElementById("max-min-popup");
var totalSeconds = 0;
var timerInProgress = false;
var timerIdUp;
var timerIdUDown;

var timerFromStorage = JSON.parse(window.localStorage.getItem("totalSeconds"));

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60, 10));
}
function setUntime() {
  if (totalSeconds > 0) {
    --totalSeconds;
  }
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60, 10));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

//buttons
function toggleStartTime() {
  timerInProgress = !timerInProgress;
  var element = document.getElementById("button-start");

  if (timerInProgress) {
    timerIdUp = setInterval(setTime, 1000);
    element.innerHTML = "Pause";
    element.classList.add("toggle-start_active");
    elemAnimation.classList.add("timer_active");
    elemAnimation.classList.remove("animation-paused");
  }
  if (!timerInProgress) {
    clearInterval(timerIdUp);
    element.innerHTML = "Start";
    element.classList.remove("toggle-start_active");
    elemAnimation.classList.add("animation-paused");
  }
}
function backStart() {
  timerInProgress = !timerInProgress;
  var elementBack = document.getElementById("button-back-start");
  if (timerInProgress) {
    timerIdDown = setInterval(setUntime(), 1000);
    elementBack.innerHTML = "Pause Back";
  }
  if (!timerInProgress) {
    clearInterval(timerIdDown);
    elementBack.innerHTML = "Play Back";
  }
}

function oneMinUp() {
  totalSeconds += 60;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60, 10));
}
function oneMinDown() {
  if (totalSeconds > 0 && totalSeconds !== 0) totalSeconds -= 60;
  if (totalSeconds == 0 || totalSeconds < 0) {
    resetStartTime();
    setInterval(function() {
			elemAnimationMax.classList.add("max-min-popup_active");
		}, 700);
    elemAnimationMax.classList.remove("max-min-popup_active");
  }
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60, 10));
}

function resetStartTime() {
  totalSeconds = 0;
  secondsLabel.innerHTML = "00";
  minutesLabel.innerHTML = "00";
}

//localStorage
if (timerFromStorage) {
  totalSeconds = timerFromStorage;
  console.log(totalSeconds);
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60, 10));
} else {
  totalSeconds = 0;
}

window.localStorage.setItem("totalSeconds", totalSeconds);

window.onbeforeunload = function() {
  let stringLocal = JSON.stringify(totalSeconds);
  window.localStorage.setItem("totalSeconds", stringLocal);
};
