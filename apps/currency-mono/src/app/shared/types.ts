export type CurrencySymbol = 'USD' | 'EUR' | 'GBP' | 'RMB' | 'JPY';

export type CurrencyLocale = 'en-US' | 'en-GB' | 'ja-JP' | 'de-De';

export interface CurrencyReserve<T> {
  id: CurrencySymbol;
  reserves: T;
}

export interface CurrencyEntryValue {
  open: number;
  high: number;
  low: number;
  close: number;
}
export type CurrencyEntry = [string, CurrencyEntryValue];

export type CurrencyEntries = CurrencyEntry[];

export interface LiveRate<T, Q> {
  rate: T;
  refreshTime: Q;
}
