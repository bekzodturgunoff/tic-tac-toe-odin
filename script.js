//Overlay stuff
const overlay = document.querySelector("#overlay");
const navBtn = document.querySelector(".nav-btn");
const btnStarter = document.querySelector(".btn-start");
const makeBlur = document.querySelector("#make-blur");
const inputFill = document.querySelector("#input-fill");
const firstInput = document.querySelector(".first-input");
const secondInput = document.querySelector(".second-input");
const form = document.querySelector("#form");
const display = document.querySelector(".display");

//game itself
const game = document.querySelector("#game");
const markers = document.querySelectorAll(".marker");

let playerOne;
let playerTwo;
let marker = "x";

//listener functions
const handleReset = (e) => {
  console.log(e);
};

function handleMarker(e) {
  const pos = e.target.dataset.pos;
  if (!playerOne || !playerTwo) return;
  const currentPlayer = marker === "x" ? playerOne : playerTwo;
  if (playerOne.occupying(pos) || playerTwo.occupying(pos)) return;
  currentPlayer.move(pos);
  e.target.textContent = currentPlayer.getMarker();
  marker = currentPlayer.getMarker() === "x" ? playerTwo.getMarker() : playerOne.getMarker();
  if (playerOne.won()) {
    clear();
    display.textContent = (`${playerOne.getName()} won`);
  } else if (playerTwo.won()) {
    clear();
    display.textContent = (`${playerTwo.getName()} won`);
  }
}

function clear() {
  game.classList.remove("open");
  markers.forEach((btn) => {
    btn.textContent = "";

  });

}

for (const marker of markers) {
  marker.addEventListener("click", handleMarker);

}

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

form.addEventListener("submit", e => {
  e.preventDefault();

  if (firstInput.value.length == "") {
    inputFill.innerText = "First player missing";
    return;
  } else if (secondInput.value.length == "") {
    inputFill.innerText = "Second player missing";
    return;
  } else if (firstInput.value === secondInput.value) {
    inputFill.innerText = "Player's name should be different";
    return;
  }
  overlay.classList.remove("open");
  makeBlur.classList.remove("open");
  inputFill.innerText = "";
  game.classList.add("open");
  playerOne = createPlayer(firstInput.value, "x");
  playerTwo = createPlayer(secondInput.value, "o");
});

firstInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    secondInput.focus();
  }
});

display.addEventListener("mousedown", () => {
  display.textContent = "";
});

navBtn.addEventListener("click", () => {
  overlay.classList.add("open");
  makeBlur.classList.add("open");
  game.classList.remove("open");
  turnX = true;
  firstInput.value = "";
  secondInput.value = "";
  display.textContent = "";
});

function createPlayer(name, marker) {
  const positions = [];
  const move = (pos) => positions.push(pos);
  const getName = () => name;
  const getMarker = () => marker;
  const occupying = (pos) => positions.includes(pos);
  const getPositions = () => positions.map(Number);
  const won = () => winningConditions.some((condition) => condition.every(pos => getPositions().includes(pos)));
  return { move, getName, getMarker, occupying, won };
}