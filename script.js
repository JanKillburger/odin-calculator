let num1, num2, operator;
let decimalDisabled = false;
num1 = num2 = operator = '';

let controls = document.getElementById('controls');
let display = document.getElementById('display');
let evaluateBtn = document.getElementById('evaluate');
let decimalBtn = document.getElementById('decimal-btn');
let deleteBtn = document.getElementById('delete');
evaluateBtn.addEventListener('click', evaluate);
controls.querySelectorAll('.digit, .operator, .delete').forEach(
    btn => btn.addEventListener('click', (ev) => handleInput(ev))
);
document.getElementById('clear').addEventListener('click', clear);

window.addEventListener('keyup', (ev) => handleKeyboardInput(ev))

function handleKeyboardInput(ev) {
    if (ev.key == "Enter") {
        evaluate();
    }
    if (ev.key == "Backspace") {
        deletePreviousEntry();
    }
    if (ev.key.match(/[\d\.,]/)) {
        parseNumberInput(ev.key == "," ? "." : ev.key);
    } else if (ev.key.match(/[+\-*\/]/)) {
        handleOperatorInput(ev.key);
    }
    updateDisplay();
}

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
    const type = ev.target.classList.contains('operator') ?
        'operator'
        : ev.target.classList.contains('digit') ?
            'number' : 'delete';
    if (type == 'number') {
        parseNumberInput(ev.target.textContent);
    } else if (type == 'operator') {
        handleOperatorInput(ev.target.textContent);
    } else {
        deletePreviousEntry();
    }
    updateDisplay();
}

function handleOperatorInput(operatorInput) {
    if (operator) {
        updateNumbers();
    }
    operator = operatorInput;
    decimalDisabled = false;
}

function parseNumberInput(increment) {
    if (operator) {
        num2 = num2 + increment;
    } else {
        num1 = num1 + increment;
    }
    if (isNaN(increment)) {
        decimalDisabled = true;
    }
}

function deletePreviousEntry() {
    if (operator) {
        num2 = num2.slice(0, -1);
    } else {
        num1 = num1.slice(0, -1);
    }
}

function evaluate() {
    if (num1 !== '' && num2 !== '') {
        updateNumbers();
        operator = '';
    } else {
        operator = '';
    }
    updateDisplay();
}

function clear() {
    num1 = num2 = operator = '';
    decimalDisabled = false;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = num1 + operator + num2;
    decimalBtn.disabled = decimalDisabled;
}
