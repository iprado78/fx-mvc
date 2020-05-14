import { Chart } from 'angular-highcharts';
import { XrangePointOptionsObject } from 'highcharts';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import {
  baseLineOptions,
  CurrencySymbol,
  fxEntriesToXpointData,
  historicalChartOptions,
  lineChartOptions
} from '@fx/ui-core-data';

import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { HistoricalRates } from '../../services/historical-rates/historical-rates.service';

@Component({
  selector: 'fx-historical-chart',
  templateUrl: './historical-rates-chart.component.html'
})
export class HistoricalRatesChartComponent implements OnInit {
  options = baseLineOptions;

  chart = new Chart(this.options);

  constructor(
    private historicalRatesService: HistoricalRates,
    private currencySelections: CurrencySelectionsService
  ) {}

  private setNewOptions(
    base: CurrencySymbol,
    quote: CurrencySymbol,
    data: XrangePointOptionsObject[]
  ) {
    this.options = lineChartOptions(historicalChartOptions(data, base, quote));
  }

  private setNewChart() {
    this.chart = new Chart(this.options);
  }

  ngOnInit(): void {
    combineLatest([
      this.historicalRatesService.fxEntries.pipe(
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
