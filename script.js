// import { default as Prova } from "./modules/prova.js";

// let prova = new Prova("ciao");
// prova.funzioneProva();
// prova.funzioneProva2();
// console.log(prova);

const calculator = (function createCalculator() {
  let placedNumber = [];
  let total = 0;
  let operator = "";
  let currentNumber = "";
  let equalTriggered = false;

  const obj = {};
  obj.moveNumberToArray = function moveNumberToArray(number) {
    placedNumber.push(Number(number));
  };
  obj.calcTotal = function calcTotal() {
    if (
      placedNumber[0] == 0 &&
      operator == "÷" &&
      typeof placedNumber[0] == "number"
    ) {
      this.clear();
    }
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
    if ((currentNumber.match(new RegExp(/\./g)) || []).length > 1) {
      this.clear();
    }
    let stringValue = String(currentNumber) + String(inputNumber);
    console.log(stringValue);
    currentNumber = stringValue;
    display.updateDisplay(this.getCurrentNumber());
  };

  obj.deleteCharCurrentNumber = function deleteCharCurrentNumber() {
    let stringValue = String(currentNumber);
    if (stringValue.length > 0) {
      currentNumber = Number(stringValue.slice(0, -1));
      console.log(stringValue);
      display.updateDisplay(this.getCurrentNumber());
    }
    if (equalTriggered) {
      this.clear();
    }
  };

  obj.getCurrentNumber = function getCurrentNumber() {
    return currentNumber;
  };
  obj.resetCurrentNumber = function resetCurrentNumber() {
    currentNumber = "";
  };
  obj.updateOperator = function updateOperator(operatorInserted) {
    if (!equalTriggered) {
      this.updateValue();
    }

    operator = String(operatorInserted);
    console.log(operator);
    equalTriggered = false;
  };
  obj.resetPlacedNumberWithTotal = function () {
    placedNumber = [this.getTotal()];
  };
  obj.calcEqual = function calcEqual() {
    if (equalTriggered) {
      this.clear();
    } else {
      equalTriggered = true;
      this.moveNumberToArray(currentNumber);
      this.resetCurrentNumber();
      display.updateUpperDisplay(this.getString());
      if (placedNumber.length == 2) {
        console.log("calcTotal fired");
        this.calcTotal();
        operator = "";
        this.resetPlacedNumberWithTotal();
        display.updateDisplay(this.getTotal());
      }
    }
  };
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

  obj.clear = function objClear() {
    placedNumber = [];
    total = 0;
    operator = "";
    currentNumber = "";
    equalTriggered = false;
    display.updateDisplay();
    display.updateUpperDisplay();
  };

  return obj;
})();

const operations = {
  "+": function add(number1, number2) {
    return (number1 + number2).toFixed(3);
  },
  "-": function sub(number1, number2) {
    return (number1 - number2).toFixed(3);
  },
  "×": function molt(number1, number2) {
    return (number1 * number2).toFixed(3);
  },
  "÷": function div(number1, number2) {
    return (number1 / number2).toFixed(3);
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

const total = document.querySelector(".total");
total.addEventListener("click", () => {
  calculator.calcEqual();
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", calculator.clear);

const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", () => {
  calculator.deleteCharCurrentNumber();
});
