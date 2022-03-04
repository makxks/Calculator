describe('Performs calculations correctly (to within appropriate error)', () => {
    before(() => {
        cy.visit('https://makxks.github.io/Calculator/');
    });
    beforeEach(() => {
        cy.get('[data-method="clear"]').click();
    });
    it('Adds two numbers', () => {
        cy.get('[data-method="1"]').click();
        cy.get('[data-method="+"]').click();
        cy.get('[data-method="7"]').click();
        cy.get('[data-method="8"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('79');
        });
    });
    it('Subtracts one number from another', () => {
        cy.get('[data-method="9"]').click();
        cy.get('[data-method="9"]').click();
        cy.get('[data-method="-"]').click();
        cy.get('[data-method="7"]').click();
        cy.get('[data-method="8"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('21');
        });
    });
    it('Multiplies two numbers together', () => {
        cy.get('[data-method="9"]').click();
        cy.get('[data-method="*"]').click();
        cy.get('[data-method="7"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('63');
        });
    });
    it('Divides one number by another', () => {
        cy.get('[data-method="9"]').click();
        cy.get('[data-method="9"]').click();
        cy.get('[data-method="/"]').click();
        cy.get('[data-method="3"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('33');
        });
    });
    it('Raises one number to the power of another', () => {
        cy.get('[data-method="3"]').click();
        cy.get('[data-method="power"]').click();
        cy.get('[data-method="3"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('27');
        });
    });
    it('Squares a number', () => {
        cy.get('[data-method="9"]').click();
        cy.get('[data-method="square"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('81');
        });
    });
    it('Cubes a number', () => {
        cy.get('[data-method="2"]').click();
        cy.get('[data-method="cube"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('8');
        });
    });
    it('Inverts a number', () => {
        cy.get('[data-method="1"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="inverse"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('0.1');
        });
    });
    it('Raises e to the power of a number', () => {
        cy.get('[data-method="euler"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('1');
        });
    });
    it('Squareroots a number', () => {
        cy.get('[data-method="sqrt"]').click();
        cy.get('[data-method="1"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('10');
        });
    });
    it('Cuberoots a number', () => {
        cy.get('[data-method="cbrt"]').click();
        cy.get('[data-method="2"]').click();
        cy.get('[data-method="7"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('3');
        });
    });
    it('Gives the sine of a number in radians', () => {
        cy.get('[data-method="pi"]').click();
        cy.get('[data-method="/"]').click();
        cy.get('[data-method="2"]').click();
        cy.get('[data-method="="]').click();
        cy.get('[data-method="sin"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').then(($h1) => {
            let expected = 1;
            let result = $h1[0].innerText;
            let epsilon = 0.000001;
            expect(Math.abs(result - expected)).to.be.below(epsilon);
        });
    });
    it('Gives the cosine of a number in radians', () => {
        cy.get('[data-method="pi"]').click();
        cy.get('[data-method="cos"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').then(($h1) => {
            let expected = -1;
            let result = $h1[0].innerText;
            let epsilon = 0.000001;
            expect(Math.abs(result - expected)).to.be.below(epsilon);
        });
    });
    it('Gives the tangent of a number in radians', () => {
        cy.get('[data-method="pi"]').click();
        cy.get('[data-method="tan"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').then(($h1) => {
            let expected = 0;
            let result = $h1[0].innerText;
            let epsilon = 0.000001;
            expect(Math.abs(result - expected)).to.be.below(epsilon);
        });
    });
    it('Gives the inverse sine of a number in radians', () => {
        cy.get('[data-method="1"]').click();
        cy.get('[data-method="asin"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').then(($h1) => {
            let expected = Math.PI / 2;
            let result = $h1[0].innerText;
            let epsilon = 0.000001;
            expect(Math.abs(result - expected)).to.be.below(epsilon);
        });
    });
    it('Gives the inverse cosine of a number in radians', () => {
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="."]').click();
        cy.get('[data-method="5"]').click();
        cy.get('[data-method="acos"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').then(($h1) => {
            let expected = Math.PI / 3;
            let result = $h1[0].innerText;
            let epsilon = 0.000001;
            expect(Math.abs(result - expected)).to.be.below(epsilon);
        });
    });
    it('Gives the inverse tangent of a number in radians', () => {
        cy.get('[data-method="1"]').click();
        cy.get('[data-method="atan"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').then(($h1) => {
            let expected = Math.PI / 4;
            let result = $h1[0].innerText;
            let epsilon = 0.000001;
            expect(Math.abs(result - expected)).to.be.below(epsilon);
        });
    });
    it('Gives the log base10 of a number', () => {
        cy.get('[data-method="1"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="log10"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('5');
        });
    });
    it('Gives the natural log of a number', () => {
        cy.get('[data-method="euler"]').click();
        cy.get('[data-method="1"]').click();
        cy.get('[data-method="="]').click();
        cy.get('[data-method="square"]').click();
        cy.get('[data-method="ln"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').should(($h1) => {
            let expected = 2;
            let result = $h1[0].innerText;
            let epsilon = 0.000001;
            expect(Math.abs(result - expected)).to.be.below(epsilon);
        });
    });
    it('Gives the percentage form of a number', () => {
        cy.get('[data-method="1"]').click();
        cy.get('[data-method="%"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('0.01');
        });
    });
    it('Gives the absolute value of a number', () => {
        cy.get('[data-method="5"]').click();
        cy.get('[data-method="abs"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('5');
        });
        cy.get('[data-method="clear"]').click();
        cy.get('[data-method="5"]').click();
        cy.get('[data-method="posneg"]').click();
        cy.get('[data-method="abs"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('5');
        });
    });
    it('Gives the factorial of a number or infinity', () => {
        cy.get('[data-method="5"]').click();
        cy.get('[data-method="fact"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('120');
        });
    });
})