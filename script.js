const calculator = (function createCalculator() {
  let placedNumber = [];
  let total = 0;
  let operator = "";
  let currentNumber = 0;

  const obj = {};
  obj.moveNumberToArray = function moveNumberToArray(number) {
    placedNumber.push(Number(number));
  };
  obj.calcTotal = function calcTotal() {
    total = operations[operator](placedNumber[0], placedNumber[1]);
  };
  obj.getTotal = function getTotal() {
    return total;
  };
  obj.getString = function getString() {
    return `${placedNumber[0] ? placedNumber[0] : ""} ${
      operator ? operator : ""
    } ${placedNumber[1] ? placedNumber[1] : ""}`;
  };
  obj.updateCurrentNumber = function updateCurrentNumber(inputNumber) {
    // currentValue = String(currentNumber) + inputNumber;
    let stringValue = String(currentNumber) + String(inputNumber);
    currentNumber = Number(stringValue);
    display.updateDisplay(this.getCurrentNumber());
  };
  obj.getCurrentNumber = function getCurrentNumber() {
    return currentNumber;
  };
  obj.resetCurrentNumber = function resetCurrentNumber() {
    currentNumber = 0;
  };
  obj.updateOperator = function updateOperator(operatorInserted) {
    if (!(operator == "=")) {
      this.updateValue();
    } else {
      this.resetCurrentNumber();
      display.updateUpperDisplay(this.getString());
    }
    operator = String(operatorInserted);
    console.log(operator);
  };
  obj.resetPlacedNumberWithTotal = function () {
    placedNumber = [this.getTotal()];
  };
  //   obj.calcEqual = function calcEqual() {
  //     this.moveNumberToArray(currentNumber);
  //     this.resetCurrentNumber();
  //     display.updateUpperDisplay(this.getString());
  //     if (placedNumber.length == 2) {
  //       console.log("calcTotal fired");
  //       this.calcTotal();
  //       operator = "=";
  //       this.resetPlacedNumberWithTotal();
  //       display.updateDisplay(this.getTotal());
  //     }
  //   };
  obj.updateValue = function () {
    this.moveNumberToArray(currentNumber);
    this.resetCurrentNumber();
    display.updateUpperDisplay(this.getString());
    if (placedNumber.length == 2) {
      console.log("calcTotal fired");
      this.calcTotal();
      this.resetPlacedNumberWithTotal();
      display.updateDisplay(this.getTotal());
    }
  };

  obj.getLength = function () {
    console.log(placedNumber.length == 2);
  };

  return obj;
})();

const operations = {
  "+": function add(number1, number2) {
    return number1 + number2;
  },
  "-": function sub(number1, number2) {
    return number1 - number2;
  },
  "×": function molt(number1, number2) {
    return number1 * number2;
  },
  "÷": function div(number1, number2) {
    return number1 / number2;
  },
};

const display = (function createDisplayCommand() {
  const displayBox = document.querySelector(".display");
  const upperDisplay = document.querySelector(".upperDisplay");

  const obj = {};

  obj.updateDisplay = function updateDisplay(value) {
    displayBox.textContent = value;
  };
  obj.updateUpperDisplay = function updateUpperDisplay(value) {
    upperDisplay.textContent = value;
  };

  return obj;
})();

const operationButtons = document.querySelectorAll(".operation");
operationButtons.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    calculator.updateOperator(e.target.innerHTML);
  });
});

const numbersButtons = document.querySelectorAll(".number");
numbersButtons.forEach((number) => {
  number.addEventListener("click", (e) => {
    calculator.updateCurrentNumber(e.target.innerHTML);
  });
});

// const total = document.querySelector(".total");
// total.addEventListener("click", () => {
//   calculator.calcEqual();
// });
