let num1, num2, operator;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate() {
    if (operator === "+") return add(num1, num2)
    if (operator === "-") return subtract(num1, num2)
    if (operator === "*") return multiply(num1, num2)
    if (operator === "/") return divide(num1, num2)
}

function setNumber(num) {
    if (num1) {
        num2 = num;
    } else {
        num1 = num;
    }
}