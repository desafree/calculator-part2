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
    return `${placedNumber[0]} ${operator} ${
      placedNumber[1] ? placedNumber[1] : ""
    }`;
  };
  obj.updateCurrentNumber = function updateCurrentNumber(number) {
    currentNumber = Number(number);
  };
  obj.updateOperator = function updateOperator(operatorInserted) {
    this.updateValue();
    operator = String(operatorInserted);
    console.log(operator);
  };
  obj.resetPlacedNumberWithTotal = function () {
    placedNumber = [this.getTotal()];
  };
  obj.updateValue = function () {
    this.moveNumberToArray(currentNumber);
    if (placedNumber.length == 2) {
      console.log("calcTotal fired");
      this.calcTotal();
      this.resetPlacedNumberWithTotal();
    }
  };

  obj.getLength = function () {
    console.log(placedNumber.length == 2);
  };

  return obj;
})();

let operations = {
  "+": function add(number1, number2) {
    return number1 + number2;
  },
  "-": function sub(number1, number2) {
    return number1 - number2;
  },
  "&times;": function mult(number1, number2) {
    return number1 * number2;
  },
  "&#247;": function div(number1, number2) {
    return number1 / number2;
  },
};
