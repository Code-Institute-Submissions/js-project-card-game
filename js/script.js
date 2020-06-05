const cards = document.querySelectorAll('.m-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
// let shown = [];
matchedCards = [];



class AudioController {
  constructor() {
    this.bMusic = new Audio('assets/sounds/oof.wav');
    this.flipSound = new Audio('assets/sounds/oof.wav');
    this.matchSound = new Audio('assets/sounds/oof.wav');
    this.Successs = new Audio('assets/sounds/oof.wav');
    this.gameOverClip = new Audio('assets/sounds/oof.wav');
    this.o0f = new Audio('assets/sounds/oof.wav');
    this.bMusic.volume = 0.6;
    this.bMusic.loop = true;
  }
  startMusic() {
    this.bMusic.play();
  }
  stopMusic() {
    this.bMusic.pause();
  }
  oof() {
    this.bMusic.volume = 0.2;
    this.o0f.play();
    setTimeout(function() {
      this.bMusic.volume = 0.6;
    }, 1600);
    // + cursor
  }
  flip() {
    this.flipSound.play();
  }
  match() {
    this.matchSound.play();
  }
  success() {
    this.successSound.play();
    this.stopMusic();
  }
  gameOver() {
    this.gameOverClip.play();
    //this.startMusic();
  }
}




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

cards.forEach(card => card.addEventListener('click', flipCard));

// if (shown.length == 16) {
//   alert('bob');
// }