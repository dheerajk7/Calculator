(function () {
  let expression = "";
  let lastDigit = "";
  let lastNumber = "";
  let digits = [
    ".",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "9",
    "8",
    "9",
    "0",
    "00",
  ];
  let operators = ["+", "-", "/", "*", "%"];
  const result = document.getElementsByClassName("result")[0];
  console.log("Script is running");
  function addDigit(digit) {
    if (digit === "0" || digit === "00") {
      if (lastDigit.length == 0) {
        return;
      } else if (operators.includes(lastDigit)) {
        return;
      } else {
        console.log(lastDigit);
        expression += digit;
        lastNumber += digit;
        lastDigit = "0";
      }
    } else if (digit === ".") {
      if (lastDigit === "." || lastNumber.includes(".")) {
        return;
      } else if (operators.includes(lastDigit) || lastDigit.length == 0) {
        expression += "0.";
        lastDigit = digit;
        lastNumber += digit;
      } else {
        expression += digit;
        lastNumber += digit;
        lastDigit = digit;
      }
    } else {
      expression += digit;
      lastDigit = digit;
      lastNumber += digit;
    }
    result.innerHTML = expression;
  }

  function addOperator(operator) {
    if (lastDigit.length == 0 || lastDigit == ".") {
      console.log("noting");
      return;
    } else if (operators.includes(lastDigit)) {
      console.log("a");
      expression = expression.substring(0, expression.length - 1) + operator;
      lastNumber = "";
      lastDigit = operator;
    } else {
      expression += operator;
      lastNumber = "";
      lastDigit = operator;
    }
    result.innerHTML = expression;
  }

  function evaluateResult() {
    if (expression.length === 0) {
      return;
    }
    var expressionResult = eval(expression);
    if (expressionResult === "Error" || expressionResult === Infinity) {
      result.innerHTML("Error");
      expression = "";
      lastDigit = "";
      lastNumber = "";
    } else {
      expression = expressionResult.toString();
      lastDigit = expression.charAt(expression.length - 1);
      lastNumber = expression;
      result.innerHTML = expression;
    }
  }

  document.addEventListener("click", (e) => {
    let value = e.target.innerText;
    if (digits.includes(value)) {
      addDigit(value);
    } else if (operators.includes(value)) {
      addOperator(e.target.innerText);
    } else if (value === "=") {
      evaluateResult();
    } else if (e.target.id === "clear") {
      expression = "";
      lastNumber = "";
      lastDigit = "";
      result.innerHTML = expression;
    } else if (e.target.id === "delete") {
      if (expression.length === 1) {
        expression = "";
        lastDigit = "";
        lastNumber = "";
      } else {
        expression = expression.substring(0, expression.length - 1);
      }
      result.innerHTML = expression;
    }
  });
})();
