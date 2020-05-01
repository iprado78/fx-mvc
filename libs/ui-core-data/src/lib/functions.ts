import {
  currencySymbolLocaleMap,
  baseLineOptions,
  xAxisDefaults,
  seriesDefaults
} from './constants';
import { Moment } from 'moment';
import moment from 'moment';
import { FxEntryValue, IntradayRatesResponse, RateData } from './types';
import {
  CurrencySymbol,
  CacheKeyParams,
  Transaction,
  LiveRateResponseData,
  LiveRate,
  FxEntries,
  Dates,
  FxEntry,
  HistoricalRatesCacheKeyParams,
  HistoricalRatesResponse
} from './types';
import { XrangePointOptionsObject, XAxisOptions } from 'highcharts';

const TEN_THOUSAND = 10000;

export const currencyFormatterFactory = (
  symbol: CurrencySymbol,
  sigDif: number = 4
) => {
  const { format } = new Intl.NumberFormat(
    currencySymbolLocaleMap.get(symbol),
    {
      style: 'currency',
      currency: symbol,
      maximumFractionDigits: sigDif,
      minimumFractionDigits: sigDif
    }
  );

  return format;
};

export const toCacheKey = ({ base, quote }: CacheKeyParams) =>
  `${base}:${quote}`;

export const toPipDiff = (end: number, start: number) =>
  Math.round(TEN_THOUSAND * (end - start));

export const formatUtcMoment = (utcMoment: Moment, ms = false): string => {
  return utcMoment.local().format(`hh:mm${ms ? ':ss' : ''} A`);
};

export const utcStringToLocal = (timeString: string): string => {
  return formatUtcMoment(moment.utc(timeString));
};

export const transactionsToGridProjection = ({
  payAmount,
  payCurrency,
  receiveAmount,
  receiveCurrency,
  payCurrencyBalance,
  receiveCurrencyBalance,
  timestamp
}: Transaction<number>): Transaction<string> => {
  const payFormatter = currencyFormatterFactory(payCurrency, 2);
  const receiveFormatter = currencyFormatterFactory(receiveCurrency, 2);
  return {
    timestamp,
    payCurrency,
    receiveCurrency,
    payAmount: payFormatter(payAmount),
    receiveAmount: receiveFormatter(receiveAmount),
    payCurrencyBalance: payFormatter(payCurrencyBalance),
    receiveCurrencyBalance: receiveFormatter(receiveCurrencyBalance)
  };
};

export const rateFromServerResponse = (
  res: LiveRateResponseData
): LiveRate<number, Moment> => ({
  rate: Number(res['5. Exchange Rate']),
  refreshTime: moment.utc(res['6. Last Refreshed'])
});

export const formatLiveRateForView = (
  serviceRate: LiveRate<number, Moment>,
  base: CurrencySymbol,
  quote: CurrencySymbol
): LiveRate<string, string> => ({
  rate: `${base}/${quote} = ${currencyFormatterFactory(quote)(
    serviceRate.rate
  )}`,
  refreshTime: formatUtcMoment(serviceRate.refreshTime, true)
});

export const filterFromDates = (dates: Dates) => ([dateString]: FxEntry) => {
  const asDate = new Date(dateString);
  return asDate >= dates.startDate && asDate <= dates.endDate;
};

export const toFilterCacheKey = ({
  dates,
  ...rest
}: HistoricalRatesCacheKeyParams) =>
  `${dates.startDate.toString()}:${dates.endDate.toString()}:${toCacheKey(
    rest
  )}`;

type serverRates = [string, RateData];
const serverRatesProjection = ([date, rateData]: serverRates) => [
  date,
  Object.keys(rateData).reduce(
    (accum, key) => ({ ...accum, [key.split('. ')[1]]: Number(rateData[key]) }),
    {} as FxEntryValue
  )
];

export const enttriesFromHistoricalServerResponse = (
  res: HistoricalRatesResponse
) =>
  Object.entries(res['Time Series FX (Daily)']).map(
    serverRatesProjection
  ) as FxEntries;

export const enttriesFromIntradayServerResponse = (
  res: IntradayRatesResponse
) =>
  Object.entries(res['Time Series FX (5min)']).map(
    serverRatesProjection
  ) as FxEntries;

export const rowDataFromFxEntries = (
  entries: FxEntries,
  currencyFormatter: (currencyAmount: number) => string,
  datetimeFormatter?: (datetime: string) => string
) => {
  return entries.map(([datetime, { open, high, low, close }]) => ({
    datetime: datetimeFormatter ? datetimeFormatter(datetime) : datetime,
    open: currencyFormatter(open),
    close: currencyFormatter(close),
    diff: toPipDiff(close, open),
    high: currencyFormatter(high),
    low: currencyFormatter(low),
    range: toPipDiff(high, low)
  }));
};

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
