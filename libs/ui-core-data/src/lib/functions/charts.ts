import { XrangePointOptionsObject, XAxisOptions } from 'highcharts';
import { FxEntries, CurrencySymbol } from '../types';
import {
  baseLineOptions,
  xAxisDefaults,
  seriesDefaults,
  HISTORICAL_CHART_NAME,
  INTRADAY_CHART_NAME
} from '../constants';

export const fxEntriesToXpointData = (
  entries: FxEntries,
  datetimeFormatter?: (timestamp: string) => string
) =>
  entries
    .map(
      ([date, { close }]) =>
        ({
          name: datetimeFormatter ? datetimeFormatter(date) : date,
          y: close
        } as XrangePointOptionsObject)
    )
    .reverse();

interface lineChartOptionsConfig {
  data: XrangePointOptionsObject[];
  title: string;
  name: string;
  stepFactor: number;
}
export const lineChartOptions = ({
  data,
  title,
  name,
  stepFactor
}: lineChartOptionsConfig) => ({
  ...baseLineOptions,
  yAxis: {
    title: {
      text: `${title}`
    }
  },
  xAxis: {
    ...xAxisDefaults,
    labels: { step: Math.ceil(data.length / stepFactor) }
  } as XAxisOptions,
  series: [
    {
      ...seriesDefaults,
      name,
      data
    }
  ]
});

export const historicalChartOptions = (
  data: XrangePointOptionsObject[],
  base: CurrencySymbol,
  quote: CurrencySymbol
) => ({
  data,
  title: `${base} / ${quote}`,
  stepFactor: 10,
  name: HISTORICAL_CHART_NAME
});

export const intradayChartOptions = (
  data: XrangePointOptionsObject[],
  base: CurrencySymbol,
  quote: CurrencySymbol
) => ({
  name: INTRADAY_CHART_NAME,
  title: `${base}/${quote}`,
  data,
  stepFactor: 6
});
