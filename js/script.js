/*jshint esversion: 6 */
// jslint esversion: 6
// init-1/ define var's
const cards = Array.from(document.querySelectorAll('.m-card'));
cardsArray = cards;
let hasFlippedCard = false;
let lockBoard = true;
let firstCard, secondCard;
matchedCards = [];
let N = 16;
let bMusic;
let flipSound;
let win;
let g0c ;
let o0f;
ticker = document.getElementById('info-span-2f');
timer = document.getElementById('info-span-1rem');
let totalClicks = 0;
totalTime = 89;
timeRemaining = totalTime;
ticker.innerText = 0;
lossOverlay = document.getElementById('game-over');
victoryOverlay = document.getElementById('victory');
//cursor
let elementForCur = document.getElementsByTagName("body")[0];
elementForCur.style.cursor = "url('assets/cur/ani547.cur'), url('nezuko-kamado.cur'), auto";
let countDown;

// preload the audio
(function preload() {
  bMusic = new Audio('assets/sounds/Kiss-of-death.mp3');
  flipSound = new Audio('assets/sounds/flip.wav');
  o0f = new Audio('assets/sounds/oof.wav');
  bMusic.volume = 0.21;
  bMusic.loop = true;
})();
//game over + victory audio - load
function goc() {
  g0c = new Audio('assets/sounds/game-over.wav');
  g0c.play();
}

function init() {
  // the main event handler
  cards.forEach(card => card.addEventListener('click', flipCard));
  totalClicks = 0;
  ticker.innerText = totalClicks;
  lockBoard = false;
  bMusic.play();
  let CDInterval = setInterval(countDown, 1000);
  //start the count down timer
  function countDown() {
    timer.innerText = timeRemaining;
      timeRemaining--;
      // if game over
      if(timeRemaining === 0) {
      clearInterval(CDInterval);
          gameOver();
      }
      //if win
      else if (matchedCards === N /2) {
        clearInterval(CDInterval);
      };
  }
}

function flipCard() {
  if (lockBoard) {return};
  flipSound.play();
  ticker.innerText = totalClicks;
  if (this === firstCard) return;
  this.classList.add('show');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    totalClicks++;

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
  console.log(matchedCards);
  resetBoard();
  if (matchedCards === N /2) {
    succsessScreen();
  }
}

function unflipCards() {
  o0f.play();

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

function gameOver() {
  lossOverlay.classList.add('show');
  goc();
  lockBoard = true;
}

//reset timer + flips
function restart() {
  lossOverlay.classList.remove('show');
  victoryOverlay.classList.remove('show');
  totalTime = 89;
  ticker.innerText = 0;
  timer.innerText = 89;
  timeRemaining = 89;
  matchedCards = [];
  resetBoard();
  hideCards();
}

function hideCards() {
  cardsArray.forEach(card => {
    card.classList.remove('show');
});
}

//victory overlay + audio define/load/play
function succsessScreen() {
  victoryOverlay.classList.add('show');
  win = new Audio('assets/sounds/well-done.wav');
  win.play();
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * N);
    card.style.order = randomPos;
  });
})();