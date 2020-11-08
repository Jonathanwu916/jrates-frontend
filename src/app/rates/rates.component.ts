import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {CurrencyService} from '../services/currency.service';

@Component({
    selector: 'app-rates',
    templateUrl: './rates.component.html',
    styleUrls: ['./rates.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatesComponent {
    constructor(private currencyService: CurrencyService) {}

    rates$!: Observable<Optional<Record<string, number>>>;
    isLoading = false;

    updateRatesByBaseCurrency(base: string) {
        if (base.length === 3 && this.currencyService.isCurrencyExisted(base)) {
            this.isLoading = true;
            this.rates$ = this.currencyService.getLatestRatesByBaseCurrency(base).pipe(
                map(currency => currency.rates),
                catchError(() => of(null)),
                tap(() => (this.isLoading = false))
            );
        } else {
            this.rates$ = of(null);
        }
    }
}
