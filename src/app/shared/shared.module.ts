import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CurrencySelectorComponent} from './currency-selector/currency-selector.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './input/input.component';

@NgModule({
    declarations: [CurrencySelectorComponent, InputComponent],
    imports: [CommonModule, MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule],
    exports: [
        MaterialModule,
        FlexLayoutModule,
        CurrencySelectorComponent,
        InputComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class SharedModule {}
