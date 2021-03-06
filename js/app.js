/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


var scores, roundScore, activePlayer,player1,player2, activeGame, dice1DOM,dice2DOM;

var player1Name = 'Player 1';
var player2Name = 'Player 2';
const imgPrefix='img/';

function init(){
    scores=[0,0];
    roundScore=0;
    activePlayer=0;
    activeGame=true;
   
    
    dice1DOM=document.querySelector('.dice1');
    dice1DOM.style.display='none';
    dice2DOM=document.querySelector('.dice2');
    dice2DOM.style.display='none';

    document.getElementById('score-0').textContent=0;
    document.getElementById('score-1').textContent=0;
    document.getElementById('current-0').textContent=0;
    document.getElementById('current-1').textContent=0;

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');


    document.querySelector('.player-0-panel').classList.add('active');
    
    document.getElementById('name-0').textContent=player1Name;
    document.getElementById('name-1').textContent=player2Name;

    
}

init();

document.querySelector('.btn-roll').addEventListener('click',()=>{
    if(activeGame){
        //1. Random number

        var dice1=Math.floor(Math.random()*6)+1;
        var dice2=Math.floor(Math.random()*6)+1;
        //2. Display the result (dice image)
        dice1DOM.style.display='block';
        dice1DOM.src=imgPrefix+'dice-'+dice1+'.png';

        dice2DOM.style.display='block';
        dice2DOM.src=imgPrefix+'dice-'+dice2+'.png';
        //3. Update score
    


        //If dice ===1, set current to 0 and change activePlayer
        //else add dice to current
        if(dice1==6&&dice2===6){
            scores[activePlayer]=0;
            document.getElementById('score-'+activePlayer).textContent=0;
            document.getElementById('current-'+activePlayer).textContent=0;
            nextPlayer();

        }else if(dice1===1||dice2===1){
            roundScore=0;
            document.getElementById('current-'+activePlayer).textContent=0;
            nextPlayer();
        }else{
            roundScore+=dice1+dice2;
            document.getElementById('current-'+activePlayer).textContent=roundScore;
        }

}
});
document.querySelector('.btn-hold').addEventListener('click',()=>{
    if(activeGame){
    //hold function
    //add current to score
    //set current to 0
    //if score >=100, winner
    //else change active player
        scores[activePlayer]=scores[activePlayer]+roundScore;
        document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];
        roundScore=0;
        document.getElementById('current-'+activePlayer).textContent=roundScore;
        var finalScore=document.querySelector('.final-score').value;
        if(!finalScore){
            finalScore=100;
        }
        console.log(finalScore);

        if(scores[activePlayer]>=finalScore){
            document.getElementById('name-'+activePlayer).textContent='Winner!';
            activeGame=false;
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        }else{
            nextPlayer();
        }  
    }  
});

document.querySelector('.btn-new').addEventListener('click',init);


function nextPlayer(){
    
    activePlayer=activePlayer?0:1;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

}


   
document.getElementById('name-0').addEventListener('click',()=>{
    document.querySelector('.input-player-0').style.display='block';
    document.querySelector('.input-player-0').focus();
});
document.querySelector('.input-player-0').addEventListener('keyup',()=>{
 
    document.getElementById('name-0').textContent=document.querySelector('.input-player-0').value;

});
document.querySelector('.input-player-0').addEventListener('blur',()=>{
    

    document.querySelector('.input-player-0').style.display='none';
    if(!document.getElementById('name-0').textContent){
        document.getElementById('name-0').textContent=player1Name;
    }else{
        player1Name=document.querySelector('.input-player-0').value;
    }  
});



document.getElementById('name-1').addEventListener('click',()=>{
    document.querySelector('.input-player-1').style.display='block';
    document.querySelector('.input-player-1').focus();
});
document.querySelector('.input-player-1').addEventListener('keyup',()=>{
    
    document.getElementById('name-1').textContent=document.querySelector('.input-player-1').value;

});
document.querySelector('.input-player-1').addEventListener('blur',()=>{
    document.querySelector('.input-player-1').style.display='none';
    if(!document.getElementById('name-1').textContent){
        document.getElementById('name-1').textContent=player2Name;
    }  else{
        player2Name=document.querySelector('.input-player-1').value;
    }
});