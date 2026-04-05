const buttons = document.querySelectorAll(".btn");
const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");

let sequence = [];
let playerSequence = [];
let round = 1;
let playing = false;

startBtn.onclick = startGame;

function startGame() {
  sequence = [];
  round = 1;
  nextRound();
}

function nextRound() {
  playerSequence = [];
  statusText.textContent = "Round " + round;

  let length = round === 1 ? 2 : round === 2 ? 4 : 6;

  sequence = [];
  for (let i = 0; i < length; i++) {
    sequence.push(Math.floor(Math.random() * 4));
  }

  playSequence();
}

function playSequence() {
  playing = false;
  let i = 0;

  const interval = setInterval(() => {
    flashButton(sequence[i]);
    i++;

    if (i >= sequence.length) {
      clearInterval(interval);
      playing = true;
    }
  }, 700);
}

function flashButton(index) {
  buttons[index].classList.add("active");
  setTimeout(() => {
    buttons[index].classList.remove("active");
  }, 300);
}

buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (!playing) return;

    flashButton(index);
    playerSequence.push(index);

    checkInput();
  });
});

function checkInput() {
  let current = playerSequence.length - 1;

  if (playerSequence[current] !== sequence[current]) {
    statusText.textContent = "❌ You Lost!";
    playing = false;
    return;
  }

  if (playerSequence.length === sequence.length) {
    if (round === 3) {
      statusText.textContent = "🎉 You Won!";
      playing = false;
    } else {
      round++;
      setTimeout(nextRound, 1000);
    }
  }
}
