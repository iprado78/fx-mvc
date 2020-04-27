import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { ChartModule } from 'angular-highcharts';
import { HistoricalRatesGridComponent } from './components/historical-rates-grid/historical-rates-grid.component';
import { HistoricalRatesChartComponent } from './components/historical-rates-chart/historical-rates-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
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
import { LiveRateComponent } from './components/realtime-card/realtime-card.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IntradayRatesChartComponent } from './components/intraday-rates-chart/intraday-rates-chart.component';
import { IntradayRatesGridComponent } from './components/intraday-rates-grid/intraday-rates-grid.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HistoricalDateRangeComponent } from './components/historical-date-range/historical-date-range.component';
import { IntradayTimeRangeComponent } from './components/intraday-time-range/intraday-time-range.component';
import { TransactionsGridComponent } from './components/transactions-grid/transactions-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    HistoricalRatesGridComponent,
    HistoricalRatesChartComponent,
    IntradayRatesChartComponent,
    HeaderComponent,
    CurrencyExchangeComponent,
    CurrencyReservesComponent,
    LiveRateComponent,
    IntradayRatesGridComponent,
    HistoricalDateRangeComponent,
    IntradayTimeRangeComponent,
    TransactionsGridComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatInputModule,
    MatTabsModule,
    AgGridModule.withComponents(),
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
