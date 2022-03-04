let scripts;

beforeAll(() => {
    document.body.innerHTML = `
    <section class="calculator">
        <section class="display">
            <h1></h1>
        </section>
        <section class="allButtons">
            <section class="buttonsLeft">
                <button class="btn minorOperator singleOp" data-method="square">x<sup>2</sup></button>
                <button class="btn minorOperator singleOp" data-method="cube">x<sup>3</sup></button>
                <button class="btn minorOperator op" data-method="power">x<sup>y</sup></button>
                <button class="btn minorOperator opPrec" data-method="euler">e<sup>x</sup></button>
                <button class="btn minorOperator pi" data-method="pi">π</button>
                <button class="btn minorOperator opPrec" data-method="sqrt">√</button>
                <button class="btn minorOperator opPrec" data-method="cbrt"><sup>3</sup>√</button>
                <button class="btn minorOperator singleOp" data-method="inverse">1/x</button>
                <button class="btn minorOperator opPrec" data-method="sin">sin</button>
                <button class="btn minorOperator opPrec" data-method="cos">cos</button>
                <button class="btn minorOperator opPrec" data-method="tan">tan</button>
                <button class="btn minorOperator opPrec" data-method="asin">sin<sup>-1</sup></button>
                <button class="btn minorOperator opPrec" data-method="acos">cos<sup>-1</sup></button>
                <button class="btn minorOperator opPrec" data-method="atan">tan<sup>-1</sup></button>
                <button class="btn minorOperator singleOp" data-method="fact">x!</button>
                <button class="btn minorOperator singleOp" data-method="abs">|x|</button>
                <button class="btn minorOperator opPrec" data-method="log10">log<sub>10</sub></button>
                <button class="btn minorOperator opPrec" data-method="ln">ln</button>
            </section>
            <section class="buttonsRight">
                <button class="btn majorOperator singleOp cldel clear" data-method="clear">C</button>
                <button class="btn majorOperator singleOp cldel" data-method="del">Del</button>
                <button class="btn majorOperator singleOp" data-method="%">%</button>
                <button class="btn majorOperator neg" data-method="posneg">+/-</button>
                <button class="btn majorOperator op" data-method="+">+</button>
                <button class="btn digit" data-method="7">7</button>
                <button class="btn digit" data-method="8">8</button>
                <button class="btn digit" data-method="9">9</button>
                <button class="btn majorOperator op" data-method="-">-</button>
                <button class="btn digit" data-method="4">4</button>
                <button class="btn digit" data-method="5">5</button>
                <button class="btn digit" data-method="6">6</button>
                <button class="btn majorOperator op" data-method="*">*</button>
                <button class="btn digit" data-method="1">1</button>
                <button class="btn digit" data-method="2">2</button>
                <button class="btn digit" data-method="3">3</button>
                <button class="btn majorOperator op" data-method="/">/</button>
                <button class="btn digit dec" data-method=".">.</button>
                <button class="btn digit" data-method="0">0</button>
                <button class="btn majorOperator singleOp" data-method="=">=</button>
            </section>
        </section>
    </section>
    `;
    scripts = require('./scripts');
});

beforeEach(() => {
    scripts.clearDisplay();
    scripts.clearOpStyles();
    scripts.varObject.values = [];
    scripts.varObject.operation = '';
    scripts.lastButtonPressedType = '';
    scripts.acceptingInput = true;
});

describe('Should display a digit on button press', () => {
    it.each([
        { digit: '0', expected: '0' },
        { digit: '1', expected: '1' },
        { digit: '2', expected: '2' },
        { digit: '3', expected: '3' },
        { digit: '4', expected: '4' },
        { digit: '5', expected: '5' },
        { digit: '6', expected: '6' },
        { digit: '7', expected: '7' },
        { digit: '8', expected: '8' },
        { digit: '9', expected: '9' },
        { digit: '.', expected: '.' }
    ])('.return the digit added to display - $digit', ({ digit, expected }) => {
        expect(scripts.pressDigitButton(digit)).toBe(expected);
    })
});

describe('Should return true when a sound is played', () => {
    it.each([
        {}
    ])('on play sound expect true', () => {
        expect(scripts.playSound()).toBeTruthy();
    })
})

describe('Should select a binary / preceding operator on button press', () => {
    it.each([
        { operator: '+', expected: '+' },
        { operator: '-', expected: '-' },
        { operator: '*', expected: '*' },
        { operator: '/', expected: '/' },
        { operator: 'power', expected: 'power' },
        { operator: 'euler', expected: 'euler' },
        { operator: 'sqrt', expected: 'sqrt' },
        { operator: 'cbrt', expected: 'cbrt' },
        { operator: 'sin', expected: 'sin' },
        { operator: 'cos', expected: 'cos' },
        { operator: 'tan', expected: 'tan' },
        { operator: 'asin', expected: 'asin' },
        { operator: 'acos', expected: 'acos' },
        { operator: 'atan', expected: 'atan' },
        { operator: 'log10', expected: 'log10' },
        { operator: 'ln', expected: 'ln' }
    ])('.return the binary / preceding operator selected - $operator', ({ operator, expected }) => {
        expect(scripts.pressOperatorButton(operator)).toBe(expected);
    })
});

describe('Should select a unary operator on button press', () => {
    it.each([
        { operator: 'square', expected: 'square' },
        { operator: 'cube', expected: 'cube' },
        { operator: 'inverse', expected: 'inverse' },
        { operator: 'fact', expected: 'fact' },
        { operator: 'abs', expected: 'abs' },
        { operator: 'clear', expected: 'clear' },
        { operator: 'del', expected: 'del' },
        { operator: '%', expected: '%' },
        { operator: '=', expected: '=' }
    ])('.return the unary operator selected - $operator', ({ operator, expected }) => {
        expect(scripts.pressSingleOperatorButton(operator)).toBe(expected);
    })
});

describe('Should add a digit to the display if accepting input, and returns last digit', () => {
    it.each([
        { digit: '0', otherDigit: '2', expected: '0' },
        { digit: '1', otherDigit: '3', expected: '1' },
        { digit: '2', otherDigit: '4', expected: '2' },
        { digit: '3', otherDigit: '5', expected: '3' },
        { digit: '4', otherDigit: '6', expected: '4' },
        { digit: '5', otherDigit: '7', expected: '5' },
        { digit: '6', otherDigit: '8', expected: '6' },
        { digit: '7', otherDigit: '9', expected: '7' },
        { digit: '8', otherDigit: '1', expected: '8' },
        { digit: '9', otherDigit: '2', expected: '9' },
        { digit: '.', otherDigit: '3', expected: '.' }
    ])('.return the last digit added - $digit, or $otherDigit if not accepting input', ({ digit, otherDigit, expected }) => {
        expect(scripts.addToDisplayBasic(digit)).toBe(expected);
        scripts.addToDisplayBasic(otherDigit);
        expect(scripts.addToDisplayBasic(digit, false)).toBe(otherDigit);
    })
});

describe('Should add a digit to the display if digit can be added', () => {
    it.each([
        { digit: '0', number: '1.2', expected: '0' },
        { digit: '1', number: '1.3', expected: '1' },
        { digit: '2', number: '1.4', expected: '2' },
        { digit: '3', number: '1.5', expected: '3' },
        { digit: '4', number: '1.6', expected: '4' },
        { digit: '5', number: '1.7', expected: '5' },
        { digit: '6', number: '1.8', expected: '6' },
        { digit: '7', number: '1.9', expected: '7' },
        { digit: '8', number: '2.1', expected: '8' },
        { digit: '9', number: '2.2', expected: '9' },
        { digit: '.', number: '2.3', expected: '.' }
    ])('.returns newly displayed character - $digit - or last digit of $number if not able to be entered', ({ digit, number, expected }) => {
        display = document.body.querySelector('.display h1');
        display.innerHTML = '0';
        expect(scripts.addToDisplay(digit)).toBe(expected);
        display.innerHTML = '1.2';
        if (digit == '.') {
            expect(scripts.addToDisplay(digit)).toBe('2');
        } else {
            expect(scripts.addToDisplay(digit)).toBe(expected);
        }
    })
});

describe('Should prepare values and operation for a calculation, completes chained calculations', () => {
    it.each([
        { operation: '+', displayedValue: '1', storedValue: '', storedOperation: '', expectedOperation: '+', expectedValues: [1] },
        { operation: '-', displayedValue: '2', storedValue: '', storedOperation: '', expectedOperation: '-', expectedValues: [2] },
        { operation: '/', displayedValue: '3', storedValue: '', storedOperation: '', expectedOperation: '/', expectedValues: [3] },
        { operation: '*', displayedValue: '4', storedValue: '', storedOperation: '', expectedOperation: '*', expectedValues: [4] },
        { operation: 'power', displayedValue: '5', storedValue: '', storedOperation: '', expectedOperation: 'power', expectedValues: [5] },
        { operation: 'euler', displayedValue: '5', storedValue: '', storedOperation: '', expectedOperation: 'euler', expectedValues: [5] },
        { operation: 'sqrt', displayedValue: '6', storedValue: '', storedOperation: '', expectedOperation: 'sqrt', expectedValues: [6] },
        { operation: 'cbrt', displayedValue: '7', storedValue: '', storedOperation: '', expectedOperation: 'cbrt', expectedValues: [7] },
        { operation: 'sin', displayedValue: '8', storedValue: '', storedOperation: '', expectedOperation: 'sin', expectedValues: [8] },
        { operation: 'cos', displayedValue: '9', storedValue: '', storedOperation: '', expectedOperation: 'cos', expectedValues: [9] },
        { operation: 'tan', displayedValue: '10', storedValue: '', storedOperation: '', expectedOperation: 'tan', expectedValues: [10] },
        { operation: 'asin', displayedValue: '11', storedValue: '', storedOperation: '', expectedOperation: 'asin', expectedValues: [11] },
        { operation: 'acos', displayedValue: '12', storedValue: '', storedOperation: '', expectedOperation: 'acos', expectedValues: [12] },
        { operation: 'atan', displayedValue: '13', storedValue: '', storedOperation: '', expectedOperation: 'atan', expectedValues: [13] },
        { operation: 'log10', displayedValue: '14', storedValue: '', storedOperation: '', expectedOperation: 'log10', expectedValues: [14] },
        { operation: 'ln', displayedValue: '15', storedValue: '', storedOperation: '', expectedOperation: 'ln', expectedValues: [15] },
        { operation: '+', displayedValue: '1', storedValue: 15, storedOperation: '+', expectedOperation: '+', expectedValues: [16] },
        { operation: '-', displayedValue: '2', storedValue: 16, storedOperation: '+', expectedOperation: '-', expectedValues: [18] },
        { operation: '/', displayedValue: '3', storedValue: 17, storedOperation: '+', expectedOperation: '/', expectedValues: [20] },
        { operation: '*', displayedValue: '4', storedValue: 18, storedOperation: '+', expectedOperation: '*', expectedValues: [22] },
        { operation: 'power', displayedValue: '5', storedValue: 19, storedOperation: '+', expectedOperation: 'power', expectedValues: [24] },
        { operation: 'euler', displayedValue: '5', storedValue: 19, storedOperation: '+', expectedOperation: 'euler', expectedValues: [24] },
        { operation: 'sqrt', displayedValue: '6', storedValue: 20, storedOperation: '+', expectedOperation: 'sqrt', expectedValues: [26] },
        { operation: 'cbrt', displayedValue: '7', storedValue: 21, storedOperation: '+', expectedOperation: 'cbrt', expectedValues: [28] },
        { operation: 'sin', displayedValue: '8', storedValue: 22, storedOperation: '+', expectedOperation: 'sin', expectedValues: [30] },
        { operation: 'cos', displayedValue: '9', storedValue: 23, storedOperation: '+', expectedOperation: 'cos', expectedValues: [32] },
        { operation: 'tan', displayedValue: '10', storedValue: 24, storedOperation: '+', expectedOperation: 'tan', expectedValues: [34] },
        { operation: 'asin', displayedValue: '11', storedValue: 25, storedOperation: '+', expectedOperation: 'asin', expectedValues: [36] },
        { operation: 'acos', displayedValue: '12', storedValue: 26, storedOperation: '+', expectedOperation: 'acos', expectedValues: [38] },
        { operation: 'atan', displayedValue: '13', storedValue: 27, storedOperation: '+', expectedOperation: 'atan', expectedValues: [40] },
        { operation: 'log10', displayedValue: '14', storedValue: 28, storedOperation: '+', expectedOperation: 'log10', expectedValues: [42] },
        { operation: 'ln', displayedValue: '15', storedValue: 29, storedOperation: '+', expectedOperation: 'ln', expectedValues: [44] }
    ])('.stores new operator $operation and new value $displayedValue, or result of calculation if operation is chained with stored operation $storedOperation', ({ operation, displayedValue, storedValue, storedOperation, expectedOperation, expectedValues }) => {
        // set up values
        scripts.varObject.operation = storedOperation;
        if (storedValue != "") {
            scripts.varObject.values.push(storedValue);
        }

        scripts.calculate(operation, displayedValue);
        expect(scripts.varObject.operation).toBe(expectedOperation);
        expect(scripts.varObject.values).toStrictEqual(expectedValues);

        // change operator true
        scripts.varObject.operation = 'power';
        scripts.calculate(operation, displayedValue, true);
        expect(scripts.varObject.values).toStrictEqual(expectedValues);
        expect(scripts.varObject.operation).toBe(expectedOperation);
    })
});

describe('Should calculate a result from operation(s) and value(s)', () => {
    it.each([
        { operation: 'clear', displayedValue: '123', storedValue: '', storedOperation: '', expected: '0' },
        { operation: 'del', displayedValue: '123', storedValue: '', storedOperation: '', expected: '12' },
        { operation: '=', displayedValue: '123', storedValue: 456, storedOperation: '-', expected: '333' },
        { operation: 'square', displayedValue: '4', storedValue: '', storedOperation: '', expected: '16' },
        { operation: 'cube', displayedValue: '3', storedValue: '', storedOperation: '', expected: '27' },
        { operation: 'inverse', displayedValue: '5', storedValue: '', storedOperation: '', expected: '0.2' },
        { operation: 'fact', displayedValue: '5', storedValue: '', storedOperation: '', expected: '120' },
        { operation: 'abs', displayedValue: '-4', storedValue: '', storedOperation: '', expected: '4' },
        { operation: 'abs', displayedValue: '4', storedValue: '', storedOperation: '', expected: '4' },
        { operation: '%', displayedValue: '20', storedValue: '', storedOperation: '', expected: '0.2' }
    ])('.returns the displayed value after operation $operation', ({ operation, displayedValue, storedValue, storedOperation, expected }) => {
        // set up DOM
        display = document.body.querySelector('.display h1');
        display.innerHTML = displayedValue;

        //set up stored values
        if (storedValue != '') {
            scripts.varObject.values.push(storedValue);
        }
        scripts.varObject.lastButtonPressedType = 'digit';
        scripts.varObject.operation = storedOperation;

        scripts.calculateSingle(operation, displayedValue);
        expect(display.innerHTML).toBe(expected);
    })
});

describe('Should delete the last entered digit', () => {
    it.each([
        { displayedValue: '1234', expected: '123' },
        { displayedValue: '1', expected: '0' },
        { displayedValue: '2289', expected: '228' },
        { displayedValue: '1234', expected: '123' },
        { displayedValue: '2424', expected: '242' }
    ])('.deletes the last entered digit', ({ displayedValue, expected }) => {
        display = document.body.querySelector('.display h1');
        display.innerHTML = displayedValue;
        expect(scripts.del()).toBe(expected);
    })
});

describe('Should clear the display', () => {
    it.each([
        { displayedValue: '1234', expected: '0' },
        { displayedValue: '444555', expected: '0' }
    ])('.clears the display to show $expected', ({ displayedValue, expected }) => {
        display = document.body.querySelector('.display h1');
        display.innerHTML = displayedValue;
        scripts.clearDisplay();
        expect(display.innerHTML).toBe(expected);
    })
});

describe('Should select an operator and style the button', () => {
    it.each([
        { operator: '+', otherOperator: '-', expected: '+', expectedStyle: 'activeBtn' },
        { operator: '-', otherOperator: '+', expected: '-', expectedStyle: 'activeBtn' },
        { operator: '*', otherOperator: '+', expected: '*', expectedStyle: 'activeBtn' },
        { operator: '/', otherOperator: '*', expected: '/', expectedStyle: 'activeBtn' },
        { operator: 'power', otherOperator: 'euler', expected: 'power', expectedStyle: 'activeBtn' },
        { operator: 'euler', otherOperator: 'sin', expected: 'euler', expectedStyle: 'activeBtn' },
        { operator: 'sqrt', otherOperator: 'cos', expected: 'sqrt', expectedStyle: 'activeBtn' },
        { operator: 'cbrt', otherOperator: 'ln', expected: 'cbrt', expectedStyle: 'activeBtn' },
        { operator: 'sin', otherOperator: '-', expected: 'sin', expectedStyle: 'activeBtn' },
        { operator: 'cos', otherOperator: 'tan', expected: 'cos', expectedStyle: 'activeBtn' },
        { operator: 'tan', otherOperator: 'asin', expected: 'tan', expectedStyle: 'activeBtn' },
        { operator: 'asin', otherOperator: 'log10', expected: 'asin', expectedStyle: 'activeBtn' },
        { operator: 'acos', otherOperator: '/', expected: 'acos', expectedStyle: 'activeBtn' },
        { operator: 'atan', otherOperator: 'sqrt', expected: 'atan', expectedStyle: 'activeBtn' },
        { operator: 'log10', otherOperator: 'cbrt', expected: 'log10', expectedStyle: 'activeBtn' },
        { operator: 'ln', otherOperator: 'power', expected: 'ln', expectedStyle: 'activeBtn' }
    ])('.select the operator $operator', ({ operator, otherOperator, expected, expectedStyle }) => {
        button = document.body.querySelector(`[data-method="${operator}"]`);
        otherButton = document.body.querySelector(`[data-method="${otherOperator}"]`);
        expect(scripts.selectOperation(operator)).toBe(expected);
        scripts.selectOperation(operator);
        expect(button.classList.contains(expectedStyle)).toBeTruthy();
        expect(otherButton.classList.contains(expectedStyle)).toBeFalsy();
    })
});

describe('Should set last button pressed type', () => {
    it.each([
        { type: 'digit', expected: 'digit' },
        { type: 'equals', expected: 'equals' },
        { type: 'prec', expected: 'prec' },
        { type: 'special', expected: 'special' },
        { type: 'operator', expected: 'operator' }
    ])('.should set the last button pressed type to $type', ({ type, expected }) => {
        expect(scripts.setLastButtonPressedType(type)).toBe(expected);
    })
});

describe('Should return the result of the selected binary or preceding operation and values', () => {
    it.each([
        { operation: '+', storedValues: [5, 249], expected: 254 },
        { operation: '-', storedValues: [67, 12], expected: 55 },
        { operation: '*', storedValues: [4, 22], expected: 88 },
        { operation: '/', storedValues: [80, 20], expected: 4 },
        { operation: 'power', storedValues: [2, 5], expected: 32 },
        { operation: 'euler', storedValues: [0], expected: 1 },
        { operation: 'sqrt', storedValues: [25], expected: 5 },
        { operation: 'cbrt', storedValues: [64], expected: 4 },
        { operation: 'sin', storedValues: [Math.PI / 2], expected: 1 },
        { operation: 'cos', storedValues: [0], expected: 1 },
        { operation: 'tan', storedValues: [Math.PI], expected: 0 },
        { operation: 'asin', storedValues: [1], expected: Math.PI / 2 },
        { operation: 'acos', storedValues: [1], expected: 0 },
        { operation: 'atan', storedValues: [1], expected: Math.PI / 4 },
        { operation: 'ln', storedValues: [Math.E], expected: 1 },
        { operation: 'log10', storedValues: [10], expected: 1 },
        { operation: '', storedValues: [], expected: 0 }
    ])('.returns the result of the operation $operation', ({ operation, storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        let result = scripts.doOperation(operation);
        //use epsilon to check results are close to expected (if not exact)
        let epsilon = 0.0000000001;
        expect(Math.abs(result - expected)).toBeLessThan(epsilon);
    })
});

describe('Should return the result of the selected unary operation and value', () => {
    it.each([
        { operation: 'square', displayedValue: '10', expected: 100 },
        { operation: 'cube', displayedValue: '5', expected: 125 },
        { operation: 'inverse', displayedValue: '100', expected: 0.01 },
        { operation: 'fact', displayedValue: '6', expected: 720 },
        { operation: 'fact', displayedValue: '250', expected: Infinity },
        { operation: 'abs', displayedValue: '-40', expected: 40 },
        { operation: 'abs', displayedValue: '250', expected: 250 },
        { operation: '%', displayedValue: '65', expected: 0.65 },
        { operation: '', displayedValue: '0', expected: 0 },
        { operation: '', displayedValue: '10', expected: 10 }
    ])('.should calculate the result of using the operation - $operation - on the displayed value - $displayedValue', ({ operation, displayedValue, expected }) => {
        expect(scripts.doSingleValueOperation(operation, displayedValue)).toBe(expected);
    })
});

describe('Should return the factorial of a value, or infinity of the factorial is too large', () => {
    it.each([
        { value: 5, expected: 120 },
        { value: 6, expected: 720 },
        { value: 10, expected: 3628800 },
        { value: 3, expected: 6 }
    ])('.should calculate the factorial of the value - $value', ({ value, expected }) => {
        expect(scripts.factorial(value)).toBe(expected);
    })
});

describe('Should add two numbers', () => {
    it.each([
        { storedValues: [1, 2], expected: 3 },
        { storedValues: [5, 8], expected: 13 },
        { storedValues: [10, -4], expected: 6 },
        { storedValues: [110, 200], expected: 310 },
    ])('.returns the sum of two numbers - $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        expect(scripts.add()).toBe(expected);
    })
});

describe('Should subtract one number from another', () => {
    it.each([
        { storedValues: [3, 1], expected: 2 },
        { storedValues: [25, 11], expected: 14 },
        { storedValues: [100, 150], expected: -50 },
        { storedValues: [45, -20], expected: 65 }
    ])('.returns the result of subtracting the second value from the first in $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        expect(scripts.subtract()).toBe(expected);
    })
});

describe('Should multiply two numbers', () => {
    it.each([
        { storedValues: [1, 2], expected: 2 },
        { storedValues: [2, 5], expected: 10 },
        { storedValues: [10, -5], expected: -50 },
        { storedValues: [-1.2, -3], expected: 3.6 }
    ])('.returns the result of multiplying two numbers - $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        let result = scripts.multiply();
        let epsilon = 0.0000000001;
        expect(Math.abs(result - expected)).toBeLessThan(epsilon);
    })
});

describe('Should divide one number by another', () => {
    it.each([
        { storedValues: [8, 2], expected: 4 },
        { storedValues: [100, 5], expected: 20 },
        { storedValues: [-8, 2], expected: -4 },
        { storedValues: [1.2, 0.1], expected: 12 }
    ])('.returns the result of dividing the first number by the second in $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        let result = scripts.divide();
        let epsilon = 0.0000000001;
        expect(Math.abs(result - expected)).toBeLessThan(epsilon);
    })
});

describe('Should square a number', () => {
    it.each([
        { value: 5, expected: 25 },
        { value: 1, expected: 1 },
        { value: 10, expected: 100 },
        { value: -4, expected: 16 }
    ])('.returns the square of a value - $value', ({ value, expected }) => {
        expect(scripts.square(value)).toBe(expected);
    })
});

describe('Should cube a number', () => {
    it.each([
        { value: 2, expected: 8 },
        { value: 1, expected: 1 },
        { value: 10, expected: 1000 },
        { value: -4, expected: -64 }
    ])('.returns the cube of a value - $value', ({ value, expected }) => {
        expect(scripts.cube(value)).toBe(expected);
    })
});

describe('Should invert a number', () => {
    it.each([
        { value: 5, expected: 0.2 },
        { value: 1, expected: 1 },
        { value: 10, expected: 0.1 },
        { value: -4, expected: -0.25 }
    ])('.returns the inverse of a value - $value', ({ value, expected }) => {
        expect(scripts.invert(value)).toBe(expected);
    })
});

describe('Should raise a number to a power', () => {
    it.each([
        { storedValues: [1, 2], expected: 1 },
        { storedValues: [0, 100], expected: 0 },
        { storedValues: [5, 3], expected: 125 },
        { storedValues: [3, 4], expected: 81 }
    ])('.returns the first number raised to the power of the second - $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        expect(scripts.power()).toBe(expected);
    })
});

describe('Should raise e to the power of a given number', () => {
    it.each([
        { storedValues: [1], expected: Math.E },
        { storedValues: [0], expected: 1 },
        { storedValues: [2], expected: Math.E ** 2 }
    ])('.returns e to the power of a value - $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        expect(scripts.euler()).toBe(expected);
    })
});

describe('Should squareroot a number', () => {
    it.each([
        { storedValues: [1], expected: 1 },
        { storedValues: [4], expected: 2 },
        { storedValues: [121], expected: 11 },
        { storedValues: [81], expected: 9 }
    ])('.returns the squareroot of a value - $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        expect(scripts.sqrt()).toBe(expected);
    })
});

describe('Should cuberoot a number', () => {
    it.each([
        { storedValues: [125], expected: 5 },
        { storedValues: [343], expected: 7 },
        { storedValues: [1000], expected: 10 },
        { storedValues: [-1728], expected: -12 }
    ])('.returns the cuberoot of a value - $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        expect(scripts.cbrt()).toBe(expected);
    })
});

describe('Should return the sin of the number in radians', () => {
    it.each([
        { storedValues: [Math.PI], expected: 0 },
        { storedValues: [Math.PI / 2], expected: 1 },
        { storedValues: [Math.PI / 6], expected: 0.5 }
    ])('.returns the sin of a value - $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        let result = scripts.sin();
        let epsilon = 0.0000000001;
        expect(Math.abs(result - expected)).toBeLessThan(epsilon);
    })
});

describe('Should return the cos of the number in radians', () => {
    it.each([
        { storedValues: [Math.PI], expected: -1 },
        { storedValues: [Math.PI / 2], expected: 0 },
        { storedValues: [Math.PI / 3], expected: 0.5 }
    ])('.returns the cos of a value - $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        let result = scripts.cos();
        let epsilon = 0.0000000001;
        expect(Math.abs(result - expected)).toBeLessThan(epsilon);
    })
});

describe('Should return the tan of the number in radians', () => {
    it.each([
        { storedValues: [Math.PI], expected: 0 },
        { storedValues: [Math.PI / 4], expected: 1 }
    ])('.returns the tan of a value - $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        let result = scripts.tan();
        let epsilon = 0.0000000001;
        expect(Math.abs(result - expected)).toBeLessThan(epsilon);
    })
});

describe('Should return the inverse sin of the number in radians', () => {
    it.each([
        { storedValues: [0], expected: 0 },
        { storedValues: [1], expected: Math.PI / 2 },
        { storedValues: [0.5], expected: Math.PI / 6 }
    ])('.returns the inverse sin of a value - $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        let result = scripts.asin();
        let epsilon = 0.0000000001;
        expect(Math.abs(result - expected)).toBeLessThan(epsilon);
    })
});

describe('Should return the inverse cos of the number in radians', () => {
    it.each([
        { storedValues: [-1], expected: Math.PI },
        { storedValues: [0], expected: Math.PI / 2 },
        { storedValues: [0.5], expected: Math.PI / 3 }
    ])('.returns the inverse cos of a value - $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        let result = scripts.acos();
        let epsilon = 0.0000000001;
        expect(Math.abs(result - expected)).toBeLessThan(epsilon);
    })
});

describe('Should return the inverse tan of the number in radians', () => {
    it.each([
        { storedValues: [1], expected: Math.PI / 4 },
        { storedValues: [0], expected: 0 }
    ])('.returns the inverse tan of a value - $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        let result = scripts.atan();
        let epsilon = 0.0000000001;
        expect(Math.abs(result - expected)).toBeLessThan(epsilon);
    })
});

describe('Should return the log base 10 of a number', () => {
    it.each([
        { storedValues: [1], expected: 0 },
        { storedValues: [10], expected: 1 },
        { storedValues: [100], expected: 2 },
        { storedValues: [1000], expected: 3 }
    ])('.returns the log10 of a value - $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        expect(scripts.log10()).toBe(expected);
    })
});

describe('Should return the natural log of a number', () => {
    it.each([
        { storedValues: [1], expected: 0 },
        { storedValues: [Math.E], expected: 1 },
        { storedValues: [Math.E * Math.E], expected: 2 }
    ])('.returns the natural log of a value - $storedValues', ({ storedValues, expected }) => {
        scripts.varObject.values = storedValues;
        expect(scripts.ln()).toBe(expected);
    })
});

describe('Should complete an operation (equals)', () => {
    it.each([
        { storedValues: [2, 2], lastOperation: '+', expected: 4 },
        { storedValues: [10, 8], lastOperation: '-', expected: 2 },
        { storedValues: [2, 5], lastOperation: '*', expected: 10 },
        { storedValues: [5.5, 1.1], lastOperation: '/', expected: 5 },
        { storedValues: [5, 2], lastOperation: 'power', expected: 25 },
        { storedValues: [0], lastOperation: 'euler', expected: 1 },
        { storedValues: [100], lastOperation: 'sqrt', expected: 10 },
        { storedValues: [64], lastOperation: 'cbrt', expected: 4 },
        { storedValues: [Math.PI], lastOperation: 'sin', expected: 0 },
        { storedValues: [Math.PI], lastOperation: 'cos', expected: -1 },
        { storedValues: [Math.PI], lastOperation: 'tan', expected: 0 },
        { storedValues: [1], lastOperation: 'asin', expected: Math.PI / 2 },
        { storedValues: [0.5], lastOperation: 'acos', expected: Math.PI / 3 },
        { storedValues: [1], lastOperation: 'atan', expected: Math.PI / 4 },
        { storedValues: [100], lastOperation: 'log10', expected: 2 },
        { storedValues: [Math.E], lastOperation: 'ln', expected: 1 },
        { storedValues: [2], lastOperation: '', expected: 0 },
    ])('.returns the result of the stored values - $storedValues - and last operation entered - $lastOperation', ({ storedValues, lastOperation, expected }) => {
        scripts.varObject.values = storedValues;
        let result = scripts.equals(lastOperation);
        let epsilon = 0.0000000001;
        expect(Math.abs(result - expected)).toBeLessThan(epsilon);
    })
});

describe('Should clear styles from all buttons', () => {
    it.each([
        { button: '+', className: 'activeBtn' },
        { button: '-', className: 'activeBtn' },
        { button: '/', className: 'activeBtn' },
        { button: '*', className: 'activeBtn' },
        { button: 'power', className: 'activeBtn' },
        { button: 'euler', className: 'activeBtn' },
        { button: 'sqrt', className: 'activeBtn' },
        { button: 'cbrt', className: 'activeBtn' },
        { button: 'sin', className: 'activeBtn' },
        { button: 'cos', className: 'activeBtn' },
        { button: 'tan', className: 'activeBtn' },
        { button: 'asin', className: 'activeBtn' },
        { button: 'acos', className: 'activeBtn' },
        { button: 'atan', className: 'activeBtn' },
        { button: 'log10', className: 'activeBtn' },
        { button: 'ln', className: 'activeBtn' }
    ])('.removes active styles from button $button', ({ button, className }) => {
        let btn = document.body.querySelector(`[data-method="${button}"]`);
        btn.classList.add(className);
        scripts.clearOpStyles();
        expect(btn.classList.contains(className)).toBeFalsy();
    })
});

describe('Should return the full displayed value', () => {
    it.each([
        { valueToDisplay: Math.PI, precision: 10, expected: '3.141592654' },
        { valueToDisplay: 1, precision: 0, expected: '1' },
        { valueToDisplay: 155978, precision: 0, expected: '155978' },
        { valueToDisplay: 9999999999, precision: 0, expected: '1.0000000e+10' },
        { valueToDisplay: 0.00000002, precision: 0, expected: '2e-8' },
        { valueToDisplay: 0.00000044, precision: 0, expected: '4.4e-7' },
        { valueToDisplay: 1234567890, precision: 0, expected: '1.2345679e+9' }
    ])('.returns the displayed value when $valueToDisplay is sent to the display', ({ valueToDisplay, precision, expected }) => {
        expect(scripts.displayScreenValue(valueToDisplay, precision)).toBe(expected);
    })
});