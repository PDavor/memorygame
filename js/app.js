const icons = ["fa fa-smile-o", "fa fa-smile-o", "fa fa-soccer-ball-o", "fa fa-soccer-ball-o", "fa fa-send", "fa fa-send", "fa fa-rocket", "fa fa-rocket", "fa fa-phone-square", "fa fa-phone-square", "fa fa-camera", "fa fa-camera", "fa fa-battery-3", "fa fa-battery-3", "fa fa-book", "fa fa-book"];

const cardsContainer = document.querySelector(".deck");
let openCards = [];
let matchedCards = [];

//start the game function
function start() {
	//create cards in deck
	for(let i = 0; i < icons.length; i++) {
	const card = document.createElement("li");
	card.classList.add("card");
	card.innerHTML = `<i class ="${icons[i]}"></i>`;
	cardsContainer.appendChild(card);
	// add click function to each card
	click(card);
	}
}


//create card click event
function click(card) {
	card.addEventListener("click", function() {
		if(firstClick) {
			stopwatch();
			firstClick = false;
		}
		//if opencards lenght is 1, it means card is open
		if(openCards.length === 1) {
			const currentCard = this;
			const previousCard = openCards[0]
			card.classList.add("open", "show", "disable");
			openCards.push(this)
			//function to compare if cards are matched
			compareCards(currentCard, previousCard);
		}else {
			card.classList.add("open", "show", "disable");
			openCards.push(this);
		}

	});
}

//shuffle array with icons before making board
shuffle(icons);
//start game function call
start();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function compareCards(currentCard, previousCard) {
				//compare opened cards(if currently open and clicked cards have same inner html)
			if(currentCard.innerHTML === previousCard.innerHTML) {
				currentCard.classList.add("match");
				previousCard.classList.add("match");
				//array used to check if matched cards equals lenght of icons array
				matchedCards.push(currentCard, previousCard);
				// reset opencards array if they are matched
				openCards = [];
			}else {
				//timeout will delay open and close when cards aren't matched
				setTimeout(function() {
				currentCard.classList.remove("open", "show", "disable");
				previousCard.classList.remove("open", "show", "disable");
				openCards = [];
				}, 500)

			}
			//functio to count moves
			countMoves();
			//function to see rating(stars)
			rating();
			//check if player won here because we only want to check if its won when it's matched
			endGame();
}



//check if player won game
const modalContentContainer = document.querySelector(".modal-content");
const modalContainer = document.querySelector(".modal")
function endGame() {
	if(matchedCards.length === icons.length) {
		stopStopwatch();
		setTimeout(function(){
			modalContainer.style.display = "block"
			modalContentContainer.innerHTML = `<h1>Congratulations, you won!</h1><p>You finished game with ${moves} moves in ${totalSeconds} seconds!</p>`
			modalContainer.addEventListener("click", function() {
				modalContainer.style.display = "none";
			})
		},500); 
	}
}

//reset game
const restart = document.querySelector(".restart");
restart.addEventListener("click", function() {
	//empty  array of matched cards
	matchedCards = [];
	// empty deck
	cardsContainer.innerHTML = "";
	//reset moves
	moves = 0;
	movesContainer.innerHTML = moves;
	//restart timer
    stopStopwatch();
    firstClick = true;
    totalSeconds = 0;
	counterContainer.innerHTML = "Time: " + totalSeconds + " sec";
	//reset stars
	rating();
	//shuffle array with icons before making board
	shuffle(icons);
	//restart game
	start();
})

//count moves
const movesContainer = document.querySelector(".moves");
let moves = 0;
function countMoves() {
	moves++;
	movesContainer.innerHTML = moves;
}

//rate player
const starsContainer = document.querySelector(".stars");
function rating() {
	if(moves <= 14) {
		starsContainer.innerHTML = `
		<li><i class="fa fa-star"></i></li>
		<li><i class="fa fa-star"></i></li>
		<li><i class="fa fa-star"></i></li>`
	}else if(moves > 14 && moves < 20) {
		starsContainer.innerHTML = `
		<li><i class="fa fa-star"></i></li>
		<li><i class="fa fa-star"></i></li>`
	}else {
		starsContainer.innerHTML = `
		<li><i class="fa fa-star"></i></li>`
	}

}

//stopwatch
let firstClick = true;
const counterContainer = document.querySelector(".counter");
let seconds,
    totalSeconds = 0;
//delay is 1000 miliseconds(1 second)
function stopwatch() {
	seconds = setInterval(function() {
    totalSeconds++;
    counterContainer.innerHTML = "Time: " + totalSeconds + " sec";
    }, 1000);	
}

//stop stopwatch
function stopStopwatch() {
    clearInterval(seconds);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
