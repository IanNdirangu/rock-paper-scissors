// First we'll check if “Hello World” is logged in the browser console once you open your webpage.
console.log("Hello World");

// Set the last choice as rock
let lastChoice = "rock";

// Initialize the Human and Computer Scores
let humanScore = 0;
let computerScore = 0;

// For the Human and Computer Choices
let humanChoice = "";
let computerChoice = "";



// Create a function to get the Computer Choice
// Write the logic to get the Computer choice
function getComputerChoice() {
    let choice = "";
    let rand = Math.random();

    let useLast = Math.random() > 0.5;

    if (useLast) {
        lastChoice = "";
    }

    switch (lastChoice) {
        case "rock":
            choice = rand > 0.5 ? "paper" : "scissors";
            break;

        case "paper":
            choice = rand > 0.5 ? "rock" : "scissors";
            break;

        case "scissors":
            choice = rand > 0.5 ? "paper" : "rock";
            break;

        case "":
            choice = rand > 0.33 ? (rand > 0.66 ? "paper" : "scissors") : "rock";
            break;
    }

    lastChoice = choice;

    return choice;

}

// Create a function to get the Human Choice
// Write the logic to get the human choice
function getHumanChoice() {
    if (!text) text = "Select your move:";

    let input = prompt(text);
    console.log("Player selected: " + input);

    input = input.toUpperCase();

    switch (input) {
        case "ROCK":
        case "R":
            input = "rock";
            break;

        case "PAPER":
        case "P":
            input = "paper";
            break;

        case "SCISSORS":
        case "S":
            input = "scissors";
            break;

        default:
            input = "";
            break;
    }

    if (input === "") {
        return getHumanChoice("Please Select: Rock, Paper Or Scissors");
    }

    return input;

}

let selectFX = new Audio('Audio/select.wav');
let select2FX = new Audio('Audio/select2.wav');
let winFX = new Audio('Audio/win.wav');
let loseFX = new Audio('Audio/lose.wav');
let restartFX = new Audio('Audio/restart.wav');

function getHumanChoiceUI(input) {
    selectFX.play();

    input = input.toUpperCase();

    switch (input) {
        case "ROCK":
        case "R":
            input = "rock";
            break;

        case "PAPER":
        case "P":
            input = "paper";
            break;

        case "SCISSORS":
        case "S":
            input = "scissors";
            break;

        default:
            input = "";
            break;
    }

    console.log("player choice " + input);
    playRoundUI(input, getComputerChoice());
}

const resultText = document.querySelector("#resultText");
resultText.textContent = "Pick your choice!";

const humanScoreText = document.querySelector("#humanScore");
const computerScoreText = document.querySelector("#computerScore");

const restartButton = document.getElementById("restart");
restartButton.style.display = "none";
restartButton.addEventListener("click", () => {
    restartFX.play();

    updateScores();

    resultText.textContent = "Pick your choice!";

    restartButton.style.display = "none";
});

function playRoundUI(humanChoice, computerChoice) {
    const message = playRound(humanChoice, computerChoice);

    updateScores();

    resultText.textContent = message;

    if (humanScore != 0 || computerScore != 0) {
        restartButton.style.display = "none";
    }
    if (humanScore >= 5 || computerScore >= 5) {
        restartButton.style.display = "block";
    }

    if (humanScore >= 5) {
        winFX.play();

        resultText.textContent = `Player Wins! Your Score: ${humanScore}`;

        humanScore = 0;
        computerScore = 0;
    }
    if (computerScore >= 5) {
        loseFX.play();

        resultText.textContent = "Computer Wins! You Lose!";

        humanScore = 0;
        computerScore = 0;
    }
}

function updateScores() {
    humanScoreText.textContent = `Player Score: ${humanScore}`;
    computerScoreText.textContent = `Computer Score: ${computerScore}`;
}


// Create a new function named playRound
// Write the logic to play a single round
function playRound(humanChoice, computerChoice) {
    let winner = "tie";
    let message = "Tie! Try again";

    console.log("Player: " + humanChoice + " Computer: " + computerChoice);

    if (humanChoice === "rock") {
        if (computerChoice === "rock") {
            message = "Tie! Rock and Rock!";
        }
        else if (computerChoice === "paper") {
            winner = "computer";
            message = "You Lose! Paper beats Rock!";
        }
        else if (computerChoice = "scissors") {
            winner = "player";
            message = "You Win! Rock beats scissors!";
        }
    }
    else if (humanChoice === "paper") {
        if (computerChoice === "rock") {
            winner = "player";
            message = "You Win! Paper beats Rock!";
        }
        else if (computerChoice === "paper") {
            message = "Tie! Paper and Paper!";
        }
        else if (computerChoice = "scissors") {
            winner = "computer";
            message = "You Lose! Scissors beats Paper!";
        }
    }
    else if (humanChoice = "scissors") {
        if (computerChoice === "rock") {
            winner = "computer";
            message = "You Lose! Rock beats Scissors!";
        }
        else if (computerChoice === "paper") {
            winner = "player";
            message = "You Win! Scissors beats Paper!";
        }
        else if (computerChoice = "scissors") {
            message = "Tie! Scissors and Scissors!";
        }
    }

    switch (winner) {
        case "player":
            humanScore++;
            select2FX.play();
            break;
        case "computer":
            computerScore++;
            break;
    }

    console.log("Player Score: " + humanScore + " Computer Score: " + computerScore);
    return message;
}

// Create a new function named playGame
// Write the logic to play the entire game
function playGame() {
    for (i = 0; i < 5; i++) {
        alert(playRound(getHumanChoice(), getComputerChoice()));
    }

    if (humanScore > computerScore) {
        console.log("Player Wins: " + humanScore + " > " + computerScore);
        alert("You Win! Your score: " + humanScore + " Computer score: " + computerScore);
    }
    else if (computerScore > humanScore) {
        console.log("Computer Wins: " + computerScore + " > " + humanScore);
        alert("You Lose! Computer score: " + computerScore + " Your score: " + humanScore);
    }
    else {
        console.log("Draw: Computer: " + computerScore + " Player: " + humanScore);
        alert("Draw! Your score: " + humanScore + " Computer score: " + computerScore);
    }
}