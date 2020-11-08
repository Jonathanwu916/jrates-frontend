import {Component, OnInit, ChangeDetectionStrategy, Attribute, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable, of, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith, takeUntil} from 'rxjs/operators';
import {CurrencyService} from 'src/app/services/currency.service';

@Component({
    selector: 'app-currency-selector',
    templateUrl: './currency-selector.component.html',
    styleUrls: ['./currency-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencySelectorComponent implements OnInit {
    constructor(
        private currencyService: CurrencyService,
        @Attribute('defaultSelection') defaultSelection: Optional<string>,
        @Attribute('prefix') prefix: Optional<string>,
        @Attribute('label') label: string
    ) {
        this.defaultSelection = defaultSelection;
        this.prefix = prefix;
        this.label = label;
    }

    @Input() isPrefixVisible?: boolean;

    @Output() selectedCurrency: EventEmitter<string> = new EventEmitter<string>();

    readonly ITEM_SIZE = 48;
    readonly MIN_BUFFER_PX = 48 * 10;
    readonly MAX_BUFFER_PX = 48 * 30;

    formControl!: FormControl;
    defaultSelection: Optional<string>;
    prefix: Optional<string>;
    label: string;

    filteredOptions$!: Observable<string[]>;
    showPrefix$!: Observable<boolean>;
    isFocused$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private destroy$: Subject<boolean> = new Subject<boolean>();

    get options$(): BehaviorSubject<string[]> {
        return this.currencyService.currencyList$;
    }

    ngOnInit(): void {
        this.formControl = new FormControl(this.defaultSelection);

        const debounceFormValueChanges = this.formControl.valueChanges.pipe(debounceTime(300));

        debounceFormValueChanges
            .pipe(
                takeUntil(this.destroy$),
                startWith(this.defaultSelection),
                distinctUntilChanged((prev, curr) => prev === curr)
            )
            .subscribe(this.selectedCurrency);

        this.filteredOptions$ = debounceFormValueChanges.pipe(
            startWith(''),
            distinctUntilChanged((prev, curr) => prev === curr),
            map(value =>
                this.options$.value.filter(rate => rate.toLowerCase().includes((value as string).toLowerCase()))
            )
        );

        this.showPrefix$ = this.isPrefixVisible
            ? combineLatest([debounceFormValueChanges.pipe(startWith(this.defaultSelection)), this.isFocused$]).pipe(
                  map(([value, isFocused]) => Boolean(value) || isFocused)
              )
            : of(false);
    }

    onFocus($event: any) {
        this.filteredOptions$.pipe(startWith(''));
        this.isFocused$.next(true);
    }

    onBlur($event: any) {
        this.isFocused$.next(false);
    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }
}
