import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { HomeComponent } from './home/home.component';
import { CurrencyGridComponent } from './currency-grid/currency-grid.component';
import { CovidGridComponent } from './covid-grid/covid-grid.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, CurrencyGridComponent, CovidGridComponent],
  imports: [
    BrowserModule,
    AgGridModule.withComponents(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent}], { initialNavigation: 'enabled' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
