import {gql} from 'apollo-angular';

export const queryCurrencyList = gql`
    query currencyList {
        currencyList {
            currencyList
        }
    }
`;

export const queryLatestExchangeRate = gql`
    query latestExchangeRate($base: String!, $target: String!) {
        exchangeRate(base: $base, target: $target) {
            rates
        }
    }
`;

export const queryLatestRatesByBaseCurrency = gql`
    query latestRatesByBaseCurrency($base: String!) {
        rates(base: $base) {
            rates
        }
    }
`;
