import { CurrencySymbol, CacheKeyParams } from './types';
import { currencySymbolLocaleMap } from './constants';
import { Moment } from 'moment';
import moment from 'moment';

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
  Math.round((10_0000 * (end - start)) / start);

export const formatUtcMoment = (utcMoment: Moment, ms = false): string => {
  return utcMoment.local().format(`hh:mm${ms ? ':ss' : ''} A`);
};

export const utcStringToLocal = (timeString: string): string => {
  return formatUtcMoment(moment.utc(timeString));
};
