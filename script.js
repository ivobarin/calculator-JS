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
let isNegative = false;

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
    (previousValue === undefined &&
      input.value === "0" &&
      e.target.textContent != "0") ||
    input.value === "Error"
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
    input.value = "0";
  } else if (e.target.title === "delete") {
    // if delete is selected, delete the last character
    input.value = input.value.slice(0, -1);
    previousValue = input.value.slice(-1);

    if (input.value === "") {
      // if the input is empty, set the input to 0
      input.value = "0";
    }
  }
});

keyOperators.addEventListener("click", (e) => {
  const value = input.value;
  const lastChar = value[value.length - 1];

  // Handle negative numbers at the beginning
  if (value === "0" && e.target.title === "-") {
    input.value = "-";
    return;
  }

  // Handle the dot operator
  if (e.target.title === ".") {
    if (value.includes(".")) return;
    input.value += e.target.title;
    return;
  }

  // Avoid adding multiple operators
  if (operators.includes(e.target.title) && e.target.title != "=") {
    if (operators.includes(lastChar)) {
      // Replace the last operator with the new operator
      input.value = value.slice(0, -1) + e.target.title;
      return;
    }

    // block multiple operators
    if (selectedOperator) return;

    input.value += e.target.title;
    selectedOperator = true;
  }

  // Manage operation when = is clicked
  if (e.target.title === "=") {
    // Reeplace ÷ with / for eval
    const expression = input.value.replace(/÷/g, "/");

    // Check if the expression is valid and create an array with the numbers and operators
    const regex = /^\s*([-+]?\d*\.?\d+)\s*([-+*/])\s*([-+]?\d*\.?\d+)\s*$/;
    const match = expression.match(regex);

    if (!match) {
      input.value = "Error";
      return;
    }

    // destructure the expression into num1, operator, num2
    const [_, num1, operator, num2] = match;
    const firstValue = parseFloat(num1);
    const secondValue = parseFloat(num2);

    // map operator to function
    const operations = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => (b === 0 ? "Error" : a / b),
    };

    // Perform operation
    const result = operations[operator](firstValue, secondValue);

    // Display result
    if (result === "Error") {
      input.value = result;
    } else {
      input.value = Number.isInteger(result) ? result : result.toFixed(6);
    }

    // Reset previous value and selected operator
    selectedOperator = false;
  }
});
