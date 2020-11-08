import {Component, OnInit, ChangeDetectionStrategy, Attribute, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
    constructor(@Attribute('label') label: string, @Attribute('defaultInput') defaultInput: Optional<string | number>) {
        this.label = label;
        this.defaultInput = defaultInput;
    }

    @Output() inputOutcome: EventEmitter<string | number> = new EventEmitter<string | number>();

    label: string;
    defaultInput: Optional<string | number>;
    inputValue!: number | string;

    ngOnInit(): void {
        this.inputValue = this.defaultInput ? this.defaultInput : '';
        this.updateInputValue(this.inputValue);
    }

    updateInputValue(value: string | number) {
        this.inputOutcome.emit(value);
    }
}
