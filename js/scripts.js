var newGameButton = document.getElementById('js-newGameButton');

//options to pick
var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');

//other elements
var newGameElem = document.getElementById('js-newGameElement');
var pickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');
var playerPointsElem = document.getElementById('js-playerPoints'),
	playerNameElem = document.getElementById('js-playerName'),
	computerPointsElem = document.getElementById('js-computerPoints')
var playerPickElem = document.getElementById('js-playerPick'),
	computerPickElem = document.getElementById('js-computerPick'),
	playerResultElem = document.getElementById('js-playerResult'),
	computerResultElem = document.getElementById('js-computerResult');

//Game variables
var gameState = 'notStarted';
var player = {
		name: '',
		score: 0
	},
	computer = {
		score: 0
	};

// FUNCTIONS

/* new game */
function newGame() {
	player.name = prompt('wpisz swoje imię', 'imię gracza');
		if (player.name) { 
			player.score = computer.score = 0;
			gameState = 'started';
			setGameElements();

			playerNameElem.innerHTML = player.name;
			setGamePoints();
		}
}

/* set game elements */
function setGameElements() {
	switch(gameState) {
		case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
		break;
		case 'ended':
			newGameButton.innerText = 'Jeszcze raz';
		case 'notStarted' :
		default:
			newGameElem.style.display = 'block';
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
	}
}

/* get computer pick */
function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random()*3)];
}

function firstBeatsOther(first, other) {
	return (first == "rock" && other  == "scissors") || (first == "scissors" && other  == "paper") || (first == "paper" && other  == "rock");
}

/* player pick */
function playerPick(playerPick) {
	var computerPick = getComputerPick();
	if (firstBeatsOther(playerPick, computerPick)) {
		player.score++;
		setGamePoints();
		if (player.score >= 10) {
			alert('Wygrywa: ' + player.name);
			gameState = 'ended';
			setGameElements();
		}
	} else if (firstBeatsOther(computerPick, playerPick)) {
		computer.score++;
		setGamePoints();
		if (computer.score >= 10) {
			alert('Wygrywa: komputer');
			gameState = 'ended';
			setGameElements();
		}
	}
	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;

}





/* set game points */
function setGamePoints() {
		playerPointsElem.innerHTML = player.score;
		computerPointsElem.innerHTML = computer.score;	
}

/* check round winner */
function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player';

		if (playerPick == computerPick) {
			winnerIs = 'none';
		}
		else if ((computerPick == 'rock' && playerPick == 'scissors') || (computerPick == 'scissors' && playerPick == 'paper')
		|| (computerPick == 'paper' && playerPick == 'rock')) {
			winnerIs = 'computer';
		}

		if (winnerIs == 'player') {
   
			playerResultElem.innerHTML = "Wygrana!";
			player.score++;

		}
		else if (winnerIs == 'computer') {
			computerResultElem.innerHTML = "Wygrana!";
			computer.score++;
		}
		setGamePoints();
}

/* first beats other */
//function PlayerBeatsComputer(playerPick, computerPick) {
//  if ((playerPick == "rock" && computerPick  == "scissors") || (playerPick == "scissors" && computerPick  == "paper") || (playerPick == "paper" && computerPick  == "rock"));

//}


	
//event listeners

newGameButton.addEventListener('click', newGame);
pickRock.addEventListener('click', function()
{
	playerPick('rock')
});
pickPaper.addEventListener('click', function()
{
	playerPick('paper')
});
pickScissors.addEventListener('click', function()
{
	playerPick('scissors')
});


//set game elements at start
setGameElements();


	
