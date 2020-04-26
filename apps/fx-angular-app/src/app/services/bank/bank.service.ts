import { Injectable } from '@angular/core';
import { CurrencySelectionsService } from '../currency-selections/currency-selections.service';
import { BehaviorSubject } from 'rxjs';
import { TransactionsService } from '../transactions/transactions.service';
import { FxTransactionDbClient } from '../../../../../../libs/fx-transaction-db-client/src/';
import {
  defaultQuoteReserves,
  defaultBaseReserves,
  CurrencyReserve
} from '../../../../../../libs/shared/src';

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

  private newReservesEmitter = (target: 'base' | 'quote') => {
    this.currencySelection[target].subscribe(async currency => {
      const result = await this.transactionsClient.getReserves(currency);
      try {
        this[`${target}Reserves`].next(result);
      } catch (e) {
        console.log(e);
      }
    });
  };

  constructor(
    private currencySelection: CurrencySelectionsService,
    private transactionService: TransactionsService,
    private transactionsClient: FxTransactionDbClient
  ) {
    this.newReservesEmitter('base');
    this.newReservesEmitter('quote');
  }

  async exchangeCurrency(pay: number, receive: number) {
    const base = this.baseReserves.getValue();
    const quote = this.quoteReserves.getValue();
    const newBase = {
      code: base.code,
      reserves: base.reserves - pay
    } as CurrencyReserve<number>;
    const newQuote = {
      code: quote.code,
      reserves: quote.reserves + receive
    } as CurrencyReserve<number>;
    const transactionPromise = this.transactionsClient.updatPairReserves(
      newBase,
      newQuote,
      pay,
      receive
    );
    try {
      await transactionPromise;
      this.baseReserves.next(newBase);
      this.quoteReserves.next(newQuote);
      this.transactionService.hydrateTransactions();
    } catch (e) {
      console.log(e);
    }
    return transactionPromise;
  }
}
