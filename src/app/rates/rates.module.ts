import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatesRoutingModule} from './rates-routing.module';
import {RatesComponent} from './rates.component';
import {SharedModule} from '../shared/shared.module';
import {RatesListComponent} from './rates-list/rates-list.component';

@NgModule({
    declarations: [RatesComponent, RatesListComponent],
    imports: [CommonModule, RatesRoutingModule, SharedModule],
})
export class RatesModule {}
