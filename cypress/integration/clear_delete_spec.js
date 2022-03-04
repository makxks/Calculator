describe('Clear and delete buttons work appropriately', () => {
    before(() => {
        cy.visit('https://makxks.github.io/Calculator/');
    });
    beforeEach(() => {
        cy.get('[data-method="clear"]').click();
    });
    it('Deletes the last displayed digit if las button pressed was digit', () => {
        cy.get('[data-method="1"]').click();
        cy.get('[data-method="2"]').click();
        cy.get('[data-method="del"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('1');
        });
    });
    it('Does not delete the last displayed digit if last button pressed was not a digit', () => {
        cy.get('[data-method="7"]').click();
        cy.get('[data-method="8"]').click();
        cy.get('[data-method="+"]').click();
        cy.get('[data-method="del"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('78');
        });
    });
    it('Clears the display back to 0', () => {
        cy.get('[data-method="4"]').click();
        cy.get('[data-method="8"]').click();
        cy.get('[data-method="7"]').click();
        cy.get('[data-method="."]').click();
        cy.get('[data-method="1"]').click();
        cy.get('[data-method="3"]').click();
        cy.get('[data-method="clear"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('0');
        });
    });
})