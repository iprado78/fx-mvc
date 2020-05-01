import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FxTransactionDbClient } from '@fx/fx-transaction-db-client';
import {
  defaultQuoteReserves,
  defaultBaseReserves,
  CurrencyReserve
} from '@fx/ui-core-data';
import { CurrencySelectionsService } from '../currency-selections/currency-selections.service';
import { TransactionsService } from '../transactions/transactions.service';

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
    const transactionPromise = this.transactionsClient.updatPairReserves(
      {
        amount: pay,
        currency: base.code
      },
      {
        amount: receive,
        currency: quote.code
      }
    );
    try {
      const [newBase, newQuote] = await transactionPromise;
      this.baseReserves.next(newBase);
      this.quoteReserves.next(newQuote);
      this.transactionService.hydrateTransactions();
    } catch (e) {
      console.log(e);
    }
    return transactionPromise;
  }
}
