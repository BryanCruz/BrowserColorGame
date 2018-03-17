var colors = [];
var numColors = 6;
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var bgColor = document.querySelector("body").style.backgroundColor;
var display = document.querySelector("#display");

var diffButtons = document.querySelectorAll(".difficulty");

initGame();

function initGame(){
	document.querySelector("#reset").addEventListener("click", resetGame);

	//add difficulty changing
	for(var i = 0; i < diffButtons.length; i++){
		diffButtons[i].addEventListener("click", function(){
			if(!this.classList.contains("clicked")){
				for(var j = 0; j < diffButtons.length; j++){
					diffButtons[j].classList.remove("clicked");
				}
				this.classList.add("clicked");

				if(this.textContent === "Easy"){
					numColors = 3;
				}else{
					numColors = 6;
				}
			resetGame();
			}
		});
	}

	//add the game logic to each square		
	for(var i = 0; i < squares.length; i++){
		//add the game logic to each square
		squares[i].addEventListener("click", compareColor);
	}

	resetGame();
}

function resetGame(){
	//reset display
	display.style.backgroundColor = "#232323";
	document.querySelector("#state").textContent = "";
	document.querySelector("#reset").textContent = "New Colors";

	//choose colors
	chooseColors();

	for(var i = 0; i < squares.length; i++){
		squares[i].style.display = "block";
		if(colors[i]){
			//add colors to squares
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display = "none";
		}
	}

	//choose a random color to guess
	var randNum = Math.floor(Math.random()*colors.length);
	pickedColor = colors[randNum];

	colorDisplay.textContent = pickedColor;
}

function compareColor(){
	var clickedColor = this.style.backgroundColor;
	if(clickedColor === pickedColor){
		endGame();
	}else{
		this.style.backgroundColor = bgColor;
	}
}

function endGame(){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = pickedColor;
	}
	display.style.backgroundColor = pickedColor;
	document.querySelector("#state").textContent = "Congrats";
	document.querySelector("#reset").textContent = "Reset Game";
}

function chooseColors(){
	colors = [];

	for(var i = 0; i < numColors; i++){
		var red   = Math.floor(Math.random()*256);
		var green = Math.floor(Math.random()*256);
		var blue  = Math.floor(Math.random()*256);

		colors[i] = "rgb(" + red + ", " + green + ", " + blue + ")";
	}
}