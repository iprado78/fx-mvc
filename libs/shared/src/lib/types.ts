import { Moment } from 'moment';

export type DateType = 'startDate' | 'endDate';

export interface Dates {
  startDate: Date;
  endDate: Date;
}

export interface Times {
  startTime: Moment;
  endTime: Moment;
}

export type TimeType = 'startTime' | 'endTime';

export type CurrencySymbol = 'USD' | 'EUR' | 'GBP' | 'RMB' | 'JPY';

export type CurrencyLocale = 'en-US' | 'en-GB' | 'ja-JP' | 'de-De';

export interface CurrencyReserve<T> {
  code: CurrencySymbol;
  reserves: T;
}

export interface Transaction<T> {
  timestamp: string;
  payCurrency: CurrencySymbol;
  receiveCurrency: CurrencySymbol;
  payCurrencyBalance: T;
  receiveCurrencyBalance: T;
  payAmount: T;
  receiveAmount: T;
}

export interface FxEntryValue {
  open: number;
  high: number;
  low: number;
  close: number;
}
export type FxEntry = [string, FxEntryValue];

export type FxEntries = FxEntry[];

export interface LiveRate<T, Q> {
  rate: T;
  refreshTime: Q;
}

export interface Exchange {
  amount: number;
  currency: CurrencySymbol;
}

export type ViewState = 'historical' | 'intraday';

export interface CacheKeyParams {
  base: CurrencySymbol;
  quote: CurrencySymbol;
}

export interface HistoricalRatesCacheKeyParams extends CacheKeyParams {
  dates: Dates;
}

export type apiFunctions =
  | 'FX_DAILY'
  | 'CURRENCY_EXCHANGE_RATE'
  | 'FX_INTRADAY';

export interface LiveRateResponseData {
  '1. From_Currency Code': string;
  '2. From_Currency Name': string;
  '3. To_Currency Code': string;
  '4. To_Currency Name': string;
  '5. Exchange Rate': string;
  '6. Last Refreshed': string;
  '7. Time Zone': string;
  '8. Bid Price': string;
  '9. Ask Price': string;
}

export interface LiveRateResponse {
  'Realtime Currency Exchange Rate': LiveRateResponseData;
}

export interface RateData {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
}

export interface HistoricalRateMetaData {
  '1. Information': string;
  '2. From Symbol': string;
  '3. To Symbol': string;
  '4. Output Size': string;
  '5. Last Refreshed': string;
  '6. Time Zone': string;
}

export interface HistoricalRatesResponse {
  'Meta Data': HistoricalRateMetaData;
  'Time Series FX (Daily)': Record<string, RateData>;
}

export interface IntradayRateMetaData {
  '1. Information': string;
  '2. From Symbol': string;
  '3. To Symbol': string;
  '4. Last Refreshed': string;
  '5. Interval': string;
  '6. Output Size': string;
  '7. Time Zone': string;
}

export interface IntradayRatesResponse {
  'Meta Data': IntradayRateMetaData;
  'Time Series FX (5min)': Record<string, RateData>;
}
