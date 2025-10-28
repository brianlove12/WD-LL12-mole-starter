// DOM SELECT ELEMENTS
const holes = document.getElementsByClassName("hole");
const scoreDisplay = document.getElementById("score");
const moleCountDisplay = document.getElementById("moleCount");
const startButton = document.getElementById("startButton");

// Local score variable
let score = 0;

// Sound effect for hitting a mole
const popSound = new Audio("sounds/pop.mp3");
let timeLeft = 15;
let timerInterval = null;

// Initialize game board
function initializeGame() {
  // Loop through each hole and add a mole
  for (let i = 0; i < holes.length; i++) {
    const mole = document.createElement("div");
    mole.className = "mole";

    // Create eyes
    const leftEye = document.createElement("div");
    leftEye.className = "eye left-eye";
    const rightEye = document.createElement("div");
    rightEye.className = "eye right-eye";

    // Create pupils
    const leftPupil = document.createElement("div");
    leftPupil.className = "pupil left-pupil";
    const rightPupil = document.createElement("div");
    rightPupil.className = "pupil right-pupil";

    // Create nose
    const nose = document.createElement("div");
    nose.className = "nose";

    // Create mouth
    const mouth = document.createElement("div");
    mouth.className = "mouth";

    // Create ears
    const leftEar = document.createElement("div");
    leftEar.className = "ear left-ear";
    const rightEar = document.createElement("div");
    rightEar.className = "ear right-ear";

    // Add features to mole
    mole.appendChild(leftEar);
    mole.appendChild(rightEar);
    mole.appendChild(leftEye);
    mole.appendChild(rightEye);
    mole.appendChild(leftPupil);
    mole.appendChild(rightPupil);
    mole.appendChild(nose);
    mole.appendChild(mouth);

    // Add a click event listener to the mole
    mole.addEventListener("click", function () {
      // Only allow clicking if mole is up
      if (holes[i].classList.contains("up")) {
        score++;
        scoreDisplay.textContent = score;
        holes[i].classList.remove("up");
        popSound.currentTime = 0;
        popSound.play();
      }
    });

    // Add a touch event listener to the mole for touchpad/mobile
    mole.addEventListener("touchstart", function (event) {
      if (holes[i].classList.contains("up")) {
        score++;
        scoreDisplay.textContent = score;
        holes[i].classList.remove("up");
        popSound.currentTime = 0;
        popSound.play();
        event.preventDefault();
      }
    });

    // Add a keyboard event listener to the mole
    mole.addEventListener("keydown", function (event) {
      // Space (32) or Enter (13) key
      if (
        (event.key === " " || event.key === "Enter") &&
        holes[i].classList.contains("up")
      ) {
        score++;
        scoreDisplay.textContent = score;
        holes[i].classList.remove("up");
        popSound.currentTime = 0;
        popSound.play();
        event.preventDefault();
      }
    });
    holes[i].appendChild(mole);
  }
}

// Timer and message elements
const timeLeftDisplay = document.getElementById("timeLeft");
const messageDisplay = document.getElementById("message");

// Start the game when the button is clicked
startButton.addEventListener("click", function () {
  // Reset score and timer at the start of the game
  score = 0;
  scoreDisplay.textContent = score;
  timeLeft = 15;
  timeLeftDisplay.textContent = timeLeft;
  messageDisplay.textContent = "";

  // Start timer countdown
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timerInterval = setInterval(function () {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      messageDisplay.textContent = "Time's up!";
    }
  }, 1000);

  if (typeof startGame === "function") {
    startGame();
  }
});

initializeGame();
