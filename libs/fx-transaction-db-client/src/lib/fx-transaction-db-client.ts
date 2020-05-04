import { currencies as currenciesBootstrap } from './db-bootstrap.js';
import {
  CurrencyReserve,
  Transaction,
  CurrencySymbol,
  Exchange
} from '@fx/ui-core-data';
import { Injectable } from '@angular/core';

type Store = 'currencyReserves' | 'transactions';

const RESERVES: Store = 'currencyReserves';
const TRANSACTIONS: Store = 'transactions';
const DB = 'FxTransaction';

@Injectable({
  providedIn: 'root'
})
export class FxTransactionDbClient {
  private db: IDBDatabase;
  loaded: Promise<boolean>;
  constructor() {
    this.loaded = new Promise((resolve, reject) => {
      const req = window.indexedDB.open(DB, 1);
      req.onupgradeneeded = (e: any) => {
        this.db = e.target.result;
        this.initialize(resolve);
      };
      req.onsuccess = (e: any) => {
        this.db = e.target.result;
        resolve(true);
      };
      req.onerror = this.handleError('initialize', reject);
    });
  }

  private handleError = (action: string, cb?: (m: string) => void) => {
    return (e: any) => {
      e.message = `Failed to ${action}: ${DB} db - ${e.target.errorCode}`;
      if (cb) {
        cb(e);
      } else {
        return e;
      }
    };
  };

  private prepareTransaction = (
    stores: Store[],
    mode: 'readonly' | 'readwrite'
  ) => {
    const transaction = this.db.transaction(stores, mode);
    const transactionStores = stores.map(store =>
      transaction.objectStore(store)
    );
    return [transaction, transactionStores] as [
      IDBTransaction,
      IDBObjectStore[]
    ];
  };

  private initialize = (resolve: (val: boolean) => void) => {
    const currencyReservesStore = this.db.createObjectStore(RESERVES, {
      keyPath: 'code'
    });

    currencyReservesStore.transaction.oncomplete = () => {
      const [transaction, [transactionStore]] = this.prepareTransaction(
        [RESERVES],
        'readwrite'
      );
      currenciesBootstrap.map((currencyReserve: CurrencyReserve<number>) =>
        transactionStore.add(currencyReserve)
      );
      transaction.oncomplete = () => resolve(true);
    };

    const transactionsStore = this.db.createObjectStore(TRANSACTIONS, {
      keyPath: 'timestamp'
    });

    transactionsStore.createIndex('timestamp', 'timestamp', { unique: true });
  };

  private updateReserves = async (
    store: IDBObjectStore,
    currencyReserve: CurrencyReserve<number>
  ) => {
    await this.loaded;
    return new Promise<CurrencyReserve<number>>((resolve, reject) => {
      const req = store.put(currencyReserve);
      req.onsuccess = () => {
        resolve(currencyReserve);
      };
      req.onerror = this.handleError(
        `set ${currencyReserve.code} at ${currencyReserve.reserves}`,
        reject
      );
    });
  };

  getTransactions = async () => {
    await this.loaded;
    const [, [transactionsStore]] = this.prepareTransaction(
      [TRANSACTIONS],
      'readonly'
    );
    return new Promise<Transaction<number>[]>((resolve, reject) => {
      const transactions: Transaction<number>[] = [];

      const req = transactionsStore.openCursor(null, 'prev');
      req.onerror = this.handleError(`get all transactions`, reject);
      req.onsuccess = (e: any) => {
        const { result } = e.target;
        if (result) {
          transactions.push(result.value);
          result.continue();
        } else {
          resolve(transactions);
        }
      };
    });
  };

  private createTransaction = async (
    store: IDBObjectStore,
    base: CurrencyReserve<number>,
    quote: CurrencyReserve<number>,
    payAmount: number,
    receiveAmount: number
  ) => {
    store.add({
      timestamp: new Date().toISOString(),
      payCurrency: base.code,
      receiveCurrency: quote.code,
      payAmount,
      receiveAmount,
      payCurrencyBalance: base.reserves,
      receiveCurrencyBalance: quote.reserves
    } as Transaction<number>);
  };

  updatPairReserves = async (pay: Exchange, receive: Exchange) => {
    await this.loaded;
    let base: CurrencyReserve<number>;
    let quote: CurrencyReserve<number>;
    try {
      [base, quote] = await Promise.all([
        this.getReserves(pay.currency),
        this.getReserves(receive.currency)
      ]);
      base.reserves -= pay.amount;
      quote.reserves += receive.amount;
    } catch (e) {
      return Promise.reject(e);
    }
    const [, [reservesStore, transactionsStore]] = this.prepareTransaction(
      [RESERVES, TRANSACTIONS],
      'readwrite'
    );
    this.createTransaction(
      transactionsStore,
      base,
      quote,
      pay.amount,
      receive.amount
    );
    return Promise.all([
      this.updateReserves(reservesStore, base),
      this.updateReserves(reservesStore, quote)
    ]);
  };

  getReserves = async (currency: CurrencySymbol) => {
    await this.loaded;
    const [, [transactionStore]] = this.prepareTransaction(
      [RESERVES],
      'readonly'
    );
    return new Promise<CurrencyReserve<number>>((resolve, reject) => {
      const req = transactionStore.get(currency);
      req.onerror = this.handleError(`get ${currency} reserves`, reject);
      req.onsuccess = (e: any) => {
        resolve(e.target.result);
      };
    });
  };
}
