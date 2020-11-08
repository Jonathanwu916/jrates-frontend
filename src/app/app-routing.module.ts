import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {RatesComponent} from './rates/rates.component';
import {CurrencyListResolverService} from './services/currency-list.resolver.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'rates',
        pathMatch: 'full',
    },
    {
        path: 'rates',
        component: RatesComponent,
        loadChildren: () => import('./rates/rates.module').then(m => m.RatesModule),
        resolve: {
            currencyList$: CurrencyListResolverService,
        },
    },
    {path: '**', redirectTo: 'rates', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule],
})
export class AppRoutingModule {}
