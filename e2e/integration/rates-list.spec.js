/// <reference types="Cypress" />

describe('Default Page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should automatically redirect to rates list page', () => {
        cy.url().should('include', '/rates');
    });

    it('should render top bar and rates list is selected', () => {
        const topbarRatesTab = cy.get('.top-bar__nav.rates');
        topbarRatesTab.contains('Rates List');
        topbarRatesTab.should('have.class', 'active');
    });

    it('should by default use NZD as input', () => {
        cy.get('app-currency-selector input.mat-input-element')
            .invoke('val')
            .then(text => assert.equal(text, 'NZD'));
    });

    it('should show Result not Found if input length is not 3', () => {
        cy.get('app-currency-selector input.mat-input-element')
            .clear()
            .then(() => {
                cy.get('.rates-list__no-result').should('be.visible');
            });
    });

    it('should show Result not Found if input currency is not an existed currency', () => {
        cy.get('app-currency-selector input.mat-input-element')
            .clear()
            .type('NZZ')
            .then(() => {
                cy.get('.rates-list__no-result').should('be.visible');
            });
    });

    it('should show list resut if input is valid', () => {
        cy.get('app-currency-selector input.mat-input-element')
            .clear()
            .type('AUD')
            .then(() => {
                cy.get('.rates-list__no-result').should('be.hidden');
            });
    });
});
