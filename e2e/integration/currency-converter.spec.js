/// <reference types="Cypress" />

describe('Currency Converter Page', () => {
    beforeEach(() => {
        cy.visit('/converter');
    });

    it('should render top bar and Currency Converter is selected', () => {
        cy.visit('/converter');

        cy.url().should('include', '/converter');

        const topbarConverterTab = cy.get('.top-bar__nav.converter');
        topbarConverterTab.contains('Currency Converter');
        topbarConverterTab.should('have.class', 'active');
    });

    it('should by default use NZD as "From" currency and USD as "To" currency and 1 as Amount', () => {
        cy.get('input[ng-reflect-placeholder=From]')
            .invoke('val')
            .then(text => assert.equal(text, 'NZD'));

        cy.get('input[ng-reflect-placeholder=To]')
            .invoke('val')
            .then(text => assert.equal(text, 'USD'));

        cy.get('input[type=number]')
            .invoke('val')
            .then(text => assert.equal(text, '1'));
    });

    it('should show Invalid Input if any currency input length is not 3', () => {
        cy.get('input[ng-reflect-placeholder=From]')
            .clear()
            .then(() => {
                cy.get('.converter__result').should('contain.text', 'Invalid Input');
            });
    });

    it('should show Invalid Input if any currency input is not an exited currency', () => {
        cy.get('input[ng-reflect-placeholder=From]')
            .clear()
            .type('NZZ')
            .then(() => {
                cy.get('.converter__result').should('contain.text', 'Invalid Input');
            });
    });

    it('should show result if inputs are valid', () => {
        cy.get('input[ng-reflect-placeholder=To]')
            .clear()
            .type('AUD')
            .then(() => {
                cy.get('.converter__result').should('contain.text', 'AUD');
            });
    });
});
