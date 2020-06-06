// init-1/ define var's
const cards = Array.from(document.querySelectorAll('.m-card'));
let hasFlippedCard = false;
let lockBoard = true;
let firstCard, secondCard;
matchedCards = [];
let bMusic;
let flipSound;
let Successs;
let g0c ;
let o0f;
ticker = document.getElementById('info-span-2f');
timer = document.getElementById('info-span-1rem');
let totalClicks = 0;
totalTime = 5;
timeRemaining = totalTime;
ticker.innerText = 0;
lossOverlay = document.getElementById('game-over');

// preload the audio
(function preload() {
  bMusic = new Audio('assets/sounds/Kiss-of-death.mp3');
  flipSound = new Audio('assets/sounds/flip.wav');
  Successs = new Audio('assets/sounds/well-done.wav');
  o0f = new Audio('assets/sounds/oof.wav');
  bMusic.volume = 0.21;
  bMusic.loop = true;
})();
//game over audio
function goc(params) {
  g0c = new Audio('assets/sounds/game-over.wav');
  g0c.play();
}

function init() {
  ticker.innerText = totalClicks;
  totalClicks = 0;
  lockBoard = false;
  bMusic.play();
  let CDInterval = setInterval(countDown, 1000);
  //start the count down timer
  function countDown() {
    timer.innerText = timeRemaining;
      timeRemaining--;
      // if game over
      if(timeRemaining === 0){
      clearInterval(CDInterval);
          gameOver();
      }
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
  
}


// (function shuffle() {
//   cards.forEach(card => {
//     let randomPos = Math.floor(Math.random() * 16);
//     card.style.order = randomPos;
//   });
// })();


// the main event handler
cards.forEach(card => card.addEventListener('click', flipCard));

// if (shown.length == 16) {
//   alert('bob');
// }


// flip sound
// https://freesound.org/s/240776/

// game over
// https://freesound.org/s/277403/

// well done
// https://freesound.org/s/436164/