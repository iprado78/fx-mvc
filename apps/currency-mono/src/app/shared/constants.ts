import {
  CurrencyReserve,
  CurrencySymbol,
  CurrencyLocale,
  LiveRate
} from './types';

export const defaultBase: CurrencySymbol = 'USD';

export const defaultQuote: CurrencySymbol = 'EUR';

export const defaultBaseReserves: CurrencyReserve<number> = {
  id: defaultBase,
  reserves: 0
};

export const defaultQuoteReserves: CurrencyReserve<number> = {
  id: defaultQuote,
  reserves: 0
};

export const defaultLiveRate: LiveRate<number, Date> = {
  rate: 0,
  refreshTime: new Date()
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
