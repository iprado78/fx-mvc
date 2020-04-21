import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HistoricalRates } from '../../services/historical-rates/historicalRates.service';
import {
  XrangePointOptionsObject,
  SeriesLineOptions,
  XAxisOptions,
  Options
} from 'highcharts';
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { combineLatest } from 'rxjs';
import { sample, map } from 'rxjs/operators';
import { CurrencyEntries } from '../../shared/types';

const currencyEntriesToXpointData = (entries: CurrencyEntries) =>
  entries
    .map(
      ([date, { close }]) =>
        ({ name: date, y: close } as XrangePointOptionsObject)
    )
    .reverse();

const seriesDefaults = {
  name: 'Exchange Rate',
  data: [] as XrangePointOptionsObject[],
  type: 'line'
} as SeriesLineOptions;

const xAxisDefaults = {
  type: 'category'
} as XAxisOptions;

@Component({
  selector: 'currency-mono-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.css']
})
export class CurrencyChartComponent implements OnInit {
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
      title: {
        text: `${base}/${quote}`
      },
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
      this.historicalRatesService.currencyEntries.pipe(
        map(currencyEntriesToXpointData)
      ),
      this.currencySelections.base,
      this.currencySelections.quote
    ])
      .pipe(sample(this.historicalRatesService.currencyEntries))
      .subscribe(([data, base, quote]) => {
        this.setNewOptions(base, quote, data);
        this.setNewChart();
      });
  }
}
