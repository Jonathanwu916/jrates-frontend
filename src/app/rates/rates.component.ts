import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
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

    updateRatesByBaseCurrency(base: string) {
        if (base.length === 3 && this.currencyService.isCurrencyExisted(base)) {
            this.rates$ = this.currencyService.getLatestRatesByBaseCurrency(base).pipe(
                map(currency => currency.rates),
                catchError(() => of(null))
            );
        } else {
            this.rates$ = of(null);
        }
    }
}
