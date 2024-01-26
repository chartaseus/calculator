const MAX_DIGIT = 12;

const display = document.querySelector(".display");
let displayValue = "";

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateDisplay(button.value);
    if (operator == "") {
      num1 = parseFloat(displayValue);
    } else {
      num2 = parseFloat(displayValue);
    }
  });
});

const operatorButtons = document.querySelectorAll(".operator");

// When one of the operator buttons is clicked,
// do the following:
// 1. Assign the button value to `operator` variable
// 2. Assign the display value to `num1` variable
// 3. Reset displayValue variable for num2 input
// 4. If chain operation (e.g. 1 + 2 + ...):
//    a. operate the previous pair of number
//    b. use the result as num1 for this operation
//    c. reset num2 variable
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (operator !== "" && num2 !== null) {
      calculate();
    }

    operator = button.value;
    displayValue = "";
  });
});

let result = 0;
const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", () => {
  calculate();
  operator = "";
})

function calculate() {
  // 1. Assign displayValue to num2 variable
  // 2. Call operate()
  // 3. Update display with operation result
  // 4. Assign the result to num1 for next operation
  //    (Will be used if user click operator button
  //    but will be overwritten if user clicks
  //    number button before operator button)
  // 5. Reset `operator` and `num2` variable
  displayValue = "";
  result = operate(num1, operator, num2);
  updateDisplay(result);
  num1 = parseFloat(displayValue);
  num2 = null;
  
  // To allow starting new operation
  // without clicking the clear button
  displayValue = "";
}

function updateDisplay(input) {
  if (displayValue.length < MAX_DIGIT) {
    displayValue += input;
  }
  display.textContent = `${displayValue}`;
}

function add(a, b) {
	return a + b;
};

function subtract(a, b) {
	return a - b;
};

function multiply(a, b) {
	return a * b;
};

function divide(a, b) {
  // TODO: round the result if more than display limit.
  // Algorithm: convert result to string,
  // calculate length, use toFixed if length > display.
	return a / b;
};

let num1 = null;
let operator = "";
let num2 = null;

function operate(num1, operator, num2) {
  let operationResult;
  
  switch (operator) {
    case "add":
      operationResult = add(num1, num2);
      break;
      
    case "subtract":
      operationResult = subtract(num1, num2);
      break;
      
    case "multiply":
      operationResult = multiply(num1, num2);
      break;
      
    case "divide":
      operationResult = divide(num1, num2);
      break;
  }

  return roundToMaxDigit(operationResult);
}

function roundToMaxDigit(number) {
  let stringResult = number.toString();
  if (stringResult.length > MAX_DIGIT) {
  return (number).toFixed(
    (MAX_DIGIT - 1) - Math.round(number).toString().length
  );
  }
  return number;
}