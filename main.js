const words = ["PIZZA", "BURGER", "SUSHI", "PASTA", "STEAK"];
let lives = 6;
let selectedWord = "";
let hiddenWord = [];
let guessedLetters = [];

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function initializeGame() {
  selectedWord = getRandomWord();
  hiddenWord = Array(selectedWord.length).fill("_");
  lives = 6;
  guessedLetters = [];

  updateGuessBx();
  updateLives();
  updateLetterGrave();

  // Enable all letter buttons
  const letterButtons = document.querySelectorAll("#alphabet button");
  letterButtons.forEach((button) => {
    button.disabled = false;
  });
}

function updateGuessBx() {
  const guessBxEl = document.getElementById("guessBx");
  guessBxEl.textContent = hiddenWord.join(" ");
}

function updateLives() {
  const livesElement = document.getElementById("lives");
  livesElement.textContent = "Lives: " + lives;
}

function updateLetterGrave() {
  const letterGraveElement = document.getElementById("lGrave");
  letterGraveElement.textContent = "Letter Grave: " + guessedLetters.join(" ");
}


function guessLetter(letter) {
  if (guessedLetters.includes(letter)) {
    return;
  }

  guessedLetters.push(letter);

  let letterFound = false;

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) {
      hiddenWord[i] = letter;
      letterFound = true;
    }
  }

  if (letterFound) {
    updateGuessBx();

    if (!hiddenWord.includes("_")) {
      alert("Congratulations! You guessed the word.");
      initializeGame();
    }
  } else {
    lives--;
    updateLives();
    updateLetterGrave();

    if (lives === 0) {
      alert("Game over! The word was: " + selectedWord);
      initializeGame();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeGame();

  const letterButtons = document.querySelectorAll("#alphabet button");
  letterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const letter = button.textContent;
      guessLetter(letter);
      button.disabled = true;
      button.classList.add("selected");
    });
  });

  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", () => {
    initializeGame();
  });
});
