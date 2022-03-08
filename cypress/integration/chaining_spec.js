describe('Chains calculations', () => {
    before(() => {
        cy.visit('https://makxks.github.io/Calculator/');
    });
    beforeEach(() => {
        cy.get('[data-method="clear"]').click();
    });
    it('Displays intermediate result of chained operations', () => {
        cy.get('[data-method="4"]').click();
        cy.get('[data-method="2"]').click();
        cy.get('[data-method="."]').click();
        cy.get('[data-method="1"]').click();
        cy.get('[data-method="-"]').click();
        cy.get('[data-method="0"]').click();
        cy.get('[data-method="."]').click();
        cy.get('[data-method="1"]').click();
        cy.get('[data-method="*"]').click();

        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('42');
        });

        cy.get('[data-method="2"]').click();
        cy.get('[data-method="+"]').click();

        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('84');
        });

        cy.get('[data-method="1"]').click();
        cy.get('[data-method="6"]').click();

        cy.get('[data-method="log10"]').click();

        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('100');
        });

        cy.get('[data-method="-"]').click();

        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('2');
        });


        cy.get('[data-method="2"]').click();
        cy.get('[data-method="="]').click();

        cy.get('h1').should(($h1) => {
            expect($h1[0].innerText).to.equal('0');
        });
    })
});