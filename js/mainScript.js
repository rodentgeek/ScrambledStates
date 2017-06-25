// Set up the variables.

var states = ["ALABAMA", "ALASKA", "ARIZONA", "ARKANSAS", "CALIFORNIA", "COLORADO", "CONNECTICUT", "DELAWARE", "FLORIDA", "GEORGIA", "HAWAII", "IDAHO", "ILLINOIS", "INDIANA", "IOWA", "KANSAS", "KENTUCKY", "LOUISIANA", "MAINE", "MARYLAND", "MASSACHUSETTS", "MICHIGAN", "MINNESOTA", "MISSISSIPPI", "MISSOURI", "MONTANA", "NEBRASKA", "NEVADA", "NEW HAMPSHIRE", "NEW JERSEY", "NEW MEXICO", "NEW YORK", "NORTH CAROLINA", "NORTH DAKOTA", "OHIO", "OKLAHOMA", "OREGON", "PENNSYLVANIA", "RHODE ISLAND", "SOUTH CAROLINA", "SOUTH DAKOTA", "TENNESSEE", "TEXAS", "UTAH", "VERMONT", "VIRGINIA", "WASHINGTON", "WEST VIRGINIA", "WISCONSIN", "WYOMING"];
var selectedStates = []
var numCorrect = 0;
var timer = 60;

function newTurn(){

	// Clear out the input and message fields.

	document.querySelector("#theInput").value = "";
	document.querySelector("#msgBox").setAttribute("class","centerMe");
	renderDOM("#message", ""); 
	renderDOM("#score", "<i class='fa fa-check-circle' aria-hidden='true'></i> <strong>Score:</strong> " + numCorrect);

	// Randomly select a number to represent 1 of 50 states, but make sure it hasn't already been selected.

	var noDuplicate = false;

	while (!noDuplicate){
		randomNum = Math.floor(Math.random() * 49);
		stateSelected = states[randomNum];
		if (checkUnique(stateSelected, selectedStates)) {
			noDuplicate = true; 
		};
	};

	// Add the selected stated to a list to it being selected again in the future.

	selectedStates.push(stateSelected);

	// Scramble the letters.

	var scrambleLetters = scramble(stateSelected);

	// Render the scambled letter to the page.

	var tags = createTags(scrambleLetters);
	renderDOM("#letters", tags)

	// Create click events.  Decide what happens when the user sumbits an answer.

	renderClick("1", "revealAnswer('" + stateSelected + "')");
	renderClick("2", "evalAns('GIVEUP', '" + stateSelected + "')");

};

function scramble(word){
	var newStr = "";
	while (word.length > 0){
		randNum = Math.floor(Math.random() * word.length);

		if (!(word[0] == word[randNum] && newStr.length == 0)){
			newStr += word[randNum];
			word = word.slice(0,randNum) + word.slice(randNum+1);
		};

	};
	return newStr;
};

function checkUnique(theState, theArray){ 
	for (var i=0; i<theArray.length; i++) {
		if (theState == theArray[i]) {
			return false;
		};
	};
	return true;
}; 

function revealAnswer(word){

	// Make selection buttons inactive.

	renderClick("1", "");
	renderClick("2", "");

	// Decide if given answer is correct.

	var x = document.querySelector("#theInput").value.toUpperCase();
	var result = (x == word) ? "CORRECT" : "WRONG";
	evalAns(result, word);

};

function evalAns(result, word){

	var text = "Correct answer was " + word;
	
	var passMsg = "CORRECT";
	if (result == "WRONG") passMsg = "WRONG - " + text;
	if (result == "GIVEUP")	passMsg = text;
	if (result == "CORRECT") numCorrect++;	

renderDOM("#message", passMsg + " <button id='theButton3' onclick='newTurn()'>Next</button>");
document.querySelector("#msgBox").setAttribute("class","alert alert-info centerMe");

renderDOM("#score", "<i class='fa fa-check-circle' aria-hidden='true'></i> <strong>Score</strong>: " + numCorrect);

};

function renderDOM(id, text){
	document.querySelector(id).innerHTML = text;
}

function renderClick(button, action){
	document.querySelector("#theButton" + button).setAttribute("onclick", action);
}

function theTimer(){
	timer--;
	renderDOM("#timer", "<i class='fa fa-clock-o' aria-hidden='true'></i> <strong>Countdown:</strong> " + timer);

	if (timer == 0) {

	// If the msgBox already says "CORRECT", don't display the correct answer when time is up.

		var x = document.querySelector("#msgBox").innerHTML
		var middleMsg = (x.search("CORRECT") == -1) ? "The correct answer is " + selectedStates[selectedStates.length-1] + ".&nbsp; " : "";

		renderDOM("#message", "TIMES UP!!&nbsp; " + middleMsg + "Click refresh to play again.");
		document.querySelector("#msgBox").setAttribute("class","alert alert-danger centerMe");
		renderClick("1", "");
		renderClick("2", "");
		clearInterval(queueTimer);
	}
}

// Start the game and turn on the timer.

newTurn();
var queueTimer = setInterval(theTimer,1000);