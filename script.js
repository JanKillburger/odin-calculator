let num1, num2, operator;
num1 = num2 = operator = '';

let controls = document.getElementById('controls');
let display = document.getElementById('display');
document.getElementById('evaluate').addEventListener('click', evaluate);
controls.querySelectorAll('.digit, .operator').forEach(btn => btn.addEventListener('click', (ev) => handleInput(ev)));
document.getElementById('clear').addEventListener('click', clear);

function operate() {
    if (num1 == '' || num2 == '') throw new Error("Function operate: at least one operand is undefined.");
    const operand1 = parseFloat(num1);
    const operand2 = parseFloat(num2);
    if (operator === "+") return add(operand1, operand2);
    if (operator === "-") return subtract(operand1, operand2);
    if (operator === "*") return multiply(operand1, operand2);
    if (operator === "/") return divide(operand1, operand2);
    throw new Error(`Function operate: invalid operator: ${operator}`);
}

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
    if (num2 === 0) throw new Error("function divide: division by zero");
    return num1 / num2;
}

function updateNumbers() {
    num1 = operate(num1, operator, num2);
    num2 = '';
}

function handleInput(ev) {
    const type = ev.target.classList.contains('operator') ? 'operator' : ev.target.classList.contains('digit') ? 'number' : '';
    if (type == 'number') {
        parseNumberInput(ev.target.textContent);
    } else if (type == 'operator') {
        if (operator) {
            updateNumbers();
        }
        operator = ev.target.textContent;
    }
    updateDisplay();
}

function parseNumberInput(increment) {
    if (operator) {
        num2 = num2 + increment;
    } else {
        num1 = num1 + increment;
    }
}

function evaluate() {
    updateNumbers();
    operator = '';
    updateDisplay();
}

function clear() {
    num1 = num2 = operator = '';
    updateDisplay();
}

function updateDisplay() {
    display.textContent = num1 + operator + num2;
}
