/// <reference types="Cypress" />

describe('Currency Converter Page', () => {
    beforeEach(() => {
        cy.visit('/converter');
    });

    it('should render top bar and Currency Converter is selected', () => {
        cy.visit('/converter');

        cy.url().should('include', '/converter');

        const topbarConverterTab = cy.get('.top-bar__nav.converter');
        topbarConverterTab.should('contain.text', 'Currency Converter');
        topbarConverterTab.should('have.class', 'active');
    });

    it('should by default use NZD as "From" currency and USD as "To" currency and 1 as Amount', () => {});

    // it('should show Invalid Input if any Currency input length is not 3', () => {});

    // it('should show Invalid Input if any Currency input is not an exited currency', () => {});

    // it('should show Invalid Input if any Currency input is not an exited currency', () => {});
});
