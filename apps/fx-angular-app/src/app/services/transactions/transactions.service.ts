import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../../shared/types';
import { FxAngularTransactionsDbClientService } from '../fx-angular-transaction-db-client/fx-angular-transaction-db-client.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private t = new BehaviorSubject<Transaction<number>[]>([]);
  transactions = this.t.asObservable();
  constructor(private dbClient: FxAngularTransactionsDbClientService) {
    this.hydrateTransactions();
  }
  hydrateTransactions = async () => {
    this.t.next(await this.dbClient.getTransactions());
  };
}
