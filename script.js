'use strict';

//Selecting Elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const scroe1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

const switchPlayer = function () {
  // Switch to the next Player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Changing the Background color of the active player
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

const init = function () {
  // Starting Condtions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceElement.classList.add('hidden');
  score0Element.textContent = 0;
  scroe1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};

init();

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    //2. Display Dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    //3 Check if the dice rolled 1: if true, switch to the next player
    if (dice !== 1) {
      // Add dice to current score
      // currentScore += dice;
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// BtnHold EeventListener
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add the Current score to active Player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if the players score is >=100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceElement.classList.add('hidden');
      // Add the player winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // Remove the player active class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
