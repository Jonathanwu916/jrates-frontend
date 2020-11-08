import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopBarComponent} from './top-bar/top-bar.component';
import {AppComponent} from './root/app.component';
import {SharedModule} from '../shared/shared.module';
import {LayoutsRoutingModule} from './layouts-routing.module';

@NgModule({
    declarations: [TopBarComponent, AppComponent],
    imports: [CommonModule, SharedModule, LayoutsRoutingModule],
    exports: [TopBarComponent, AppComponent],
})
export class LayoutsModule {}
