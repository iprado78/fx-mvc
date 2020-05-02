export * from './charts';
export * from './grids';

import { Moment } from 'moment';
import moment from 'moment';
import {
  FxEntryValue,
  IntradayRatesResponse,
  RateData,
  CurrencySymbol,
  CacheKeyParams,
  LiveRateResponseData,
  LiveRate,
  FxEntries,
  Dates,
  FxEntry,
  HistoricalRatesCacheKeyParams,
  HistoricalRatesResponse,
  Times
} from '../types';
import { currencyFormatterFactory } from './grids';

export const toCacheKey = ({ base, quote }: CacheKeyParams) =>
  `${base}:${quote}`;

export const formatUtcMoment = (utcMoment: Moment, ms = false): string => {
  return utcMoment.local().format(`hh:mm${ms ? ':ss' : ''} A`);
};

export const utcStringToLocal = (timeString: string): string => {
  return formatUtcMoment(moment.utc(timeString));
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

export const filterFromTimes = (times: Times) => ([
  datetimeString
]: FxEntry) => {
  const asMoment = moment.utc(datetimeString).local();
  return (
    asMoment.isSameOrAfter(times.startTime) &&
    asMoment.isSameOrBefore(times.endTime)
  );
};
