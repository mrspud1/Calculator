let add = (a,b) => a+b;
let subtract = (a,b) => a-b;
let multiply = (a,b) => a*b;
let divide = (a,b) => a/b;
let button1 = [];
let button2 = [];
let displayText = "";
let displayUpper = document.querySelector("#displayUpper");
let displayLower = document.querySelector("#displayLower");
let operatorArray = [];
let numberArray = [];
let newNumber = true;

function init() {
	let button1NodeList = document.querySelectorAll(".buttons");
  let button2NodeList = document.querySelectorAll(".buttons2");
  button1 = Array.from(button1NodeList);
  button2 = Array.from(button2NodeList);
  setEventListener(button1);
  setEventListener(button2);
}
init();
reset();

function setEventListener(theArray) {
	for (let i = 0; i < theArray.length; i++) {
  	theArray[i].addEventListener('click', onButtonPress(theArray[i]));
  }
}

function operate(a,b,operator) {
    return (operator === "+") ? add(a,b)
    : (operator === "-") ? subtract(a,b)
    : (operator === "*") ? multiply(a,b)
    : (operator === "/") ? divide(a,b)
    : alert("operator not defined");
}


function onButtonPress(button) {
	return function() {
      let text = button.textContent;
      if (text === "=") {
      	if (numberArray.length < 1) {
        	return;
        }
      	equals();
        return;
      }
      if (text === ".") {
      	if (!newNumber && numberArray[numberArray.length-1].indexOf(".") != -1) {
         return;
        }
      }
      if (text === "⌫") {
      	reset();
        return;
      }
      displayText += text;
  		displayLower.textContent = displayText;
      if (button2.includes(button)) { // operators
      	operatorArray.push(text);
        newNumber = true;
        console.log(numberArray, operatorArray);
      } else if (newNumber) {
				newNumber = false;
        numberArray[numberArray.length] = text;
      } else {
      	numberArray[numberArray.length-1] += text;
      }
  }
}

function calculation(operator) {
	for (let i = 0; i < operatorArray.length; i++) {
  	if (operatorArray[i] === operator) {
    	let number1 = parseFloat(numberArray[i]);
      let number2 = parseFloat(numberArray[i+1]);
      let result = operate(number1, number2, operator);
      numberArray.splice(i, 1, result);
      numberArray.splice(i+1, 1);
      operatorArray.splice(i, 1);
      i--;
    }
  }
}

function equals() {
	for (let i = 1; i < button2.length; i++) { //i=1 to exclude the clear key. This should do multiplication before addition.
  	calculation(button2[i].textContent);
  }
  displayLower.innerText = numberArray[0];
  displayUpper.innerText = displayText;
  displayText = displayLower.innerText;
}

function reset() {
	numberArray = [];
  operatorArray = [];
  newNumber = true;
  displayUpper.textContent = "0";
  displayLower.textContent = "0";
  displayText = "";
}
