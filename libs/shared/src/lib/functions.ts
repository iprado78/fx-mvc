import {
  CurrencySymbol,
  CacheKeyParams,
  Transaction,
  LiveRateResponseData,
  LiveRate
} from './types';
import { currencySymbolLocaleMap } from './constants';
import { Moment } from 'moment';
import moment from 'moment';

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
