import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {CurrencyService} from '../services/currency.service';

@Component({
    selector: 'app-converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConverterComponent implements OnInit {
    constructor(private currencyService: CurrencyService) {}

    fromCurrency$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    toCurrency$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    inputAmount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    result$!: Observable<Optional<string>>;

    ngOnInit(): void {
        this.result$ = combineLatest([this.fromCurrency$, this.toCurrency$, this.inputAmount$]).pipe(
            distinctUntilChanged((prev, curr) => prev[0] === curr[0] && prev[1] === curr[1] && prev[2] === curr[2]),
            switchMap(([from, to]) => {
                // Return null if one of the inputs length is invalid
                if (from.length !== 3 || to.length !== 3) {
                    return of(null);
                }

                // Return null if one of the inputs is not existed
                if (!this.currencyService.isCurrencyExisted(from) || !this.currencyService.isCurrencyExisted(to)) {
                    return of(null);
                }

                // Call api to get exchange rate
                return this.currencyService.getLatestExchangeRate(from, to).pipe(
                    map(currency => currency.rates[to.toLocaleUpperCase()]),
                    catchError(() => of(null))
                );
            }),
            map(rate => {
                if (rate != null) {
                    return (rate * this.inputAmount$.value).toFixed(5) + ' ' + this.toCurrency$.value;
                }
                return null;
            })
        );
    }

    updateFromCurrency(from: string) {
        this.fromCurrency$.next(from);
    }

    updateToCurrency(to: string) {
        this.toCurrency$.next(to);
    }

    updateInputAmount(amount: Optional<number>) {
        this.inputAmount$.next(amount == null ? 0 : amount);
    }
}
