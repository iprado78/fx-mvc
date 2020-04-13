import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type CurrencyOption = 'USD' | 'EUR' | 'GBP' | 'RMB' | 'JPY';
export type CurrencyLocale = 'en-US' | 'en-GB' | 'ja-JP' | 'de-De';

@Injectable({
  providedIn: 'root'
})
export class CurrencySelectionsService {
  currencyToLocale: Map<CurrencyOption, CurrencyLocale> = new Map([
    ['USD', 'en-US'],
    ['EUR', 'de-De'],
    ['GBP', 'en-GB'],
    ['JPY', 'ja-JP']
  ]);
  currencyOptions = new Set<CurrencyOption>(this.currencyToLocale.keys());
  private b = new BehaviorSubject<CurrencyOption>('USD');
  private q = new BehaviorSubject<CurrencyOption>('EUR');
  base = this.b.asObservable();
  quote = this.q.asObservable();

  setBase = (currency: CurrencyOption) => {
    this.b.next(currency);
  };

  setQuote = (currency: CurrencyOption) => {
    this.q.next(currency);
  };

  constructor() {}
}
