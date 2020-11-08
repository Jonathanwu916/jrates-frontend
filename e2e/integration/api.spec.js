const queryCurrencyList = `
{
    currencyList {
        currencyList
    }
}
`;

const queryExchangeRate = (base, target) => `
{
    exchangeRate(base: "${base}", target: "${target}") {
        rates
    }
}
`;

const queryRates = base => `
{
    rates(base: "${base}") {
        rates
    }
}
`;

const url = 'http://localhost:5000/graphql';

Cypress.Commands.add('queryGQL', query => {
    return cy.request({
        method: 'POST',
        url, // graphql endpoint
        body: {query},
        failOnStatusCode: false,
    });
});

describe('GraphQL API test', () => {
    it('should successfully query currency list', () => {
        cy.queryGQL(queryCurrencyList).then(res => {
            const response = res.body.data;
            assert.isObject(response);
            assert.isArray(response.currencyList.currencyList);
            assert.isTrue(response.currencyList.currencyList.includes('NZD'));
        });
    });

    it('should successfully query exchange rate', () => {
        cy.queryGQL(queryExchangeRate('NZD', 'USD')).then(res => {
            const response = res.body.data;
            assert.isObject(response);
            assert.isString(response.exchangeRate.rates);
            assert.isTrue(Object.keys(JSON.parse(response.exchangeRate.rates)).includes('USD'));
        });
    });

    it('should successfully query rates by base currency', () => {
        cy.queryGQL(queryRates('NZD')).then(res => {
            const response = res.body.data;
            assert.isObject(response);
            assert.isString(response.rates.rates);
            assert.isTrue(Object.keys(JSON.parse(response.rates.rates)).includes('NZD'));
        });
    });
});
