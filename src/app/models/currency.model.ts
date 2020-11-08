export interface Currency {
    rates: Record<string, number>;
    date?: string;
    base?: string;
}

export interface CurrencyList {
    currencyList: string[];
}

export interface QueryRates {
    rates: {
        rates: string;
    };
}

export interface QueryExchangeRate {
    exchangeRate: {
        rates: string;
    };
}

export interface QueryCurrencyList {
    currencyList: {
        currencyList: string[];
    };
}
