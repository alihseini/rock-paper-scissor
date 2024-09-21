const status = document.getElementById("status");
const startButton = document.getElementById("start-button");
const againButton = document.getElementById("again-button");
const buttons = document.getElementById("buttons");
const userDiv = document.getElementById("user");
const compDiv = document.getElementById("comp");
const scores = document.getElementById("scores");
const userScoreSpan = document.getElementById("user-score");
const CompScoreSpan = document.getElementById("comp-score");
const choicesDiv = document.getElementById("choices");
const options = document.querySelectorAll(".option");

const compChoices = ["rock", "paper", "scissors"];
let userScore = null;
let computerScore = null;

const startGame = () => {
  startButton.style.display = "none";
  againButton.style.display = "none";
  statusChanger("Choose!");
  options.forEach((img) => {
    img.style.display = "inline-block";
  });
  scores.style.display = "inline-block";
  choicesDiv.style.display = "block";
  choicesDiv.innerHTML = "";
  userScore = 0;
  computerScore = 0;
  userScoreSpan.innerText = userScore;
  CompScoreSpan.innerText = computerScore;
};

const game = (event) => {
  const user = event.target.dataset.id;
  const comp = compChoice();
  const choicesJSX = `
    <p>You Choosed:${user} and Computer Choosed:${comp}</p>
  `;
  choicesDiv.innerHTML = choicesJSX;
  if (user === comp) {
    return showScore("tie");
  } else if (user === "rock") {
    return comp === "paper" ? showScore("computer") : showScore("user");
  } else if (user === "paper") {
    return comp === "rock" ? showScore("user") : showScore("computer");
  } else {
    return comp === "rock" ? showScore("computer") : showScore("user");
  }
};

const showScore = (result) => {
  if (result === "computer") {
    statusChanger("Computer won this round!");
    computerScore++;
    CompScoreSpan.innerText = computerScore;
    if (computerScore === 5) {
      statusChanger("Computer won the game!");
      endGame();
    }
  } else if (result === "user") {
    statusChanger("You won this round!");
    userScore++;
    userScoreSpan.innerText = userScore;
    if (userScore === 5) {
      statusChanger("You won the game!");
      endGame();
    }
  } else {
    statusChanger("Its a tie!");
  }
};

const endGame = () => {
  options.forEach((img) => {
    img.style.display = "none";
  });
  scores.style.display = "none";
  choicesDiv.style.display = "none";
  againButton.style.display = "inline-block";
};

const compChoice = () => {
  return compChoices[Math.floor(Math.random() * 3)];
};

const statusChanger = (message) => {
  status.innerText = message;
};

startButton.addEventListener("click", startGame);
options.forEach((button) => {
  button.addEventListener("click", game);
});
againButton.addEventListener("click", startGame);
