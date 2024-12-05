let operand1 = { value: null };
let operand2 = { value: null };
let currentOperand = operand1;
let operator = null;
let decimalDisabled = false;
let hasNegativeSign = false;
let inputState = 'operand';


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
        setState(ev.key);
        if (inputState == 'operand') {
            parseNumberInput(ev.key == ',' ? '.' : ev.key);
            if (ev.key.match(/[\.,]/)) {
                decimalDisabled = true;
            }
        } else if (inputState == 'operator') {
            handleOperatorInput(ev.key);
        }
    }
    updateDisplay();
}

function setState(userInput) {
    if ((operand1.value == null || (operator != null && operand2.value == null)) && userInput == '-') {
        hasNegativeSign = true;
        inputState = 'operand';
    } else if (userInput.match(/[\d\.,]/)) {
        inputState = 'operand';
    } else {
        inputState = 'operator';
    }
}

function operate() {
    if (operand1.value == null || operand2.value == null) throw new Error('Function operate: at least one operand is undefined.');
    if (operator === '+') return add(operand1.value, operand2.value);
    if (operator === '-') return subtract(operand1.value, operand2.value);
    if (operator === '*') return multiply(operand1.value, operand2.value);
    if (operator === '/') return divide(operand1.value, operand2.value);
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

function updateState(calculateInterimResult = false) {
    if (calculateInterimResult) {
        operand1.value = operate();
        operand2.value = null;
    }
    currentOperand = operand2;
    hasNegativeSign = false;
    decimalDisabled = false;
    inputState = 'operand';
}

function handleGUIInput(ev) {
    setState(ev.target.textContent);
    if (inputState == 'operand') {
        parseNumberInput(ev.target.textContent);
        if (ev.target.textContent.match(/[\.,]/)) {
            decimalDisabled = true;
        }
    } else if (inputState == 'operator') {
        handleOperatorInput(ev.target.textContent);
    }
    updateDisplay();
}

function handleOperatorInput(operatorInput) {
    if (operatorInput.match(/[+\-*\/]/)) {
        if (operator) {
            updateState(true);
        } else {
            updateState();
        }
        operator = operatorInput;
    }
}

function parseNumberInput(increment) {
    if (increment.match(/[\d]/)) {
        const newValue = parseFloat((hasNegativeSign ? '-' : '') + (currentOperand.value ?? '') + (decimalDisabled ? '.' : '') + increment);
        currentOperand.value = isNaN(newValue) ? 0 : newValue;
    }
}

function deletePreviousEntry() {
    if (operator) {
        if (operand2) {
            operand2.value = getNewValue(operand2);
        } else {
            operator = null;
        }
    } else {
        operand1.value = getNewValue(operand1);
    }

    function getNewValue(num) {
        const numString = String(num);
        if (numString.includes('.') || !decimalDisabled) {
            return num && numString.length > 1 ?
                parseFloat(numString.slice(0, -1))
                :
                null;
        } else if (decimalDisabled) {
            decimalDisabled = false;
            return num;
        }
    }
}

function evaluate() {
    if (operand1.value !== null && operand2.value !== null) {
        updateState(true);
    }
    operator = null;
    decimalDisabled = false;
    hasNegativeSign = false;
    updateDisplay();
}

function clear() {
    operand1.value = null;
    operand2.value = null;
    operator = null;
    decimalDisabled = false;
    hasNegativeSign = false;
    currentOperand = operand1;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = `${toStringRepresentation(operand1.value)}${getNumDecimalPoint(operand1)} ${toStringRepresentation(operator)} ${toStringRepresentation(operand2.value)}${getNumDecimalPoint(operand2)}`;
    decimalBtn.disabled = decimalDisabled;

    function toStringRepresentation(expression) {
        if ((typeof expression === 'number' && expression < 0)) {
            return `(${expression})`;
        }
        return !expression ? '' : String(expression);
    }

    function getNumDecimalPoint(num) {
        return currentOperand == num && decimalDisabled && ((currentOperand.value ?? 0) % 1 == 0) ? '.' : '';
    }
}
