const words = ["PIZZA", "BURGER", "SUSHI", "PASTA", "STEAK"];
const hints = [
  "Hint: My favorite topping is pepperoni.",
  "Hint: I like mine with cheese and bacon added.",
  "Hint: It's a traditional Japanese cuisine.",
  "Hint: My favorite is Chicken Alfredo.",
  "Hint: It's a prime cut of meat.",
];
let lives = 6;
let selectedWord = "";
let hiddenWord = [];
let guessedLetters = [];

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function getHint() {
  const index = words.indexOf(selectedWord);
  if (index !== -1 && index < hints.length) {
    return hints[index];
  }
  return "Hint: No hint available.";
}

function initializeGame() {
  selectedWord = getRandomWord();
  hiddenWord = Array(selectedWord.length).fill("_");
  lives = 6;
  guessedLetters = [];

  updateGuessBx();
  updateLives();
  updateLetterGrave();
  updateBoard(); // Update the board with picture fragments

  const letterButtons = document.querySelectorAll("#alphabet button");
  letterButtons.forEach((button) => {
    button.disabled = true;
  });

  const resetButton = document.getElementById("reset");
  resetButton.disabled = false;

  letterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const letter = button.textContent;
      guessLetter(letter);
      button.disabled = true;
      button.classList.add("selected");
    });
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

function updateBoard() {
  const boardElement = document.getElementById("board");
  const fragment = "█";
  const fragmentsDisplay = fragment.repeat(fragments);
  boardElement.textContent = fragmentsDisplay;
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
      setTimeout(() => {
        alert("Congratulations! You guessed the word.");
        initializeGame();
      }, 1000);
    }
  } else {
    lives--;
    updateLives();
    updateLetterGrave();
    updateBoard(); // Update the board with picture fragments

    if (lives === 0) {
      setTimeout(() => {
        const letterButtons = document.querySelectorAll("#alphabet button");
        letterButtons.forEach((button) => {
          button.disabled = true;
        });

        const resetButton = document.getElementById("reset");
        resetButton.disabled = false;
      }, 1000);
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
    updateBoard();
    letterButtons.forEach((button) => {
      button.disabled = false;
      button.classList.remove("selected");
    });
    const showHintElement = document.getElementById("showHint");
    showHintElement.textContent = "";
  });

  const hintButton = document.getElementById("hint");
  hintButton.addEventListener("click", () => {
    alert("Hint: The word is a type of food.");
  });
});
