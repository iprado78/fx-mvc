import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {
  XrangePointOptionsObject,
  SeriesLineOptions,
  XAxisOptions,
  Options
} from 'highcharts';
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencyEntries } from '../../shared/types';
import { IntradayRates } from '../../services/intraday-rates/intraday-rates.service';
import { utcStringToLocal } from '../../shared/functions';

const currencyEntriesToXpointData = (entries: CurrencyEntries) =>
  entries
    .map(
      ([date, { close }]) =>
        ({ name: utcStringToLocal(date), y: close } as XrangePointOptionsObject)
    )
    .reverse();

const seriesDefaults = {
  name: 'Intraday Exchange Rate: 5 Minute Time Series',
  data: [] as XrangePointOptionsObject[],
  type: 'line'
} as SeriesLineOptions;

const xAxisDefaults = {
  type: 'category'
} as XAxisOptions;

@Component({
  selector: 'currency-intraday-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.css']
})
export class IntradayCurrencyChartComponent implements OnInit {
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
    private intradayRates: IntradayRates,
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
        labels: { step: Math.ceil(data.length / 6) }
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
      this.intradayRates.currencyEntries.pipe(map(currencyEntriesToXpointData)),
      this.currencySelections.base,
      this.currencySelections.quote
    ]).subscribe(([data, base, quote]) => {
      this.setNewOptions(base, quote, data);
      this.setNewChart();
    });
  }
}
