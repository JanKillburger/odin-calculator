let num1, num2, operator;
let decimalDisabled = false;
num1 = num2 = operator = null;

let controls = document.getElementById('controls');
let display = document.getElementById('display');
let evaluateBtn = document.getElementById('evaluate');
let decimalBtn = document.getElementById('decimal-btn');
let deleteBtn = document.getElementById('delete-btn');
evaluateBtn.addEventListener('click', evaluate);
deleteBtn.addEventListener('click', deletePreviousEntry);
controls.querySelectorAll('.digit, .operator, .delete').forEach(
    btn => btn.addEventListener('click', (ev) => handleGUIInput(ev))
);
document.getElementById('clear').addEventListener('click', clear);

window.addEventListener('keyup', (ev) => handleKeyboardInput(ev))

function handleKeyboardInput(ev) {
    if (ev.key == 'Enter') {
        evaluate();
    } else if (ev.key == 'Backspace') {
        deletePreviousEntry();
    } else {
        const inputState = getCurrentInputState(ev.key);
        if (inputState == 'num1' || inputState == 'num2') {
            parseNumberInput(inputState, ev.key == ',' ? '.' : ev.key);
            if (isNaN(ev.key)) {
                decimalDisabled = true;
            }
        } else if (inputState == 'operator') {
            handleOperatorInput(ev.key);
        }
    }
    updateDisplay();
}

function getCurrentInputState(userInput) {
    if (num1 == null || (operator == null && userInput.match(/[\d\.,]/))) return 'num1';
    if (operator == null) return 'operator';
    return 'num2';
}

function operate() {
    if (num1 == null || num2 == null) throw new Error('Function operate: at least one operand is undefined.');
    if (operator === '+') return add(num1, num2);
    if (operator === '-') return subtract(num1, num2);
    if (operator === '*') return multiply(num1, num2);
    if (operator === '/') return divide(num1, num2);
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
    if (num2 === 0) throw new Error('function divide: division by zero');
    return num1 / num2;
}

function updateNumbers() {
    num1 = operate();
    num2 = null;
}

function handleGUIInput(ev) {
    const inputState = getCurrentInputState(ev.target.textContent)
    if (inputState == 'num1' || inputState == 'num2') {
        parseNumberInput(inputState, ev.target.textContent);
    } else if (inputState == 'operator') {
        handleOperatorInput(ev.target.textContent);
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

function parseNumberInput(inputState, increment) {
    if (inputState == 'num1') {
        num1 = parseFloat(toStringRepresentation(num1) + increment);
    } else if (inputState == 'num2') {
        num2 = parseFloat(toStringRepresentation(num2) + increment);
    }
}

function deletePreviousEntry() {
    if (operator) {
        if (num2) {
            num2 = getNewValue(num2);
        } else {
            operator = null;
        }
    } else {
        num1 = getNewValue(num1);
    }

    function getNewValue(num) {
        return num && String(num).length > 1 ?
            parseFloat(String(num).slice(0, -1))
            :
            null;
    }
}

function evaluate() {
    if (num1 !== null && num2 !== null) {
        updateNumbers();
        operator = null;
    } else {
        operator = null;
    }
    updateDisplay();
}

function clear() {
    num1 = num2 = operator = null;
    decimalDisabled = false;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = `${toStringRepresentation(num1)} ${toStringRepresentation(operator)} ${toStringRepresentation(num2)}`;
    decimalBtn.disabled = decimalDisabled;
}

function toStringRepresentation(expression) {
    if (typeof expression === 'number' && expression < 0) {
        return `(${expression})`;
    }
    return !expression ? '' : String(expression);
}
