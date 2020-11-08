import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {GraphqlService} from './graphql.service';
import {catchError, map} from 'rxjs/operators';
import {Currency, CurrencyList, QueryCurrencyList, QueryExchangeRate, QueryRates} from '../models/currency.model';
import {queryCurrencyList, queryLatestExchangeRate, queryLatestRatesByBaseCurrency} from './currency.gql';

@Injectable({providedIn: 'root'})
export class CurrencyService {
    constructor(private graphqlService: GraphqlService) {
        this.currencyList$ = new BehaviorSubject<string[]>([]);
    }

    /**
     * Stored currency list
     */
    currencyList$: BehaviorSubject<string[]>;

    /**
     * Return true if currency is in currency list
     * @param {string} currency
     * @returns {boolean}
     */
    isCurrencyExisted(currency: string): boolean {
        currency = currency.toUpperCase();
        return this.currencyList$.value.indexOf(currency) !== -1;
    }

    /**
     * Get currency list by sending graphQL query
     * @returns {Observable<CurrencyList>}
     */
    getCurrencyList(): Observable<CurrencyList> {
        return this.graphqlService.watchQuery<QueryCurrencyList>(queryCurrencyList).pipe(
            map(res => res.data.currencyList),
            catchError(() => {
                // TODO: Handle different type of error
                throw new Error();
            })
        );
    }

    /**
     * Get latest exchange rate by sending graphQL query
     * @param {string} baseCurrency
     * @param {string} targetCurrency
     * @returns {Observable<Currency>}
     */
    getLatestExchangeRate(baseCurrency: string, targetCurrency: string): Observable<Currency> {
        return this.graphqlService
            .watchQuery<QueryExchangeRate>(queryLatestExchangeRate, {base: baseCurrency, target: targetCurrency})
            .pipe(
                map(res => {
                    const exchangeRate = res.data.exchangeRate;
                    return {
                        ...exchangeRate,
                        rates: JSON.parse(exchangeRate.rates),
                    };
                }),
                catchError(() => {
                    // TODO: Handle different type of error
                    throw new Error();
                })
            );
    }

    /**
     * Get latest rates from base currency by sending graphQL query
     * @param {string} baseCurrency
     * @returns {Observable<Currency>}
     */
    getLatestRatesByBaseCurrency(baseCurrency: string): Observable<Currency> {
        return this.graphqlService
            .watchQuery<QueryRates>(queryLatestRatesByBaseCurrency, {base: baseCurrency})
            .pipe(
                map(res => {
                    const rates = res.data.rates;
                    return {
                        ...rates,
                        rates: JSON.parse(rates.rates),
                    };
                }),
                catchError(() => {
                    // TODO: Handle different type of error
                    throw new Error();
                })
            );
    }
}
