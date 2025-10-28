// DOM SELECT ELEMENTS
const holes = document.getElementsByClassName("hole");
const scoreDisplay = document.getElementById("score");
const moleCountDisplay = document.getElementById("moleCount");
const startButton = document.getElementById("startButton");

// Local score variable
let score = 0;

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

    // Create nose
    const nose = document.createElement("div");
    nose.className = "nose";

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
    mole.appendChild(nose);

    // Add a click event listener to the mole
    mole.addEventListener("click", function () {
      // Only allow clicking if mole is up
      if (holes[i].classList.contains("up")) {
        score++;
        scoreDisplay.textContent = score;
        holes[i].classList.remove("up");
      }
    });

    // Add a touch event listener to the mole for touchpad/mobile
    mole.addEventListener("touchstart", function (event) {
      if (holes[i].classList.contains("up")) {
        score++;
        scoreDisplay.textContent = score;
        holes[i].classList.remove("up");
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
        event.preventDefault();
      }
    });
    holes[i].appendChild(mole);
  }
}

// Start the game when the button is clicked
startButton.addEventListener("click", function () {
  // Reset score at the start of the game
  score = 0;
  scoreDisplay.textContent = score;
  if (typeof startGame === "function") {
    startGame();
  }
});

initializeGame();
