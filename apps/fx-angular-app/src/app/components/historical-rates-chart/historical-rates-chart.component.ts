import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HistoricalRates } from '../../services/historical-rates/historical-rates.service';
import {
  XrangePointOptionsObject,
  SeriesLineOptions,
  XAxisOptions,
  Options
} from 'highcharts';
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FxEntries } from '../../shared/types';

const fxEntriesToXpointData = (entries: FxEntries) =>
  entries
    .map(
      ([date, { close }]) =>
        ({ name: date, y: close } as XrangePointOptionsObject)
    )
    .reverse();

const seriesDefaults = {
  name: 'Historical Exchange Rate: Daily Time Series',
  data: [] as XrangePointOptionsObject[],
  type: 'line'
} as SeriesLineOptions;

const xAxisDefaults = {
  type: 'category'
} as XAxisOptions;

@Component({
  selector: 'fx-mono-chart',
  templateUrl: './historical-rates-chart.component.html'
})
export class HistoricalRatesChartComponent implements OnInit {
  options: Options = {
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    yAxis: {
      title: { text: '' }
    },
    xAxis: xAxisDefaults,
    series: [seriesDefaults]
  };

  chart = new Chart(this.options);

  constructor(
    private historicalRatesService: HistoricalRates,
    private currencySelections: CurrencySelectionsService
  ) {}

  private setNewOptions(base, quote, data) {
    this.options = {
      ...this.options,
      yAxis: {
        title: {
          text: `${base}/${quote}`
        }
      },
      xAxis: {
        ...xAxisDefaults,
        labels: { step: Math.ceil(data.length / 20) }
      } as XAxisOptions,
      series: [
        {
          ...seriesDefaults,
          data
        }
      ]
    };
  }

  private setNewChart() {
    this.chart = new Chart(this.options);
  }

  ngOnInit(): void {
    combineLatest([
      this.historicalRatesService.fxEntries.pipe(map(fxEntriesToXpointData)),
      this.currencySelections.base,
      this.currencySelections.quote
    ]).subscribe(([data, base, quote]) => {
      this.setNewOptions(base, quote, data);
      this.setNewChart();
    });
  }
}
