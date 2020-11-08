import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './layouts/root/app.component';
import {LayoutsModule} from './layouts/layouts.module';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    imports: [LayoutsModule, BrowserModule, AppRoutingModule, GraphQLModule, HttpClientModule, BrowserAnimationsModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
