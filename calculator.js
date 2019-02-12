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
    theArray[i].addEventListener('mouseover', mouseOver(theArray[i]));
    theArray[i].addEventListener('mouseout', mouseOut(theArray[i]));
  }
}

function operate(a,b,operator) {
    return (operator === "+") ? add(a,b)
    : (operator === "-") ? subtract(a,b)
    : (operator === "*") ? multiply(a,b)
    : (operator === "/") ? divide(a,b)
    : alert("operator not defined");
}

function mouseOver(button) {
	return function() {
  	button.style.backgroundColor = "#BBBBBB";
  }
}
function mouseOut(button) {
	return function() {
  	button.style.backgroundColor = "#e2e2e2";
  }
}

function onButtonPress(button) {
	return function() {
      //button.style.backgroundColor = "#e2e2e2";
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
      if (button2.includes(button)) {
        if (numberArray.length === operatorArray.length) {
        	return;
        }
      }
      if (displayText.length > 17) {
      	return;
      }
      displayText += text;
  		displayLower.textContent = displayText;
      if (button2.includes(button)) { // operators
      	operatorArray.push(text);
        newNumber = true;
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
    	if (operator === "/" && numberArray[i+1] === "0") {
      	alert("Division by 0!"); 
        return;
      }
    	let number1 = parseFloat(numberArray[i]);
      let number2 = parseFloat(numberArray[i+1]);
      let result = operate(number1, number2, operator);
      if (result.toString().length > 10) {
        result = result.toString()
        result = result.substring(0,10); 
      }
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
