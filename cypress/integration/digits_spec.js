describe('Digit buttons respond to presses', () => {
    before(() => {
        cy.visit('https://makxks.github.io/Calculator/');
    });
    beforeEach(() => {
        cy.get('button.clear').contains('C').click();
    });
    it('presses the 1 button and displays 1', () => {
        cy.get('[data-method="1"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('1');
        });
    });
    it('presses the 2 button and displays 2', () => {
        cy.get('[data-method="2"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('2');
        });
    });
    it('presses the 3 button and displays 3', () => {
        cy.get('[data-method="3"').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('3');
        });
    });
    it('presses the 4 button and displays 4', () => {
        cy.get('[data-method="4"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('4');
        });
    });
    it('presses the 5 button and displays 5', () => {
        cy.get('[data-method="5"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('5');
        });
    });
    it('presses the 6 button and displays 6', () => {
        cy.get('[data-method="6"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('6');
        });
    });
    it('presses the 7 button and displays 7', () => {
        cy.get('[data-method="7"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('7');
        });
    });
    it('presses the 8 button and displays 8', () => {
        cy.get('[data-method="8"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('8');
        });
    });
    it('presses the 9 button and displays 9', () => {
        cy.get('[data-method="9"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('9');
        });
    });
    it('presses the . button and displays .', () => {
        cy.get('[data-method="."]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('0.');
        });
    });
    it('presses the 0 button and displays 0', () => {
        cy.get('[data-method="0"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('0');
        });
    });

    it('presses a sequence of buttons and displays the sequence', () => {
        cy.get('button.digit').contains('5').click();
        cy.get('button.digit').contains('9').click();
        cy.get('button.digit').contains('0').click();
        cy.get('button.digit').contains('.').click();
        cy.get('button.digit').contains('8').click();
        cy.get('button.digit').contains('6').click();
        cy.get('button.digit').contains('2').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('590.862');
        });
    });
})