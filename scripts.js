let display = document.querySelector('.display h1');
let btns = document.querySelectorAll('.btn');
let digits = document.querySelectorAll('.digit');
let operations = document.querySelectorAll('.op');
let singleOperation = document.querySelectorAll('.singleOp');
let precedingOperation = document.querySelectorAll('.opPrec');
let posneg = document.querySelector('.neg');
let dec = document.querySelector('.dec');
let pi = document.querySelector('.pi');
let clear = document.querySelector('.clear');

let buttonSound = new Audio('Button-sound-effect.mp3');

let varObject = {
    values: [],
    operation: "",
    lastButtonPressedType: "",
    acceptingInput: true
}

display.innerHTML = "0";

// keyboard press functionality
window.addEventListener('keydown', (e) => {
    if ((e.key >= 0 && e.key <= 9) || e.key == '.') {
        keyboardPressButton(e.key);
        pressDigitButton(e.key);
        playSound();
    } else if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {
        keyboardPressButton(e.key);
        pressOperatorButton(e.key);
        playSound();
    } else if (e.key == '%' || e.key == '=') {
        keyboardPressButton(e.key);
        pressSingleOperatorButton(e.key);
        playSound();
    } else if (e.key == 'Enter') {
        // 'translate' Enter button to =
        keyboardPressButton('=');
        pressSingleOperatorButton('=');
        playSound();
    } else if (e.key == 'Delete' || e.key == 'Backspace') {
        keyboardPressButton('del');
        if (varObject.lastButtonPressedType == "digit") {
            display.innerHTML = del();
        }
        playSound();
    }
});

digits.forEach(digit => {
    digit.addEventListener('click', () => {
        pressDigitButton(digit.dataset.method);
    });

    digit.addEventListener('transitionend', removeTransition);
});

btns.forEach(btn => {
    btn.addEventListener('mousedown', () => {
        playSound();
    });
});

operations.forEach(op => {
    op.addEventListener('click', (e) => {
        pressOperatorButton(e.target.dataset.method);
    });
});

singleOperation.forEach(op => {
    op.addEventListener('click', (e) => {
        pressSingleOperatorButton(e.target.dataset.method);
    });
});

precedingOperation.forEach(op => {
    op.addEventListener('click', (e) => {
        if (varObject.operation != "") {
            calculate(e.target.dataset.method, display.innerHTML);
        }
        varObject.operation = e.target.dataset.method;
        selectOperation(e.target.dataset.method);
        setLastButtonPressedType("prec");
    })
})

posneg.addEventListener('click', () => {
    if (varObject.lastButtonPressedType != "operator") {
        if (display.innerHTML.split("")[0] == "-") {
            let numbers = display.innerHTML.split("");
            numbers.shift();
            display.innerHTML = numbers.join("");
        } else {
            display.innerHTML = "-" + display.innerHTML;
        }
    }
});

pi.addEventListener('click', () => {
    displayScreenValue(Math.PI, 10);
    setLastButtonPressedType("special");
});

clear.addEventListener('click', () => {
    clearDisplay();
    clearOpStyles();
    varObject.values = [];
    varObject.operation = "";
});

function removeTransition(e) {
    if (e.propertyName !== 'box-shadow') return;
    this.classList.remove('btn-pressed');
}

function playSound() {
    buttonSound.currentTime = 0.04;
    buttonSound.play();
    return true;
}

function pressDigitButton(button) {
    if (varObject.lastButtonPressedType == "operator" || varObject.lastButtonPressedType == "equals" || varObject.lastButtonPressedType == "special" || varObject.lastButtonPressedType == "prec") {
        clearDisplay();
    }
    if (button == '.') {
        dec.disabled = true;
    }
    setLastButtonPressedType("digit");
    return addToDisplay(button);
}

function pressOperatorButton(button) {
    varObject.acceptingInput = true;
    dec.disabled = false;
    let newOperator = selectOperation(button);
    if (varObject.lastButtonPressedType != "operator") {
        calculate(button, display.innerHTML);
        setLastButtonPressedType("operator");
    } else if (varObject.lastButtonPressedType == "operator") {
        calculate(button, display.innerHTML, true);
    }
    return newOperator;
}

function pressSingleOperatorButton(button) {
    varObject.acceptingInput = true;
    dec.disabled = false;
    let currentOperation = button;
    calculateSingle(currentOperation, display.innerHTML);
    return currentOperation;
}

function keyboardPressButton(button) {
    let key = document.querySelector(`button[data-method="${button}"`);
    key.classList.add('btn-pressed');
}

function addToDisplayBasic(character, acceptingInput = true) {
    if (acceptingInput) {
        display.innerHTML += character;
        displayScreenValue(display.innerHTML);
    }
    return display.innerHTML.split('')[display.innerHTML.length - 1];
}

function addToDisplay(character) {
    let newDisplayCharacter;
    if (display.innerHTML == "0") {
        if (character == ".") {
            newDisplayCharacter = addToDisplayBasic(character, varObject.acceptingInput);
        } else if (character == '0') {
            newDisplayCharacter = '0';
        } else {
            display.innerHTML = character;
            newDisplayCharacter = display.innerHTML.split('')[display.innerHTML.length - 1];
        }
    } else {
        if (display.innerHTML.includes('.')) {
            if (character != '.') {
                newDisplayCharacter = addToDisplayBasic(character, varObject.acceptingInput);
            }
            return display.innerHTML.split('')[display.innerHTML.length - 1];
        } else {
            newDisplayCharacter = addToDisplayBasic(character, varObject.acceptingInput);
        }
    }
    return newDisplayCharacter;
}

function calculate(newOperation, displayValue, changeOperator = false) {
    //move clear and del out (and put all single press operators somewhere else)
    if (varObject.operation != "" && !changeOperator) { // if an operation has already been pressed
        // add the current value on the display to the values array
        varObject.values.push(Number(displayValue));
        // clear the display ready for the result
        clearDisplay();
        // check the existing operation and perform the operation => display the result
        let result = doOperation(varObject.operation);
        displayScreenValue(result);
        // replace all the values in the values array with the new result
        varObject.values = [];
        varObject.values.push(Number(result));
        // set the new operation as the current operation (if it is a chainable operation)
        varObject.operation = newOperation;
    } else if (changeOperator) { // used when the last button pressed was an operator and it is not chained
        // only change the currently used operator
        varObject.operation = newOperation;
    } else { //if no operation has been pressed yet
        // set the new operation as the current operation
        varObject.operation = newOperation;
        // push the current value into the values array
        varObject.values.push(Number(displayValue));
    }
}

function calculateSingle(newOperation, displayValue) {
    // special operations -- clear
    if (newOperation == "clear") {
        // reset calculator
        clearDisplay();
        clearOpStyles();
        varObject.values = [];
        varObject.operation = "";
    }
    // special operations -- delete
    else if (newOperation == "del" && varObject.lastButtonPressedType == "digit") {
        display.innerHTML = del();
    }
    // special operations -- equals
    else if (newOperation == "=" && (varObject.lastButtonPressedType == "digit" || varObject.lastButtonPressedType == "special" || varObject.lastButtonPressedType == "prec") && varObject.operation != "") {
        // add the current display value to the values
        varObject.values.push(Number(displayValue));
        // calculate according to current operation
        let result = equals(varObject.operation);
        // clear and display result
        clearDisplay();
        displayScreenValue(result);
        // reset values and operation
        varObject.values = [];
        varObject.operation = "";
        setLastButtonPressedType("equals");
        // prepare for next input
        varObject.acceptingInput = true;
    }
    // other single press operations -- square -- cube -- inverse -- factorial -- absolute
    else {
        // calculate single button press operation
        let result = doSingleValueOperation(newOperation, displayValue);
        displayScreenValue(result);
        if (newOperation != "%") {
            // allows % to chain with itself and other operators alone, without adding other digits
            setLastButtonPressedType("operator");
        }
    }
}

function del() {
    let numbers = display.innerHTML.split("");
    numbers.pop();
    if (numbers.length >= 1) {
        return numbers.join("");
    } else {
        return '0';
    }
}

function clearDisplay() {
    display.innerHTML = "0";
}

function selectOperation(operation) {
    // style changes
    let selectedOperator;
    operations.forEach(op => {
        if (op.dataset.method == operation) {
            op.classList.add("activeBtn");
            selectedOperator = op.dataset.method;
        } else {
            op.classList.remove("activeBtn");
        }
    });
    precedingOperation.forEach(op => {
        if (op.dataset.method == operation) {
            op.classList.add("activeBtn");
            selectedOperator = op.dataset.method;
        } else {
            op.classList.remove("activeBtn");
        }
    });
    return selectedOperator;
}

function setLastButtonPressedType(type) {
    // used to determine following actions based on what buttons are pressed next
    varObject.lastButtonPressedType = type;
    return type;
}

function doOperation(operation) {
    // select operations that require '=' or another operation to see the result
    let result = 0;
    switch (operation) {
        case "+":
            result = add();
            break;
        case "-":
            result = subtract();
            break;
        case "*":
            result = multiply();
            break;
        case "/":
            result = divide();
            break;
        case "power":
            result = power();
            break;
        case "euler":
            result = euler();
            break;
        case "sqrt":
            result = sqrt();
            break;
        case "cbrt":
            result = cbrt();
            break;
        case "sin":
            result = sin();
            break;
        case "cos":
            result = cos();
            break;
        case "tan":
            result = tan();
            break;
        case "asin":
            result = asin();
            break;
        case "acos":
            result = acos();
            break;
        case "atan":
            result = atan();
            break;
        case "log10":
            result = log10();
            break;
        case "ln":
            result = ln();
            break;
        default:
            break;
    }
    return result;
}

function doSingleValueOperation(operation, value) {
    // select operations that will be triggered by a single button press
    let result = 0;
    switch (operation) {
        case "square":
            result = square(value);
            break;
        case "cube":
            result = cube(value);
            break;
        case "inverse":
            result = invert(value);
            break;
        case "fact":
            if (value <= 200) {
                result = factorial(value);
            } else {
                result = Infinity;
            }
            break;
        case "abs":
            result = Math.abs(value);
            break;
        case "%":
            result = value / 100;
            break;
        default:
            result = +value;
            break;
    }
    return result;
}

function factorial(value) {
    // no non-integer factorials
    value = Math.round(value);
    if (value < 0) {
        return -1;
    } else if (value == 0) {
        return 1;
    } else {
        return (value * factorial(value - 1));
    }
}

function add() {
    return varObject.values.reduce((result, value) => { return result + value });
}

function subtract() {
    return varObject.values.reduce((result, value) => { return result - value });
}

function multiply() {
    return varObject.values.reduce((result, value) => { return result * value });
}

function divide() {
    return varObject.values.reduce((result, value) => { return result / value });
}

function square(value) {
    return value ** 2;
}

function cube(value) {
    return value ** 3;
}

function invert(value) {
    return (1 / value);
}

function power() {
    return varObject.values.reduce((result, value) => { return result ** value });
}

function euler() {
    return Math.E ** varObject.values[0];
}

function sqrt() {
    return Math.sqrt(varObject.values[0]);
}

function cbrt() {
    return Math.cbrt(varObject.values[0]);
}

function sin() {
    return Math.sin(varObject.values[0]);
}

function cos() {
    return Math.cos(varObject.values[0]);
}

function tan() {
    return Math.tan(varObject.values[0]);
}

function asin() {
    return Math.asin(varObject.values[0]);
}

function acos() {
    return Math.acos(varObject.values[0]);
}

function atan() {
    return Math.atan(varObject.values[0]);
}

function log10() {
    return Math.log10(varObject.values[0]);
}

function ln() {
    return Math.log(varObject.values[0]);
}

function equals(lastOperation) {
    clearOpStyles();
    return doOperation(lastOperation);
}

function clearOpStyles() {
    // clear the "pressed" button styles from all buttons
    operations.forEach(op => {
        op.classList.remove("activeBtn");
    })
    precedingOperation.forEach(op => {
        op.classList.remove("activeBtn");
    })
}

function displayScreenValue(value, precision = 0) {
    // control display of values
    // truncate long values to display on screen
    if (String(value).length >= 10) {
        varObject.acceptingInput = false;
        let precisionMod;
        if (precision == 0) {
            //determine amount of truncation of number string
            precisionMod = 9 - String(value).length / 10;
        } else {
            // display according to input precision
            precisionMod = precision;
        }
        display.innerHTML = Number(value).toPrecision(precisionMod);
    } else { // display other values as normal
        display.innerHTML = value;
    }
    return display.innerHTML;
}

export {
    removeTransition,
    playSound,
    pressDigitButton,
    pressSingleOperatorButton,
    pressOperatorButton,
    keyboardPressButton,
    addToDisplayBasic,
    addToDisplay,
    calculate,
    calculateSingle,
    del,
    clearDisplay,
    selectOperation,
    setLastButtonPressedType,
    doOperation,
    doSingleValueOperation,
    factorial,
    add,
    subtract,
    multiply,
    divide,
    square,
    cube,
    invert,
    power,
    euler,
    sqrt,
    cbrt,
    sin,
    cos,
    tan,
    asin,
    acos,
    atan,
    log10,
    ln,
    equals,
    clearOpStyles,
    displayScreenValue,
    varObject
}