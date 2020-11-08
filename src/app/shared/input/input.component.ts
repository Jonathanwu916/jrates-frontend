import {Component, OnInit, ChangeDetectionStrategy, Attribute, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
    constructor(@Attribute('label') label: string) {
        this.label = label;
    }

    private readonly INITIAL_INPUT_VALUE = 1;

    @Output() inputOutcome: EventEmitter<string | number> = new EventEmitter<string | number>();

    label: string;
    inputValue!: number;

    ngOnInit(): void {
        this.inputValue = this.INITIAL_INPUT_VALUE;
        this.updateInputValue(this.inputValue);
    }

    updateInputValue(value: string | number) {
        this.inputOutcome.emit(value);
    }
}
