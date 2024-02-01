const MAX_DIGIT = 12;

const display = document.querySelector(".display");
let displayValue = "";

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateDisplay(button.value);
    assignOperand();
  });
});

const backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click", () => {
  let previousDisplayValue = displayValue;
  displayValue = "";
  updateDisplay(previousDisplayValue.slice(0, -1));
  assignOperand();
});

const operatorButtons = document.querySelectorAll(".operator");

// When one of the operator buttons is clicked:
// 1. Assign the button value to `operator` variable
// 2. Reset displayValue variable for num2 input
// 3. If chain operation (e.g. 1 + 2 + ...):
//    calculate the previous pair of number
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
  if (operator == "divide" && num2 === 0) {
    alert("LOL this user's trying to divide by zero 🫵😆");
    return;
  }
  calculate();

  // Reset `operator` value only if calculate() is called
  // by the equals button,
  // not by operator button on chain operation
  operator = "";
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
  num1 = null;
  num2 = null;
  operator = "";
  displayValue = "";
  display.textContent = "0";
});

function assignOperand(number = parseFloat(displayValue)) {
  if (!operator) {
    num1 = number;
  } else {
    num2 = number;
  }
}

function calculate() {
  // 1. Call operate()
  // 2. Update display with operation result
  // 3. Assign the result to `num1` for next operation
  //    (Will be used if user click operator button
  //    but will be overwritten if user clicks
  //    number button before operator button)
  // 4. Reset `num2` variable
  result = operate(num1, operator, num2);
  
  // So that the result appear on its own,
  // not appended to the second operand (num2)
  displayValue = "";

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
  display.textContent = `${displayValue || "0"}`;
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
  let intLength = (Math.round(number)).toString().length;
  if (stringResult.length > MAX_DIGIT) {
    if (intLength > MAX_DIGIT) {
      return number.toExponential(MAX_DIGIT - 6);
    } else if (intLength == MAX_DIGIT) {
      return Math.round(number);
    }
    return number.toFixed((MAX_DIGIT - 1) - intLength);
  }
  return number;
}