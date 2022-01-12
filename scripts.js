let display = document.querySelector('.display h1');
let btns = document.querySelectorAll('.btn');
let digits = document.querySelectorAll('.digit');
let operations = document.querySelectorAll('.op');
let singleOperation = document.querySelectorAll('.singleOp');
let posneg = document.querySelector('.neg');

let buttonSound = new Audio('button-sound.mp3');
let values = [];
let operation = "";
let lastButtonPressedType = "";

display.innerHTML = "0";

digits.forEach(digit => {
    digit.addEventListener('click', () => {
        if(lastButtonPressedType == "operator"){
            clearDisplay();
        }
        addToDisplay(digit.dataset.method);
        if(digit.dataset.method == '.'){
            digit.disabled = true;
        }
        lastButtonPressedType = "digit";
    });
});

btns.forEach(btn => {
    btn.addEventListener('mousedown', () => {
        buttonSound.currentTime = 0.32;
        buttonSound.play();
    });
});

operations.forEach(op => {
    op.addEventListener('click', (e) => {
        selectOperation(e.target.dataset.method);
        if(lastButtonPressedType != "operator"){
            calculate(e.target.dataset.method, display.innerHTML);
        }
        if(e.target.dataset.method != "equals"){
            lastButtonPressedType = "operator";
        }
    });
});

singleOperation.forEach(op => {
    op.addEventListener('click', (e) => {
        if(lastButtonPressedType != "operator"){
            calculateSingle(e.target.dataset.method, display.innerHTML);
        }
        lastButtonPressedType = "";
    });
})

posneg.addEventListener('click', () => {
    if(display.innerHTML.split("")[0] == "-"){
        let numbers = display.innerHTML.split("");
        numbers.shift();
        display.innerHTML = numbers.join("");
    }
    else{
        display.innerHTML = "-" + display.innerHTML;
    }
});

function addToDisplayBasic(character){
    display.innerHTML += character;
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
        // add a switch or if else check here to pass the values to different functions for the different operators that will return the result back and store
        // it in the scoped variable result 
        let result = doOperation(operation);
        // replace all the values in the values array with the new result
        display.innerHTML = result;
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
    if(newOperation == "clear"){
        clearDisplay();
        values = [];
        operation = "";
    }
    else if(newOperation == "del"){   
        display.innerHTML = del();
    }
    else if(newOperation == "equals"){
        values.push(Number(displayValue));
        let result = equals(operation);
        clearDisplay();
        display.innerHTML = result;
        values = [];
        operation = "";
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
}

function setLastButtonPressedType(type){
    lastButtonPressedType = type;
}

function doOperation(operation){
    let result;
    if(operation == 'plus'){
        result = add();
    }
    else if(operation == "minus"){
        result = subtract();
    }
    else if(operation == "mult"){
        result = multiply();
    }
    else if(operation == "divide"){
        result = divide();
    }
    return result;
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

function equals(lastOperation){
    clearOpStyles();
    return doOperation(lastOperation);
}

function clearOpStyles(){
    operations.forEach(op => {
        op.classList.remove("activeBtn");
    })
}

function displayLengthCheck(value){
    if(String(value).Length > 10){
        
    }
}
