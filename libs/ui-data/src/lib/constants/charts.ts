import {
  XrangePointOptionsObject,
  SeriesLineOptions,
  XAxisOptions,
  Options
} from 'highcharts';

export const seriesDefaults = {
  data: [] as XrangePointOptionsObject[],
  type: 'line',
  turboThreshold: 5000
} as SeriesLineOptions;

export const xAxisDefaults = {
  type: 'category'
} as XAxisOptions;

export const baseLineOptions: Options = {
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

export const INTRADAY_CHART_NAME =
  'Intraday Exchange Rate: 5 Minute Time Series';

export const HISTORICAL_CHART_NAME =
  'Historical Exchange Rate: Daily Time Series';
