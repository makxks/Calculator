describe('Reacts to keyboard presses', () => {
    before(() => {
        cy.visit('https://makxks.github.io/Calculator/');
    });
    beforeEach(() => {
        cy.get('[data-method="clear"]').click();
    });
    it('Presses the 1 button in response to the 1 key being pressed', () => {
        cy.get('body').trigger('keydown', { key: 1 });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('1');
        });
    });
    it('Presses the 2 button in response to the 2 key being pressed', () => {
        cy.get('body').trigger('keydown', { key: 2 });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('2');
        });
    });
    it('Presses the 3 button in response to the 3 key being pressed', () => {
        cy.get('body').trigger('keydown', { key: 3 });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('3');
        });
    });
    it('Presses the 4 button in response to the 4 key being pressed', () => {
        cy.get('body').trigger('keydown', { key: 4 });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('4');
        });
    });
    it('Presses the 5 button in response to the 5 key being pressed', () => {
        cy.get('body').trigger('keydown', { key: 5 });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('5');
        });
    });
    it('Presses the 6 button in response to the 6 key being pressed', () => {
        cy.get('body').trigger('keydown', { key: 6 });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('6');
        });
    });
    it('Presses the 7 button in response to the 7 key being pressed', () => {
        cy.get('body').trigger('keydown', { key: 7 });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('7');
        });
    });
    it('Presses the 8 button in response to the 8 key being pressed', () => {
        cy.get('body').trigger('keydown', { key: 8 });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('8');
        });
    });
    it('Presses the 9 button in response to the 9 key being pressed', () => {
        cy.get('body').trigger('keydown', { key: 9 });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('9');
        });
    });
    it('Presses the 0 button in response to the 0 key being pressed', () => {
        cy.get('body').trigger('keydown', { key: 0 });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('0');
        });
    });
    it('Presses the . button in response to the . key being pressed', () => {
        cy.get('body').trigger('keydown', { key: '.' });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('0.');
        });
    });
    it('Presses the + button in response to the + key being pressed', () => {
        cy.get('body').trigger('keydown', { key: '+' });
        cy.get('[data-method="+"]').should('have.class', 'activeBtn');
    });
    it('Presses the - button in response to the - key being pressed', () => {
        cy.get('body').trigger('keydown', { key: '-' });
        cy.get('[data-method="-"]').should('have.class', 'activeBtn');
    });
    it('Presses the / button in response to the / key being pressed', () => {
        cy.get('body').trigger('keydown', { key: '/' });
        cy.get('[data-method="/"]').should('have.class', 'activeBtn');
    });
    it('Presses the * button in response to the * key being pressed', () => {
        cy.get('body').trigger('keydown', { key: '*' });
        cy.get('[data-method="*"]').should('have.class', 'activeBtn');
    });
    it('Presses the % button in response to the % key being pressed', () => {
        cy.get('body').trigger('keydown', { key: 9 });
        cy.get('body').trigger('keydown', { key: '%' });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('0.09');
        });
    });
    it('Presses the = button in response to the Enter key being pressed', () => {
        cy.get('body').trigger('keydown', { key: 7 });
        cy.get('body').trigger('keydown', { key: '-' });
        cy.get('body').trigger('keydown', { key: 2 });
        cy.get('body').trigger('keydown', { key: 'Enter' });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('5');
        });
    });
    it('Presses the = button in response to the = key being pressed', () => {
        cy.get('body').trigger('keydown', { key: 5 });
        cy.get('body').trigger('keydown', { key: '*' });
        cy.get('body').trigger('keydown', { key: 2 });
        cy.get('body').trigger('keydown', { key: '=' });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('10');
        });
    });
    it('Presses the delete button in response to the Delete key being pressed', () => {
        cy.get('body').trigger('keydown', { key: 4 });
        cy.get('body').trigger('keydown', { key: 7 });
        cy.get('body').trigger('keydown', { key: 'Delete' });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('4');
        });
    });
    it('Presses the delete button in response to the Backspace key being pressed', () => {
        cy.get('body').trigger('keydown', { key: 5 });
        cy.get('body').trigger('keydown', { key: 2 });
        cy.get('body').trigger('keydown', { key: 'Backspace' });
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('5');
        });
    });
});