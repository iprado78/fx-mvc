import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencySelectionsService } from '../currency-selections/currency-selections.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CurrencyReserve, CurrencySymbol } from '../../shared/types';
import { map, concatAll } from 'rxjs/operators';
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

  private getFromServer(currency: CurrencySymbol) {
    return this.http.get(`${baseUrl}/${currency}`);
  }

  private newReservesEmitter(target: 'base' | 'quote') {
    this.currencySelection[target]
      .pipe(map(this.getFromServer), concatAll())
      .subscribe(this[`${target}Reserves`].next);
  }

  constructor(
    private http: HttpClient,
    private currencySelection: CurrencySelectionsService
  ) {
    this.getFromServer = this.getFromServer.bind(this);
    this.baseReserves.next = this.baseReserves.next.bind(this.baseReserves);
    this.quoteReserves.next = this.quoteReserves.next.bind(this.quoteReserves);
    this.newReservesEmitter('base');
    this.newReservesEmitter('quote');
  }
}
