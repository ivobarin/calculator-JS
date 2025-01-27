/*///////////////////////////////////////////
- dot operator is currently not working
- so far, the calculator can add, subtract, multiply, and divide
- if the result of a division is a decimal, it will be rounded to 2 decimal places
- if the result is a decimal, it will be displayed as a integer

I will add more functionality to the calculator in the future and fix this issues 
///////////////////////////////////////////*/

// calculator functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  return operator(a, b);
}

function reset() {
  input.value = "0";
  previousValue = undefined;
  selectedOperator = false;
}

// dom manipulation
const keyNumbers = document.querySelector(".numbers");
const input = document.querySelector("#screen");
let selectedOperator = false;
let previousValue;
const keyOperators = document.querySelector(".operators");
const operators = ["+", "-", "*", "÷", ".", "="];

// create number keys
// -1 is clear and -2 is delete
for (let i = 9; i >= -2; i--) {
  const numberKey = document.createElement("button");
  numberKey.classList.add("key");
  numberKey.type = "button";
  if (i != -1 && i != -2) {
    numberKey.title = i;
    numberKey.textContent = `${i}`;
    numberKey.classList.add("number");
  } else {
    i == -1 ? (numberKey.textContent = "AC") : (numberKey.textContent = "DEL");
    i == -1 ? (numberKey.title = "clear") : (numberKey.title = "delete");
  }
  keyNumbers.appendChild(numberKey);
}

// create operator keys
for (let i in operators) {
  const operatorKey = document.createElement("button");
  operatorKey.classList.add("key");
  operatorKey.type = "button";
  operatorKey.title = operators[i];
  operatorKey.textContent = operators[i];
  keyOperators.appendChild(operatorKey);
}

// add event listeners to number keys
keyNumbers.addEventListener("click", (e) => {
  if (
    previousValue === undefined &&
    input.value === "0" &&
    e.target.textContent != "0"
    || input.value === "Error"
  ) {
    if (e.target.classList.contains("number") || input.value === "Error") {
      // if the first input is not 0, replace it with the number
      input.value = "";
      input.value += e.target.textContent;
      previousValue = input.value.slice(-1);
    }
  } else if (e.target.classList.contains("number")) {
    // if the input is 0, add the number to the input
    input.value += e.target.textContent;
    previousValue = input.value.slice(-1);
  } else if (e.target.title === "clear") {
    // if clear is selected, clear the input
    reset();
  } else if (e.target.title === "delete") {
    // if delete is selected, delete the last character
    input.value = input.value.slice(0, -1);
    previousValue = input.value.slice(-1);

    if (input.value === "") {
      // if the input is empty, set the input to 0
      input.value = "0";
    }
  }
  console.log(input.value);
  console.log(previousValue);
});

keyOperators.addEventListener("click", (e) => {
  // if operator is selected, do not allow another operator to be selected
  if (operators.includes(e.target.title) && e.target.title != "=") {
    if (previousValue === e.target.title || selectedOperator) return;
    input.value += e.target.title;
    previousValue = e.target.title;
    selectedOperator = true;
  }

  // if equals is selected, calculate the result
  if (e.target.title === "=") {
    let firstValue, secondValue, operator, expression;

    expression = input.value.split(/(\+|-|\*|÷)/);
    operator = expression[1];
    firstValue = parseInt(expression[0]);
    secondValue = parseInt(expression[2]);

    let func;
    switch (operator) {
      case "+":
        func = add;
        break;
      case "-":
        func = subtract;
        break;
      case "*":
        func = multiply;
        break;
      case "÷":
        func = divide;
        break;
      default:
        input.value = "Error";
        return;
    }

    if (func === divide && secondValue === 0) {
      input.value = "Error";
      return;
    }

    let result = operate(firstValue, secondValue, func);
    console.log(result)
    if (result % 1 != 0) {
      result = result.toFixed(2);
    } else {
      result = result.toString();
    }

    input.value = result.toString();
    previousValue = result.toString();
    selectedOperator = false;
  }
});

// test the calculator functions in functions.spec.js
//module.exports = { add, subtract, multiply, divide, operate };
