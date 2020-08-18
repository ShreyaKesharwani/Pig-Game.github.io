/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePLayer, gameOngoing;

initialize(); //funtcion to initialize the vars.DRY principle as it is needed at the start of game and when we click on 'new game' 

//events
//selecting events which will happen like button to roll dice => use event listener

document.querySelector('.btn-roll').addEventListener('click',function() {
    
    if(gameOngoing){
        
        //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1; //to generate random number between 1-6 using predefined math functions of JS
    
    //2. Display the result
    var diceDOM=document.querySelector('.dice');
    diceDOM.style.display='block';
    diceDOM.src = "dice-" + dice + ".png";//we want the dice to play the correct png when the dice rolls particular no.
    
    //3. Update the round score IF the rolled number was not 1
      if (dice!==1){
          //Add score
          roundScore+=dice;
          document.querySelector('#current-'+activePLayer).textContent=roundScore;
          
      } else{
          //Next player
          
          nextPlayer();
      }
    }
    
}); //addEventListener('type of event',function that will be called asa event happends=> button clicks) 

//CallBack Function : eventlistner will call this function for us. This is called a callback function. A fucntion which is passed into another function as an argument, and that fucntion(eventListenere here) calls the CallBack function for us

//Anonymous function : A function that doesn't have aname and thus cannot be used outside . Eg : defining a function in the arg of the eventListener fucntion itself. Above we have used that in line 31


//Add another event listerner for HOLD button


document.querySelector('.btn-hold').addEventListener('click',function(){
    
    if(gameOngoing){
        
        //Add current score to global score once hold button is clicked
    scores[activePLayer] += roundScore; //update the score of the active player. Use activePlayer variable as index for array scores
    
    //Update the UI
    document.querySelector('#score-' + activePLayer).textContent=scores[activePLayer];  // the active player should be changed asa we hit hold. Use same old as above -'//Next player'
    //Instead of cpoying code here make another fnction and call it here and above too
    
    
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
        
    if (scores[activePLayer] >= winningScore){
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

//When we click on new gaem
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
          
          //We would need to add another line of code to again remove and add active once player changes. better to sue toggle instead
          //document.querySelector('.player-0-panel').classList.remove('active');
          //document.querySelector('.player-1-panel').classList.add('active'); 
          
          document.querySelector('.dice').style.display='none';
    
}


function initialize(){
 
scores = [0,0];
roundScore =0;
activePLayer = 0;
gameOngoing=true;

//using doc object 'querySelector' (selects element) with textContent we can manipulate the html page such that the id #current-0/1 displays the content of the dice
//document.querySelector('#current-'+activePLayer).textContent=dice;  //use # or . same as in css

//using doc object 'querySelector' and some html (innerHTML)we can manipulate the html page such that #current-0/1 displays the content of the dice and applies em property on the it.
//document.querySelector('#current-'+activePLayer).innerHTML='<em>'+ dice + '</em>';


//using doc object 'querySelector' to change value of CSS (setting dice to display nothing initialy)
document.querySelector('.dice').style.display='none';

document.getElementById('score-0').textContent='0'; //same as document.querySelector but uses id to calli It is faster than the queryselector. 'name of id' unlike '#' or '.' 
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
















