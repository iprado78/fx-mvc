import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type CurrencyOption = 'USD' | 'EUR' | 'GBP' | 'RMB' | 'JPY';
export type CurrencyLocale = 'en-US' | 'en-GB' | 'ja-JP' | 'de-De'



@Injectable({
  providedIn: 'root'
})
export class CurrencySelectionsService {
  currencyToLocale: Map<CurrencyOption, CurrencyLocale> = new Map([
    ['USD', 'en-US'],
    ['EUR', 'de-De'],
    ['GBP', 'en-GB'],
    ['JPY', 'ja-JP']
  ])
  currencyOptions = new Set<CurrencyOption>(this.currencyToLocale.keys());
  private s = new BehaviorSubject<CurrencyOption>('USD');
  private t = new BehaviorSubject<CurrencyOption>('EUR');
  source = this.s.asObservable();
  target = this.t.asObservable();

  setSource = (currency: CurrencyOption) => {
    this.s.next(currency);
  }

  setTarget = (currency: CurrencyOption) => {
    this.t.next(currency);
  }

  constructor() { };
}