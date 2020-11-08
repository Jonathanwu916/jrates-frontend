import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-rates-list',
    templateUrl: './rates-list.component.html',
    styleUrls: ['./rates-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatesListComponent {
    @Input() rates$!: Observable<Optional<Record<string, number>>>;
    @Input() isLoading!: boolean;

    readonly ITEM_SIZE = 65;
    readonly MIN_BUFFER_PX = 65 * 10;
    readonly MAX_BUFFER_PX = 65 * 20;
}
