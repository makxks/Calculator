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
let values = [];
let operation = "";
let lastButtonPressedType = "";
let acceptingInput = true;

display.innerHTML = "0";

window.addEventListener('keydown', (e) => {
    if((e.key >= 0 && e.key <= 9) || e.key == '.'){
        keyboardPressButton(e.key);
        pressDigitButton(e.key);
        playSound();
    }

    else if(e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/'){
        keyboardPressButton(e.key);
        pressOperatorButton(e.key);
        playSound();
    }

    else if(e.key == '%' || e.key == '='){
        keyboardPressButton(e.key);
        pressSingleOperatorButton(e.key);
        playSound();
    }

    else if(e.key == 'Enter'){
        // 'translate' Enter button to =
        keyboardPressButton('=');
        pressSingleOperatorButton('=');
        playSound();
    }
    else if(e.key == 'Delete' || e.key == 'Backspace'){
        keyboardPressButton('del');
        if(lastButtonPressedType == "digit"){
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
        operation = e.target.dataset.method;
        selectOperation(e.target.dataset.method);
        setLastButtonPressedType("prec");
    })
})

posneg.addEventListener('click', () => {
    if(lastButtonPressedType != "operator"){
        if(display.innerHTML.split("")[0] == "-"){
            let numbers = display.innerHTML.split("");
            numbers.shift();
            display.innerHTML = numbers.join("");
        }
        else{
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
    values = [];
    operation = "";
});

function removeTransition(e) {
    if (e.propertyName !== 'box-shadow') return;
    this.classList.remove('btn-pressed');
}

function playSound(){
    buttonSound.currentTime = 0.04;
    buttonSound.play();
}

function pressDigitButton(button){
    if(lastButtonPressedType == "operator" || lastButtonPressedType == "equals" || lastButtonPressedType == "special" || lastButtonPressedType == "prec"){
        clearDisplay();
    }
    addToDisplay(button);
    if(button == '.'){
        dec.disabled = true;
    }
    setLastButtonPressedType("digit");
}

function pressOperatorButton(button){
    acceptingInput = true;
    dec.disabled = false;
    selectOperation(button);
    if(lastButtonPressedType != "operator"){
        calculate(button, display.innerHTML);
        setLastButtonPressedType("operator");
    }
}

function pressSingleOperatorButton(button){
    acceptingInput = true;
    dec.disabled = false;
    let currentOperation = button;
    console.log(currentOperation);
    calculateSingle(currentOperation, display.innerHTML);
}

function keyboardPressButton(button){
    let key = document.querySelector(`button[data-method="${button}"`);
    key.classList.add('btn-pressed');
}

function addToDisplayBasic(character){
    if(acceptingInput){
        display.innerHTML += character;
        displayScreenValue(display.innerHTML);
    }
}

function addToDisplay(character){
    if(display.innerHTML == "0"){
        if(character == "."){
            addToDisplayBasic(character);
        }
        else if(character == '0'){
            return;
        }
        else{
            display.innerHTML = character;
        }
    }
    else{
        if(display.innerHTML.includes('.')){
            if(character != '.'){
                addToDisplayBasic(character);
            }
        }
        else{
            addToDisplayBasic(character);
        }
    }
}

function calculate(newOperation, displayValue){
    //move clear and del out (and put all single press operators somewhere else) 
    if(operation != ""){ // if an operation has already been pressed
        // add the current value on the display to the values array
        values.push(Number(displayValue));
        // clear the display ready for the result
        clearDisplay();
        // check the existing operation and perform the operation => display the result
        let result = doOperation(operation);
        // replace all the values in the values array with the new result
        displayScreenValue(result);
        values = [];
        values.push(Number(result));
        // set the new operation as the current operation (if it is a chainable operation)
        operation = newOperation;
    }
    else{ //if no operation has been pressed yet
        // set the new operation as the current operation
        operation = newOperation;
        // push the current value into the values array
        values.push(Number(displayValue));
    }
}

function calculateSingle(newOperation, displayValue){
    // special operations -- clear
    console.log(newOperation);
    if(newOperation == "clear"){
        clearDisplay();
        clearOpStyles();
        values = [];
        operation = "";
    }
    // special operations -- delete
    else if(newOperation == "del" && lastButtonPressedType == "digit"){
        display.innerHTML = del();
    }
    // special operations -- equals
    else if(newOperation == "=" && (lastButtonPressedType == "digit" || lastButtonPressedType == "special" || lastButtonPressedType == "prec") && operation!=""){
        values.push(Number(displayValue));
        let result = equals(operation);
        console.log(result);
        clearDisplay();
        displayScreenValue(result);
        values = [];
        operation = "";
        setLastButtonPressedType("equals");
        acceptingInput = true;
    }
    // other single press operations -- square -- cube -- inverse -- factorial -- absolute
    else{
        let result = doSingleValueOperation(newOperation, displayValue);
        displayScreenValue(result);
        if(newOperation != "%"){
            setLastButtonPressedType("operator");
        }
    }
}

function del(){
    let numbers = display.innerHTML.split("");
    numbers.pop();
    if(numbers.length >= 1){
        return numbers.join("");
    }
    else{
        return 0;
    }
}

function clearDisplay(){
    display.innerHTML = "0";
}

function selectOperation(operation){
    operations.forEach(op => {
        if(op.dataset.method == operation){
            op.classList.add("activeBtn");
        }
        else {
            op.classList.remove("activeBtn");
        }
    })
    precedingOperation.forEach(op => {
        if(op.dataset.method == operation){
            op.classList.add("activeBtn");
        }
        else {
            op.classList.remove("activeBtn");
        }
    })
}

function setLastButtonPressedType(type){
    lastButtonPressedType = type;
}

function doOperation(operation){
    let result;
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

function doSingleValueOperation(operation, value){
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
            if (value <= 200){
                result = factorial(value);
            }
            else {
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
            result = value;
            break;
    }
    return result;
}

function factorial(value){
    if(value < 0){
        return -1;
    }
    else if(value == 0){
        return 1;
    }
    else {
        return (value * factorial(value - 1));
    }
}

function add(){
    return values.reduce((result, value) => { return result + value });
}

function subtract(){
    return values.reduce((result, value) => { return result - value });
}

function multiply(){
    return values.reduce((result, value) => { return result * value });
}

function divide(){
    return values.reduce((result, value) => { return result / value });
}

function square(value){
    return value ** 2;
}

function cube(value){
    return value ** 3;
}

function invert(value){
    return (1/value);
}

function power(){
    return values.reduce((result, value) => { return result ** value});
}

function euler(){
    return Math.E ** values[0];
}

function sqrt(){
    return Math.sqrt(values[0]);
}

function cbrt(){
    return Math.cbrt(values[0]);
}

function sin(){
    return Math.sin(values[0]);
}

function cos(){
    return Math.cos(values[0]);
}

function tan(){
    return Math.tan(values[0]);
}

function asin(){
    return Math.asin(values[0]);
}

function acos(){
    return Math.acos(values[0]);
}

function atan(){
    return Math.atan(values[0]);
}

function log10(){
    return Math.log10(values[0]);
}

function ln(){
    return Math.log(values[0]);
}

function equals(lastOperation){
    clearOpStyles();
    return doOperation(lastOperation);
}

function clearOpStyles(){
    operations.forEach(op => {
        op.classList.remove("activeBtn");
    })
    precedingOperation.forEach(op => {
        op.classList.remove("activeBtn");
    })
}

function displayScreenValue(value, precision = 0){
    if(String(value).length >= 10){
        acceptingInput = false;
        let precisionMod;
        if(precision == 0){
            precisionMod = 9 - String(value).length/10;
        }
        else{
            precisionMod = precision;
        }
        display.innerHTML = Number(value).toPrecision(precisionMod);
    }
    else {
        display.innerHTML = value;
    }
}
