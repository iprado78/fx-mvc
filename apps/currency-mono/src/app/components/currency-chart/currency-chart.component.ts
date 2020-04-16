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
import { CurrencyEntries } from '../../shared/types';

const seriesDefaults = {
  name: 'Exchange Rate at Close',
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
  private entriesCache: CurrencyEntries;

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

  ngOnInit(): void {
    combineLatest([
      this.historicalRatesService.currencyEntries,
      this.currencySelections.base,
      this.currencySelections.quote
    ]).subscribe(([entries, base, quote]) => {
      /**
       * Avoids updates while entries resolving.
       *
       * TODO: find idiomatic/cleaner RxJS way of doing this that does not require entriesCache variable.
       */
      if (entries === this.entriesCache) {
        return;
      } else {
        this.entriesCache = entries;
      }

      const data = entries
        .map(
          ([date, { close }]) =>
            ({ name: date, y: close } as XrangePointOptionsObject)
        )
        .reverse();

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
      this.chart = new Chart(this.options);
    });
  }
}
