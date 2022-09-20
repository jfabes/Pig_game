'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scoreElement0 = document.querySelector('#score--0');
// # is only used to get ids not classes
const scoreElement1 = document.getElementById('score--1');
//both variables above are ways to select elements with their unque ids

const diceElement = document.querySelector('.dice')
const player1score = document.querySelector('#current--0');
const player2score = document.querySelector('#current--1')
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player1 = document.querySelector('#name--0');
const player2 = document.querySelector('#name--1');


//starting conditions
let scores, currentScore, activePlayer, playing;

function init(){
    currentScore = 0;
    activePlayer = 0
    scores = [0,0];
    playing = true;

    scoreElement0.textContent = 0
    scoreElement1.textContent = 0
    player1score.textContent = 0
    player2score.textContent = 0

    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
    diceElement.classList.add('hidden');
}

init();

function switcharoo(){
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
       //if active player === 0 then it will switch to one but if it is 1 then it will switch to 0

    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

btnRoll.addEventListener('click', function(){
    if (playing){
        //generating random dice 
        let dice = Math.trunc(Math.random() * 6) + 1

        //displaying dice 
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;

        //check for rolled 1
        
        if (dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else{
            switcharoo();
        }
    }
})

btnHold.addEventListener('click', function() {
    if (playing){
        scores[activePlayer] += currentScore;

        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
        //check if currentscore is >= 100

        if (scores[activePlayer] >= 100){
            //finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')

            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            //we remove the active player class when we win because we dont want both the active player on and the winner class on at the same time
        }

        //switch player
        switcharoo();
    }
})

btnNew.addEventListener('click',init);



