export interface Currency {
    rates: Record<string, number>;
    date?: string;
    base?: string;
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
