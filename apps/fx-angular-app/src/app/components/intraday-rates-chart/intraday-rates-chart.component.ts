import { Chart } from 'angular-highcharts';
import { XrangePointOptionsObject } from 'highcharts';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import {
  baseLineOptions,
  CurrencySymbol,
  fxEntriesToXpointData,
  intradayChartOptions,
  lineChartOptions
} from '@fx/ui-core-data';

import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { IntradayRates } from '../../services/intraday-rates/intraday-rates.service';

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

  private setNewOptions(
    base: CurrencySymbol,
    quote: CurrencySymbol,
    data: XrangePointOptionsObject[]
  ) {
    this.options = lineChartOptions(intradayChartOptions(data, base, quote));
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
