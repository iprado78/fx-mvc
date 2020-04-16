export type CurrencySymbol = 'USD' | 'EUR' | 'GBP' | 'RMB' | 'JPY';

export type CurrencyLocale = 'en-US' | 'en-GB' | 'ja-JP' | 'de-De';

export interface CurrencyReserve<T> {
  id: CurrencySymbol;
  reserves: T;
}

export type CurrencyEntry = [string, Record<string, number>];

export type CurrencyEntries = CurrencyEntry[];

export interface LiveRate<T, Q> {
  rate: T;
  refreshTime: Q;
}
