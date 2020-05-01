import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '@fx/ui-core-data';
import { FxTransactionDbClient } from '@fx/fx-transaction-db-client';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private t = new BehaviorSubject<Transaction<number>[]>([]);
  transactions = this.t.asObservable();
  constructor(private dbClient: FxTransactionDbClient) {
    this.hydrateTransactions();
  }
  hydrateTransactions = async () => {
    this.t.next(await this.dbClient.getTransactions());
  };
}
