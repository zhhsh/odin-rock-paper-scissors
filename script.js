// test script
// console.log("Hello World")

// generate computer's choice, randomly returns "rock", "paper" or "scissors"
function getComputerChoice() {
	switch (randomIntegerChoice(3)) {
		case 0: return "rock";
		case 1: return "paper";
		case 2: return "scissors";
	}
}

// generate random integer from 0 to n (include 0, not include n)
function randomIntegerChoice(n) {
	return Math.floor(n * Math.random());
}

// test randomIntegerChoice
// for (let i = 0; i < 100; i++) {
// 	console.log(randomIntegerChoice(3));
// }

// test getComputerChoice
// for (let i = 0; i < 100; i++) {
// 	console.log(getComputerChoice());
// }

// ask for player's choice, assume always a valid choice
function getHumanChoice() {
	return prompt("Please choose: rock, paper or scissors");
}

// test getHumanChoice
// console.log(getHumanChoice())

// players' scores
let humanScore = 0;
let computerScore = 0;

// one round play, take two choices as params, update winner's score
function playRound(humanChoice, computerChoice) {
	// format humanChoice into lower case
	humanChoice = humanChoice.toLowerCase()

	// decide the winner from the choices
	let winner; // winner of players
	let result; // String to show the result //  “You lose! Paper beats Rock”.
	if (humanChoice == "rock") {
		if (computerChoice == "paper") {
			winner = "computer";
			result = `You lose! ${computerChoice} beats ${humanChoice}`
		} else if (computerChoice == "scissors") {
			winner = "human";
			result = `You win! ${humanChoice} beats ${computerChoice}`
		} else {
			winner = "no winner"
			result = "Tie! No winner"
		}
	} else if (humanChoice == "paper") {
		if (computerChoice == "rock") {
			winner = "human";
			result = `You win! ${humanChoice} beats ${computerChoice}`
		} else if (computerChoice == "scissors") {
			winner = "computer";
			result = `You lose! ${computerChoice} beats ${humanChoice}`
		} else {
			winner = "no winner"
			result = "Tie! No winner"
		}
	} else if (humanChoice == "scissors") {
		if (computerChoice == "rock") {
			winner = "computer";
			result = `You lose! ${computerChoice} beats ${humanChoice}`
		} else if (computerChoice == "paper") {
			winner = "human";
			result = `You win! ${humanChoice} beats ${computerChoice}`
		} else {
			winner = "no winner"
			result = "Tie! No winner"
		}
	}

	// display the result
	// console.log(result);
	document.querySelector('#result').textContent = result;

	// update winner's score if there's a winner
	switch (winner) {
		case "human":
			humanScore++;
			break;
		case "computer":
			computerScore++;
			break;
	}
	document.querySelector('#user-score').textContent = humanScore;
	document.querySelector('#computer-score').textContent = computerScore;
	if (humanScore >= 5) {
		document.querySelector('#result').textContent = 'User Win';
		document.querySelector('#rps-panel').removeEventListener('click', clickHandler)
		document.querySelector('#reset-btn').style.display = "inline";
	} else if (computerScore >= 5) {
		document.querySelector('#result').textContent = 'Computer Win';
		document.querySelector('#rps-panel').removeEventListener('click', clickHandler);
		document.querySelector('#reset-btn').style.display = "inline";
	}



	return winner, result;
}

// play 5 rounds
function playGame() {

	// test getHumanChoice
	// const humanChoice = getHumanChoice();
	// const computerChoice = getComputerChoice();
	// playRound(humanChoice, computerChoice);

	// play 5 rounds
	for (let i = 0; i < 5; i++) {
		const humanChoice = getHumanChoice();
		const computerChoice = getComputerChoice();
		playRound(humanChoice, computerChoice);
	}

	// declares a finnal winner
	if (humanScore > computerScore) {
		console.log(`Finally, You win! Your scroe is ${humanScore}, and compter's score is ${computerScore}`);
	} else if (humanScore < computerScore) {
		console.log(`Finally, You lose! Your scroe is ${humanScore}, and compter's score is ${computerScore}`);
	} else {
		console.log(`Finally, Tie! Your scroe is ${humanScore}, and compter's score is ${computerScore}`);
	}
}

// playGame();

function clickHandler(e) {
	switch (e.target.textContent) {
		case 'rock':
			console.log('rock');
			playRound('rock', getComputerChoice());
			break;
		case 'paper':
			console.log('paper');
			playRound('paper', getComputerChoice());
			break;
		case 'scissors':
			console.log('scissors');
			playRound('scissors', getComputerChoice());
			break;
	}
}

function resetHandler(e) {
	humanScore = 0;
	computerScore = 0;
	document.querySelector('#user-score').textContent = humanScore;
	document.querySelector('#computer-score').textContent = computerScore;
	document.querySelector('#rps-panel').addEventListener('click', clickHandler);
	document.querySelector('#reset-btn').style.display = "none";
}

document.querySelector('#rps-panel').addEventListener('click', clickHandler);
document.querySelector('#reset-btn').addEventListener('click', resetHandler);