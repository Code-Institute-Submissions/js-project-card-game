const cards = document.querySelectorAll('.m-card');


// init-1/ define var's
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
// let shown = [];
matchedCards = [];


// preload the audio
(function preload() {
  "use strict"; bMusic = new Audio('assets/sounds/Kiss-of-death.mp3');
  flipSound = new Audio('assets/sounds/flip.wav');
  Successs = new Audio('assets/sounds/well-done.wav');
  gameOverClip = new Audio('assets/sounds/game-over.wav');
  o0f = new Audio('assets/sounds/oof.wav');
  bMusic.volume = 0.21;
  bMusic.loop = true;
})();




function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('show');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.img === secondCard.dataset.img;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  matchedCards ++;
  console.log(matchedCards)
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('show');
    secondCard.classList.remove('show');

    resetBoard();
  }, 1369);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// (function shuffle() {
//   cards.forEach(card => {
//     let randomPos = Math.floor(Math.random() * 16);
//     card.style.order = randomPos;
//   });
// })();


// main event handler
cards.forEach(card => card.addEventListener('click', flipCard));

// if (shown.length == 16) {
//   alert('bob');
// }