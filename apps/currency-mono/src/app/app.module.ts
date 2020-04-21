import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { ChartModule } from 'angular-highcharts';
import { CurrencyGridComponent } from './components/currency-grid/currency-grid.component';
import { CurrencyChartComponent } from './components/currency-chart/currency-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyExchangeComponent } from './components/currency-exchange/currency-exchange.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyReservesComponent } from './components/currency-reserves/currency-reserves.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { LiveRateComponent } from './components/live-rate/live-rate.component';
import { LayoutComponent } from './components/layout/layout.component';
import { IntradayCurrencyChartComponent } from './components/intraday-rates-chart/currency-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyGridComponent,
    CurrencyChartComponent,
    IntradayCurrencyChartComponent,
    HeaderComponent,
    CurrencyExchangeComponent,
    CurrencyReservesComponent,
    LiveRateComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule,
    AgGridModule.withComponents(),
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
