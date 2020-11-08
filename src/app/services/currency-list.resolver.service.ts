import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {map, take, tap} from 'rxjs/operators';
import {CurrencyService} from './currency.service';

@Injectable({providedIn: 'root'})
export class CurrencyListResolverService implements Resolve<any> {
    constructor(private currencyService: CurrencyService) {}

    resolve(): any {
        if (this.currencyService.currencyList$.value.length !== 0) {
            return;
        }
        return this.currencyService.getCurrencyList().pipe(
            // complete observable once first value emitted
            take(1),
            map(res => res.currencyList),
            tap(currencyList => {
                this.currencyService.currencyList$.next(currencyList);
            })
        );
    }
}
