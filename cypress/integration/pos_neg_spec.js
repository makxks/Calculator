describe('Changes the sign from positive to negative (or vice-versa)', () => {
    before(() => {
        cy.visit('https://makxks.github.io/Calculator/');
    });
    it('Changes the sign on the digits being input', () => {
        cy.get('[data-method="2"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('2');
        });
        cy.get('[data-method="posneg"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('-2');
        });
        cy.get('[data-method="1"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('-21');
        });
        cy.get('[data-method="posneg"]').click();
        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('21');
        });
    });
})