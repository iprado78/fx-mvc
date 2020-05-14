import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogActions,
  MatDialogContainer,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { ChartModule } from 'angular-highcharts';
import { AppComponent } from './app.component';
import { ApiKeyPreferencesComponent } from './components/api-key-preferences/api-key-preferences.component';
import { CurrencyExchangeComponent } from './components/currency-exchange/currency-exchange.component';
import { CurrencyReservesComponent } from './components/currency-reserves/currency-reserves.component';
import { HeaderComponent } from './components/header/header.component';
import { HistoricalDateRangeComponent } from './components/historical-date-range/historical-date-range.component';
import { HistoricalRatesChartComponent } from './components/historical-rates-chart/historical-rates-chart.component';
import { HistoricalRatesGridComponent } from './components/historical-rates-grid/historical-rates-grid.component';
import { IntradayRatesChartComponent } from './components/intraday-rates-chart/intraday-rates-chart.component';
import { IntradayRatesGridComponent } from './components/intraday-rates-grid/intraday-rates-grid.component';
import { IntradayTimeRangeComponent } from './components/intraday-time-range/intraday-time-range.component';
import { LiveRateComponent } from './components/realtime-card/realtime-card.component';
import { TransactionsGridComponent } from './components/transactions-grid/transactions-grid.component';

@NgModule({
  declarations: [
    ApiKeyPreferencesComponent,
    AppComponent,
    CurrencyExchangeComponent,
    CurrencyReservesComponent,
    HeaderComponent,
    HistoricalDateRangeComponent,
    HistoricalRatesChartComponent,
    HistoricalRatesGridComponent,
    IntradayRatesChartComponent,
    IntradayRatesGridComponent,
    IntradayTimeRangeComponent,
    LiveRateComponent,
    TransactionsGridComponent,
  ],
  imports: [
    AgGridModule.withComponents(),
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ChartModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    MatDialogActions,
    MatDialogContainer,
    MatDialogContent,
    MatFormField,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
