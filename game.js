
/* ::::::::::::: DECLARATION OF VARIABLES :::::::::::: */

var startButtonActivated = true;

var intervals = [];

var lap = 0; // number of laps that user inputs... currently manual.
var horse = ["","horse1", "horse2", "horse3", "horse4"]; // horse array variable to store horse-id, use on various functions.

// variables that stores values related with current width and height of screen
// use in movement and turing of horses.
// distance from top and left side of screen to inner part of track
var leftLaneInner = window.innerWidth * (10/100); // stores 10% of total screen width indicates distance from left part of screen to left side of inner track
var topLaneInner = window.innerHeight * (15/100); // 15% of total height, indicates distance from top part of screen to top side of inner track
var rightLaneInner = window.innerWidth * (70/100); // stores 70% of total screen width, indicates distances from left side of screen to right side of inner track.
var bottomLaneInner = window.innerHeight * (65/100);
// distance from top and left side of screen to outer part of track.
var leftLaneOuter = window.innerWidth * (5/100); // stores 5% of total screen width, indicates distance from left side of screen to left side of outer track.
var topLaneOuter = window.innerHeight * (5/100);
var rightLaneOuter = window.innerWidth * (80/100);
var bottomLaneOuter = window.innerHeight * (80/100);


var trackLength = window.innerWidth * (75/100); // total length of track.

// variables use to, check number of lap completion. 
var finishLine = 0;	// distance from left side to custom created to finish line.(use of offsetLeft)
var lapFinished = 0; // varable that counts the number of lap that have been completed
var lapCounter = 0; // this lap couter value is increased by 1 each, any of the horses touches the finishline.

// variable use to declare the RANK of winners, these value are accessed only in last lap
var rankCount = 1; 
var rank = []; // this array variable stores the horse name, in corresponding to array index value(example, index0 = 1st rank, index 1 = 2nd rank)


// variable for betting system
var betAmount = 0;
var balance = 0;
var selectedHorse; // variable that stores horse which the user selects
var updateAmount = 0;	// amount to be updated after lap ends
var finalAmount = 0; // final amount after lap ends

// variable for user status/updates
var result = false;

/* :::::::::::::: BETTING SYSTEM :::::::::::::::: */


/* :::::::::::::::::: RESULT SCREEN CHANGES ::::::::::::::: */

/* this function is called when the game ends.
 * this function updates the result on screen */
function displayRank(){
	for(var i = 0; i <=3; i++){
		var rankedHorse = rank[i];
		var rankHeads = document.getElementsByTagName('tr')[i + 1];
		var rankHead = rankHeads.getElementsByTagName('td')[1];
		rankHead.className = rankedHorse;
	}
}

/* :::::::::::::::::: Lap Setting  :::::::::::::::::::::  */

function lapDisplay(){
	var getbody = document.getElementsByTagName('body')[0];
	

	var lapDisplayDiv = document.createElement('div');
	lapDisplayDiv.className = 'lapDisplay';

	getbody.appendChild(lapDisplayDiv);

	var selectDiv = document.getElementsByClassName('lapDisplay')[0];
	selectDiv.style.backgroundColor = 'orange';
	selectDiv.style.width = 10 + 'vw'
	selectDiv.style.left = 90 + 'vw';
	selectDiv.style.top = 1 + 'vh';

	var lapText = document.createTextNode(lapFinished + ' / ' + lap);

	selectDiv.appendChild(lapText);
	selectDiv.style.fontSize = 30 + 'px';
	
}

// function that checks if lap is over or not, and calls some onward functions
function checkLap(){

	/* this condition is to prevent from getting the below condition to get true when lapCounter is '0'
	 * without the above condition lapFinished value will increase from the beginning when garme starts. */
	if(lapCounter > 0){ 
		// condition to check if all the horses completes 1 lap.
		if(lapCounter % 4 == 0){
			lapFinished++;  // when the above conditions get true then current lap count is increase by 1, ie lapFinished.
			lapDisplay();	// current display on screen
			lapCounter = 0;
		}
	}

	console.log(lapFinished);	// for checking purpose

	// condition to see if laps are finished
	if(lapFinished >= lap){
		console.log(rank);	// for checking purpose

		displayRank();	// function to change the result screen

		wonOrLost();	// function to check if user won or lost
			
		lapFinished=0;	// reset the lap
//		alert("lapOver");		// for testing purpose

		startButtonActivated = true;	// enables start button

		intervals[5] = setInterval(stopAllIntervals, 2000);		// creating interval that stops all interval, after 2 seconds when lap is over

	}
}

/* ::::::::::::::::::: function to check if the user wins or lose::::::::::::::: */
function wonOrLost(){
	 console.log(rank[0]);
	 console.log(selectedHorse);		// for testing purpose

	if(selectedHorse == rank[0]){
		result = true;
	}

	
	announcement();		// announce the result to user
}

/* :::::::::: function that announce the result to user ::::::::::: */
function announcement(){
	if(result){
		alert('you won');
		won();	// function to make update in user balance when user won
		result = false;		// reset result value 
	}else{
		alert('you loose');
		//lost();	// function to make update in user balance when user lose
	}
}

/* ::::::::::: function that make update on user balance when user wins :::::::: */
function won(){
	updateAmount = betAmount * 2;
	finalAmount = balance + updateAmount;
	setBalance(finalAmount);
}

/* :::::::::: function that make update on user balance when user lost ::::::::: */
function lost(){
	updateAmount = betAmount;
	finalAmount = balance - updateAmount;
	setBalance(finalAmount);
}

/* ::::::::::::: function to stop all intervals :::::::::::::::: */
function stopAllIntervals(){
	for(var i = 0; i <= 5; i++){
		clearInterval(intervals[i]);
		if(i > 0 && i < 5){
			var horses = document.getElementById(horse[i]);
			horses.className = 'horse standRight';
		}
	}
}



/* ::::::::: function to return random number that requires parameter :::::::::: */

function randFloor(number){ // function that takes 1 numeric parameter and returns integer random number from zero '0' to one number less than provided parameter.
	var random = Math.floor(Math.random() * number);
	return random;
}

function randCeil(number){ // function that takes 1 numeric parameter and returns integer random number from '1' to given parameter.
	var random = Math.ceil(Math.random() * number);
	return random;	
}

function rand(number){ 	// function that takes 1 numeric parameter and returns floating point random number from '0' to given parameter.
	var random = Math.random() * number;
	return random;		
}

function randRange(number1, number2){	// function that takes 2 numeric parameter and returns 1 integer random number between the given parameters.
	var inRange = false;	// boolean variable
	var temp = 0;	// temporary variable to make swap possible.

	if(number1 > number2){ // swap the value if number1 is greater then number2
		temp = number1;
		number1 = number2;
		number2 = temp;
	} 

	while(!inRange){	// while loop so that only value between range is given out
		var random = Math.ceil(Math.random() * number2);
		if(random >= number1){
			inRange = true;
		}
	}
	return random;
}




/* :::::::::::: All horses Animation on movement ::::::::::::::::: */

/* ALL the below run functions takes a parameter that indicates to which horse the animation should be applied
 *	this reduces code redundancy for animation of all horses*/

function runLeft(i){ /* all horses animation for running left */
	
	var horses = document.getElementById(horse[i]);  // choose a particular horse div, depending on parameter/argument
	horses.className = 'horse runLeft';
	
}

function runUp(i){ /* all horses animation for running UP */

	var horses = document.getElementById(horse[i]);
	horses.className = 'horse runUp';
	
}

function runRight(i){ /* all horses animation for running right */
	
	var horses = document.getElementById(horse[i]);
	horses.className = 'horse runRight';
	
}

function runDown(i){ /* all horses animation for running DOWN */

	var horses = document.getElementById(horse[i]);
	horses.className = 'horse runDown';
	
}





/* ::::::::: All horses movement speed ::::::::::::::::: */

/* similar to above run function, 
	these move functions also takes parameters, 
	the first parameter 'i' tells which horse to choose to make move
	the second parameter 's' tells by what factor the horse should move
	
	As the track is circular the inner round and the outer round (perimeters) are different which requires each horse to run at different random 
	speed but also each horse should have fixed range of random speed to make the match even, not use of this will be in result, that horse near to innter track would win.

	*/
function moveLeft(i,s){ 	/* make horses move LEFT */
	var random = (rand(4) + (rand(0.1) * s));   // takes random number from custom rand() function
	var horses = document.getElementById(horse[i]);	// selects specific horse div, depends on paramenter/ argument
	var positionLeft = horses.offsetLeft;
	horses.style.left = positionLeft - random + 'px';
}

function moveUp(i,s){ 	/* make horses move UP */
	var random = (rand(4) + (rand(0.1) * s));
	var horses = document.getElementById(horse[i]);
	var positionTop = horses.offsetTop;
	horses.style.top = positionTop - random + 'px';
}

function moveRight(i,s){ 	/* make horses move RIGHT */
	var random = (rand(4) + (rand(0.1) * s));
	var horses = document.getElementById(horse[i]);
	var positionLeft = horses.offsetLeft;

	/* the below if__else.. condition statement is to make sure that the horse div right edge touches the finishline
	   ie. offsetLeft of horseDiv + 96(horse div length) == offsetLeft of finishline.
	   doing so, we can determine that horse reached the finish line... */
	if((positionLeft < finishLine) && ((positionLeft+96) > (finishLine-20))){
			horses.style.left = positionLeft + 1 + 'px';  /* why + 1px? . ie because if we randomize the horse movement at this state 
															due to random numbers the condition (offsetLeft of horseDiv + 96(horse div length) == offsetLeft of finishline)
															might not be true */	
		
	}else{
		horses.style.left = positionLeft + random + 'px';
	}

}

function moveDown(i,s){ 	/* make horses move DOWN */
	var random = (rand(4) + (rand(0.1) * s));
	var horses = document.getElementById(horse[i]);
	var positionTop = horses.offsetTop;
	horses.style.top = positionTop + random + 'px';
}







/* ::::::::: MOVE HORses ::::::::::::::::: */
function moveHorse1(){
	var horse = document.getElementById('horse1');
	var positionTop = horse.offsetTop;
	var positionLeft = horse.offsetLeft;

	if((positionTop - 40 <= topLaneInner) && (positionLeft <= rightLaneOuter)){
		runRight(1);
		moveRight(1, rand(5));	

		/* lap count */
		if(positionLeft + 96 == finishLine){
			lapCounter++;
			// declare rank
			if(lapFinished == lap - 1){
				rank.push('horse1');
			}
		}
	}

	if((positionTop >= bottomLaneInner) && (positionLeft >= leftLaneOuter)){
		runLeft(1);
		moveLeft(1, rand(5));	
	}

	if((positionLeft-100 >= rightLaneInner) && (positionTop <= bottomLaneOuter)){
		runDown(1);
		moveDown(1, rand(5));
		
	} if((positionLeft <= leftLaneInner) && (positionTop >= topLaneOuter)){
		runUp(1);
		moveUp(1, rand(5));
	}
}

function moveHorse2(){
	var horse = document.getElementById('horse2');
	var positionTop = horse.offsetTop;
	var positionLeft = horse.offsetLeft;

	if((positionTop+40 <= topLaneInner) && (positionLeft <= rightLaneOuter)){
		runRight(2);
		moveRight(2, rand(5));	
		/* lap count */
		if(positionLeft + 96 == finishLine){
			lapCounter++;
			// declare rank
			if(lapFinished == lap - 1){
				rank.push('horse2');
			}
		}

		
	} if((positionTop + 10 >= bottomLaneInner) && (positionLeft >= leftLaneOuter)){
		runLeft(2);
		moveLeft(2, rand(5));	
	}

	if((positionLeft-20 >= rightLaneInner) && (positionTop <= bottomLaneOuter)){
		runDown(2);
		moveDown(2, rand(5));
		
	} if((positionLeft-20 <= leftLaneInner) && (positionTop >= topLaneOuter)){
		runUp(2);
		moveUp(2, rand(5));
	}

}

function moveHorse3(){
	var horse = document.getElementById('horse3');
	var positionTop = horse.offsetTop;
	var positionLeft = horse.offsetLeft;

	if((positionTop-40 <= topLaneInner) && (positionLeft <= rightLaneOuter)){
		runRight(3);
		moveRight(3, rand(5));	
		
		/* lap count */
		if(positionLeft + 96 == finishLine){
			lapCounter++;
			// declare rank
			if(lapFinished == lap - 1){
				rank.push('horse3');
			}
		}

		
	} if((positionTop-20 >= bottomLaneInner) && (positionLeft >= leftLaneOuter)){
		runLeft(3);
		moveLeft(3, rand(5));	
	}

	if((positionLeft-30 >= rightLaneInner) && (positionTop <= bottomLaneOuter)){
		runDown(3);
		moveDown(3, rand(5));
		
	} if((positionLeft-60 <= leftLaneInner) && (positionTop >= topLaneOuter)){
		runUp(3);
		moveUp(3, rand(5));
	}

}

function moveHorse4(){
	var horse = document.getElementById('horse4');
	var positionTop = horse.offsetTop;
	var positionLeft = horse.offsetLeft;

	if((positionTop <= topLaneInner) && (positionLeft <= rightLaneOuter)){
		runRight(4);
		moveRight(4, rand(5));	
		/* lap count */
		if(positionLeft + 96 == finishLine){
			lapCounter++;
			// declare rank
			if(lapFinished == lap - 1){
				rank.push('horse4');
			}
		}

	}
	if((positionTop >= bottomLaneInner) && (positionLeft >= leftLaneOuter)){
		runLeft(4);
		moveLeft(4, rand(5));	
	}

	if((positionLeft-10 >= rightLaneInner) && (positionTop <= bottomLaneOuter)){
		runDown(4);
		moveDown(4, rand(5));
		
	}
	if((positionLeft <= leftLaneInner) && (positionTop >= topLaneOuter)){
		runUp(4);
		moveUp(4, rand(5));
	}

}







/* ::::::: bring horses to their start line :::: */
function setHorsesPosition(){
	var positionTop = 1;
	for(var i = 1; i <= 4; i++){
		var horse = document.getElementById('horse' + i);
		horse.style.top = positionTop + 'vh';
		horse.style.left = 20 + 'vw';
		positionTop += 4;
	}
}

/* ::: this function sets the value to finishline which we later check to complete laps and declare winners :::::::*/
function customFinishLineSetting(){

		var divLine = document.getElementsByTagName('div')[0];	// select the first div of html doc. ie. CUSTOM made finish line div
		finishLine = divLine.offsetLeft;	// distance between left side of screen to left side of finishLine div.
}

/* ::::::::::::::::: all kind of intervals are added in this function ::::::::::::::::::::: */
function setAllIntervals(){
	/* interval to move all horses */
	intervals[1] = setInterval(moveHorse1, 11);		
	intervals[2] = setInterval(moveHorse2, 11);
	intervals[3] = setInterval(moveHorse3, 11);
	intervals[4] = setInterval(moveHorse4, 11);

	intervals[0] = setInterval(checkLap, 1);
}

/* :::::::::: function that get user input lap value ::::::::::::::: */
function getLap(){
	var inputLap = document.getElementById("lap");
	lap = inputLap.value;

}

/*:::::::::::: function that get user input betting amount value :::::::::::::::: */
function getBetAmount(){
	var inputAmount = document.getElementById("amount");
	betAmount = inputAmount.value;

}

/* :::::::::::::: function to get Current balance :::::::::::::: */
function getBalance(){
	var currentBalance = document.getElementById('funds');
	balance = parseInt(currentBalance.innerHTML);

	// console.log(balance + 'balance');  	// testing purpose
}

/* ::::::::::::: function to set balance ::::::::::::::::::: */
function setBalance(finalBalance){
	var currentBalance = document.getElementById('funds');
	currentBalance.innerHTML = finalBalance;
}

/* ::::::::: function to get user input horse :::::::::::: */
function getHorse(){
	var getHorse = document.getElementById('bethorse');
	selectedHorse = getHorse.value;
	//console.log(selectedHorse);		// testing purpose
}


/* :::::::: check all User Input Validation :::::::::::::: */
function checkUserInput(){

	var userInputValue = true;
	// condition to check valid lap value
	if(lap < 1 || lap > 5){

		alert('Please Set Lap value between (1-5)');
		startButtonActivated = true; // enables start button

		userInputValue = false;
	}

	// condition to check valid amount
	if(betAmount > balance){	// check if balance is enough to bit
		alert('Not enough balance: your current balance is:: ' + balance);
		console.log('balance ' + balance);
		console.log('betamt ' + betAmount);
		console.log(betAmount - balance);
		userInputValue = false;
		startButtonActivated = true; // enables start button
	}else if(betAmount < 1){	// check if balance is less then ZERO.
		alert('Bet amount must be greater then zero !!');
		userInputValue = false;
		startButtonActivated = true; // enables start button
	}

	return userInputValue;	// return false if any of user input is invalid
}

/*::::::::: function to update balance when game starts :::::::::: */
function initialBalanceUpdate(){
	balance = balance - betAmount;
	setBalance(balance);
}

/* ::::::::: SCRIPT run when START RACE button is pressed ::::::::::::::::: */

function startGame(){
	if(startButtonActivated == true){

		startButtonActivated = false;  // disables start button

		rank = [];	//clear array variable 'rank' that will store rank of horses

		getLap();	// get user input lap

		getBalance();	// get current balance of user
		getBetAmount();	// get user input amount

		getHorse(); 	// get user input horse

		setHorsesPosition();	// calls setHorsesPosition() function

		if(checkUserInput()){
			setAllIntervals();		// calls setAllIntervals(); function
			lapDisplay();
			initialBalanceUpdate(); 
		}
		

		customFinishLineSetting();	// calls customFinishLineSetting() function

	}
}

/* main function */
function startScript(){
	var startButton = document.getElementById('start'); 	// get the element of DOM whose id Is start and store it in variable in startButton
	startButton.addEventListener('click', startGame);		// when startButton(DOM ELEMENT) is clicked startGame Function is called.
}



// after HTML doc file is loaded then function startScript function is called.
document.addEventListener('DOMContentLoaded', startScript);
