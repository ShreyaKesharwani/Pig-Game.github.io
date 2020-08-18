/* 3 CHALLENGES -- Only first 2 implemented here

1. A player looses his entire score when he rolls to 6's in a row. After that it's the next player's turn 
(HINT : Always save the prev dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100 
(HINT : You can read that value with .value property of JS)
3. Add another dice to the game so that there are 2 dices in the game now. The player looses his current score when one of them is 1 (HINT : You would need CSS to position the 2nd dice)
*/

var scores, roundScore, activePLayer, gameOngoing,prevDice;

initialize(); 

document.querySelector('.btn-roll').addEventListener('click',function() {
    
    if(gameOngoing){
        
        //1. Random number
     var dice = Math.floor(Math.random() * 3) + 1; 
      
    //2. Display the result
     var diceDOM=document.querySelector('.dice');
    diceDOM.style.display='block';
    diceDOM.src = "dice-" + dice + ".png";
        
    //3. Update the round score IF the rolled number was not 1
        
        if (prevDice===3 && dice===3){
       
        scores[activePLayer]=0;
        document.querySelector('#score-' + activePLayer).textContent='0';
        //document.querySelector('#name-' + activePLayer).textContent = "Oops! You rolled two 6's"; --just to check
        window.alert("Oops! You rolled two 6's. You loose all score. It's the next player's turn");
        //document.querySelector('.player-' + activePLayer + '-panel').classList.remove('active');
        nextPlayer();
            
    }
      else if (dice!==1){
          //Add score
          roundScore+=dice;
          document.querySelector('#current-'+activePLayer).textContent=roundScore;
          
      } else{
          //Next player
          
          nextPlayer();
      }
        
        prevDice=dice;
    }
    
}); 

document.querySelector('.btn-hold').addEventListener('click',function(){
    
    if(gameOngoing){
        
    scores[activePLayer] += roundScore;
    
    //Update the UI
    document.querySelector('#score-' + activePLayer).textContent=scores[activePLayer];
    
    //Check if player won the game
    
   var input = document.querySelector('.final-score ').value;
   var winningScore;
        
        //Undefined,0,null or "" are COERCED to false
        //Anything else is COERCED to true
        if(input){
             winningScore=input;
        } 
        else{
            winningScore=100;
        }
        
    if (scores[activePLayer] >= winningScore) {
        document.querySelector('#name-' + activePLayer).textContent = "Winner!!";
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePLayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePLayer + '-panel').classList.remove('active');
       
        gameOngoing=false;
    }
    else{
        
        //Next Player       
        nextPlayer();
    }
    }
    
});

//When we click on new game
document.querySelector('.btn-new').addEventListener('click',initialize);

//DRY principle - make a function for resusability

function nextPlayer(){
    activePLayer === 0 ? activePLayer = 1 : activePLayer = 0; //ternary operator
          roundScore = 0; //so that next player starts from zero
          
          document.getElementById('current-0').textContent=0;
          document.getElementById('current-1').textContent=0;
          
          //to change the active players
          document.querySelector('.player-0-panel').classList.toggle('active');
          document.querySelector('.player-1-panel').classList.toggle('active');
          
           document.querySelector('.dice').style.display='none';
    
    
}


function initialize(){
 
scores = [0,0];
roundScore =0;
activePLayer = 0;
prevDice=0;
gameOngoing=true;


document.querySelector('.dice').style.display='none';

document.getElementById('score-0').textContent='0'; 
document.getElementById('score-1').textContent='0';
document.getElementById('current-0').textContent='0';
document.getElementById('current-1').textContent='0';
document.getElementById('name-0').textContent='Player 1';
document.getElementById('name-1').textContent='Player 2';    
    
//remove winner class from as we don't know who won the game    
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
    
//remove active class from both and assign it to player 1 to restore css style
document.querySelector('.player-1-panel').classList.remove('active');  
document.querySelector('.player-1-panel').classList.remove('active'); 
    
document.querySelector('.player-0-panel').classList.add('active'); 

}

