import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencySelectionsService } from '../currency-selections/currency-selections.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CurrencyReserve, CurrencySymbol } from '../../shared/types';
import {
  defaultBaseReserves,
  defaultQuoteReserves
} from '../../shared/constants';

const baseUrl = 'http://localhost:3000/currencies';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  baseReserves = new BehaviorSubject<CurrencyReserve<number>>(
    defaultBaseReserves
  );
  quoteReserves = new BehaviorSubject<CurrencyReserve<number>>(
    defaultQuoteReserves
  );

  exchangeCurrency(pay: number, receive: number) {
    const { id: baseId, reserves: baseReserves } = this.baseReserves.getValue();
    const {
      id: quoteId,
      reserves: quoteReserves
    } = this.quoteReserves.getValue();
    const newBase = baseReserves - pay;
    const newQuote = quoteReserves + receive;
    const reqObservable = combineLatest([
      this.http.patch(`${baseUrl}/${baseId}`, {
        reserves: newBase
      }),
      this.http.patch(`${baseUrl}/${quoteId}`, {
        reserves: newQuote
      })
    ]);
    reqObservable.subscribe(() => {
      this.baseReserves.next({
        id: baseId,
        reserves: newBase
      });
      this.quoteReserves.next({
        id: quoteId,
        reserves: newQuote
      });
    });
    return reqObservable;
  }

  getFromServer(currency: CurrencySymbol) {
    return this.http.get(`${baseUrl}/${currency}`);
  }

  constructor(
    private http: HttpClient,
    private currencySelection: CurrencySelectionsService
  ) {
    this.currencySelection.base.subscribe(async base => {
      this.baseReserves.next(
        (await this.getFromServer(base).toPromise()) as CurrencyReserve<number>
      );
    });
    this.currencySelection.quote.subscribe(async quote => {
      this.quoteReserves.next(
        (await this.getFromServer(quote).toPromise()) as CurrencyReserve<number>
      );
    });
  }
}
