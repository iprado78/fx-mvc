import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  defaultBase,
  defaultQuote,
  currencySymbolLocaleMap,
  CurrencySymbol
} from '@fx/ui-core-data';

@Injectable({
  providedIn: 'root'
})
export class CurrencySelectionsService {
  currencyOptions = new Set<CurrencySymbol>(currencySymbolLocaleMap.keys());
  private b = new BehaviorSubject<CurrencySymbol>(defaultBase);
  private q = new BehaviorSubject<CurrencySymbol>(defaultQuote);
  base = this.b.asObservable();
  quote = this.q.asObservable();

  setBase = (currency: CurrencySymbol) => {
    this.b.next(currency);
  };

  setQuote = (currency: CurrencySymbol) => {
    this.q.next(currency);
  };

  constructor() {}
}
