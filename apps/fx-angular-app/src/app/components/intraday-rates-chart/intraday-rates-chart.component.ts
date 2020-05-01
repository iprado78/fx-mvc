import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  fxEntriesToXpointData,
  baseLineOptions,
  lineChartOptions,
  INTRADAY_CHART_NAME
} from '@fx/ui-core-data';
import { IntradayRates } from '../../services/intraday-rates/intraday-rates.service';
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';

@Component({
  selector: 'fx-intraday-chart',
  templateUrl: './intraday-rates-chart.component.html'
})
export class IntradayRatesChartComponent implements OnInit {
  options = baseLineOptions;

  chart = new Chart(this.options);

  constructor(
    private intradayRates: IntradayRates,
    private currencySelections: CurrencySelectionsService
  ) {}

  private setNewOptions(base, quote, data) {
    this.options = lineChartOptions({
      name: INTRADAY_CHART_NAME,
      title: `${base}/${quote}`,
      data,
      stepFactor: 6
    });
  }

  private setNewChart() {
    this.chart = new Chart(this.options);
  }

  ngOnInit(): void {
    combineLatest([
      this.intradayRates.fxEntries.pipe(
        map(values => fxEntriesToXpointData(values))
      ),
      this.currencySelections.base,
      this.currencySelections.quote
    ]).subscribe(([data, base, quote]) => {
      this.setNewOptions(base, quote, data);
      this.setNewChart();
    });
  }
}
