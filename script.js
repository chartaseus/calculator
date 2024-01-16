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
  // TODO: round the result if more than display limit. Algorithm: convert
  // result to string, calculate length, use toFixed if length > display.
	return a / b;
};

let num1;
let operator;
let num2;