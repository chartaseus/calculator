const MAX_DIGIT = 12;

const display = document.querySelector(".display");
let displayValue = "";

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateDisplay(button.value);
  });
});

function updateDisplay(input) {
  if (displayValue.length <= MAX_DIGIT) {
    displayValue += input;
  }
  display.textContent = `${displayValue}`;
}

const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(a, b) {
	return a * b;
};

const divide = function(a, b) {
  // TODO: round the result if more than display limit.
  // Algorithm: convert result to string,
  // calculate length, use toFixed if length > display.
	return a / b;
};

let num1;
let operator;
let num2;

const operate = function(num1, operator, num2) {
  switch (operator) {
    case "add":
      return add(num1, num2);
      
    case "subtract":
      return subtract(num1, num2);
      
    case "multiply":
      return multiply(num1, num2);
      
    case "divide":
      return divide(num1, num2);
      
    default:
      break;
  }
};