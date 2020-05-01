import {
  CurrencyReserve,
  CurrencySymbol,
  CurrencyLocale,
  LiveRate
} from '../types';
import { Moment } from 'moment';
import moment from 'moment';

export * from './grids';
export * from './charts';

export const defaultBase: CurrencySymbol = 'USD';

export const defaultQuote: CurrencySymbol = 'EUR';

export const defaultBaseReserves: CurrencyReserve<number> = {
  code: defaultBase,
  reserves: 0
};

export const defaultQuoteReserves: CurrencyReserve<number> = {
  code: defaultQuote,
  reserves: 0
};

export const defaultLiveRate: LiveRate<number, Moment> = {
  rate: 0,
  refreshTime: moment()
};

export const currencySymbolLocaleMap: Map<
  CurrencySymbol,
  CurrencyLocale
> = new Map([
  ['USD', 'en-US'],
  ['EUR', 'de-De'],
  ['GBP', 'en-GB'],
  ['JPY', 'ja-JP']
]);
