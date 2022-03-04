describe('Binary and preceding operators change style on press', () => {
    before(() => {
        cy.visit('https://makxks.github.io/Calculator/');
    });
    it('Adds style to x^y button', () => {
        let button = cy.get('[data-method="power"]');
        button.click();
        button.should('have.class', 'activeBtn');
    });
    it('Adds style to sqrt button and removes style from any other operator buttons', () => {
        let button = cy.get('[data-method="sqrt"]');
        button.click();
        button.should('have.class', 'activeBtn');
        cy.get('[data-method="power"]').should('not.have.class', 'activeBtn');
    });
    it('Adds style to cbrt button and removes style from any other operator buttons', () => {
        let button = cy.get('[data-method="cbrt"]');
        button.click();
        button.should('have.class', 'activeBtn');
        cy.get('[data-method="sqrt"]').should('not.have.class', 'activeBtn');
    });
    it('Adds style to sin button and removes style from any other operator buttons', () => {
        let button = cy.get('[data-method="sin"]');
        button.click();
        button.should('have.class', 'activeBtn');
        cy.get('[data-method="cbrt"]').should('not.have.class', 'activeBtn');
    });
    it('Adds style to cos button and removes style from any other operator buttons', () => {
        let button = cy.get('[data-method="cos"]');
        button.click();
        button.should('have.class', 'activeBtn');
        cy.get('[data-method="sin"]').should('not.have.class', 'activeBtn');
    });
    it('Adds style to tan button and removes style from any other operator buttons', () => {
        let button = cy.get('[data-method="tan"]');
        button.click();
        button.should('have.class', 'activeBtn');
        cy.get('[data-method="cos"]').should('not.have.class', 'activeBtn');
    });
    it('Adds style to asin button and removes style from any other operator buttons', () => {
        let button = cy.get('[data-method="asin"]');
        button.click();
        button.should('have.class', 'activeBtn');
        cy.get('[data-method="tan"]').should('not.have.class', 'activeBtn');
    });
    it('Adds style to acos button and removes style from any other operator buttons', () => {
        let button = cy.get('[data-method="acos"]');
        button.click();
        button.should('have.class', 'activeBtn');
        cy.get('[data-method="asin"]').should('not.have.class', 'activeBtn');
    });
    it('Adds style to atan button and removes style from any other operator buttons', () => {
        let button = cy.get('[data-method="atan"]');
        button.click();
        button.should('have.class', 'activeBtn');
        cy.get('[data-method="acos"]').should('not.have.class', 'activeBtn');
    });
    it('Adds style to log10 button and removes style from any other operator buttons', () => {
        let button = cy.get('[data-method="log10"]');
        button.click();
        button.should('have.class', 'activeBtn');
        cy.get('[data-method="atan"]').should('not.have.class', 'activeBtn');
    });
    it('Adds style to ln button and removes style from any other operator buttons', () => {
        let button = cy.get('[data-method="ln"]');
        button.click();
        button.should('have.class', 'activeBtn');
        cy.get('[data-method="log10"]').should('not.have.class', 'activeBtn');
    });
    it('Adds style to + button and removes style from any other operator buttons', () => {
        let button = cy.get('[data-method="+"]');
        button.click();
        button.should('have.class', 'activeBtn');
        cy.get('[data-method="ln"]').should('not.have.class', 'activeBtn');
    });
    it('Adds style to - button and removes style from any other operator buttons', () => {
        let button = cy.get('[data-method="-"]');
        button.click();
        button.should('have.class', 'activeBtn');
        cy.get('[data-method="+"]').should('not.have.class', 'activeBtn');
    });
    it('Adds style to * button and removes style from any other operator buttons', () => {
        let button = cy.get('[data-method="*"]');
        button.click();
        button.should('have.class', 'activeBtn');
        cy.get('[data-method="-"]').should('not.have.class', 'activeBtn');
    });
    it('Adds style to / button and removes style from any other operator buttons', () => {
        let button = cy.get('[data-method="/"]');
        button.click();
        button.should('have.class', 'activeBtn');
        cy.get('[data-method="*"]').should('not.have.class', 'activeBtn');
    });
    it('Clears styles from operator buttons', () => {
        cy.get('[data-method="clear"').click();
        cy.get('[data-method="/"').should('not.have.class', 'activeBtn');
    });
})