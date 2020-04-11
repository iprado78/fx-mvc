import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts'
import { HistoricalRates } from '../../services/historical-rates/historicalRates.service';
import { XrangePointOptionsObject, SeriesLineOptions, XAxisOptions, Options } from 'highcharts';
import { CurrencyOption, CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { combineLatest } from 'rxjs';

const seriesDefaults = {
  name: 'Daily Fx Close',
  data: [] as XrangePointOptionsObject[],
  type: 'line'
} as SeriesLineOptions

const xAxisDefaults = {
  type: 'category',
} as XAxisOptions

@Component({
  selector: 'currency-mono-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.css']
})
export class CurrencyChartComponent implements OnInit {


  options: Options =  {
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
  }
  chart = new Chart(this.options)

  constructor(private historicalRatesService: HistoricalRates, private currencySelections: CurrencySelectionsService) { } 

  ngOnInit(): void {
    combineLatest([this.historicalRatesService.currencyEntries, this.currencySelections.source, this.currencySelections.target])
      .subscribe(([entries, source, target]) => {
        const data = entries.map(([date, { close }]) => ({ name: date, y: close } as XrangePointOptionsObject)).reverse()
        this.chart = new Chart({
          ...this.options,
          title: {
            text: `${source} to ${target}`
          },
          yAxis: {
            title: {
              text: target
            }
          },
          xAxis: {
            ...xAxisDefaults,
            labels: { step: Math.ceil(data.length / 20) }
          } as XAxisOptions,
          series: [{
            ...seriesDefaults,
            data
          }]
        })
      })
    }
}
