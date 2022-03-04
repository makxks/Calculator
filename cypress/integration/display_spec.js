describe('Displays digits to appropriate precision according to input', () => {
    before(() => {
        cy.visit('https://makxks.github.io/Calculator/');
    });
    beforeEach(() => {
        cy.get('[data-method="clear"]').click();
    });
    it('Displays 10 digits of PI', () => {
        cy.get('[data-method="pi"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('3.141592654');
        });
    });
    it('Rounds large numbers', () => {
        cy.get('[data-method="7"]').click();
        cy.get('[data-method="7"]').click();
        cy.get('[data-method="7"]').click();
        cy.get('[data-method="7"]').click();
        cy.get('[data-method="7"]').click();
        cy.get('[data-method="7"]').click();
        cy.get('[data-method="7"]').click();
        cy.get('[data-method="7"]').click();
        cy.get('[data-method="7"]').click();
        cy.get('[data-method="7"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('7.7777778e+9');
        });
    });
    it('Rounds small numbers', () => {
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="."]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="2"]').click();
        cy.get('[data-method="*"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="."]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="2"]').click();
        cy.get('[data-method="="]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('4.00000e-14');
        });
    });
});