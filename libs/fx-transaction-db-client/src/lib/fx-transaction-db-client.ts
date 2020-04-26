import { currencies as currenciesBootstrap } from './db-bootstrap.js';
import {
  CurrencyReserve,
  Transaction,
  CurrencySymbol
} from '../../../shared/src/lib/types';
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
      const message = `Failed to ${action}: ${DB} db - ${e.target.errorCode}`;
      if (cb) {
        e.message = message;
        cb(e);
      } else {
        return message;
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
    return new Promise((resolve, reject) => {
      const req = store.put(currencyReserve);
      req.onsuccess = (e: any) => {
        resolve(e.target.result);
      };
      req.onerror = this.handleError(
        `set ${currencyReserve.code} at ${currencyReserve.reserves}`,
        reject
      );
    });
  };

  getTransactions = async () => {
    console.log('callled.......');
    await this.loaded;
    const [, [transactionsStore]] = this.prepareTransaction(
      [TRANSACTIONS],
      'readonly'
    );
    return new Promise<Transaction<number>[]>((resolve, reject) => {
      const req = transactionsStore.getAll();
      req.onerror = this.handleError(`get all transactions`, reject);
      req.onsuccess = (e: any) => {
        resolve(e.target.result);
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

  updatPairReserves = async (
    base: CurrencyReserve<number>,
    quote: CurrencyReserve<number>,
    payAmount: number,
    receiveAmount: number
  ) => {
    await this.loaded;
    const [, [reservesStore, transactionsStore]] = this.prepareTransaction(
      [RESERVES, TRANSACTIONS],
      'readwrite'
    );
    return Promise.all([
      this.updateReserves(reservesStore, base),
      this.updateReserves(reservesStore, quote),
      this.createTransaction(
        transactionsStore,
        base,
        quote,
        payAmount,
        receiveAmount
      )
    ]);
  };

  getReserves = async (currency: CurrencySymbol) => {
    await this.loaded;
    const [, [transactionStore]] = this.prepareTransaction(
      [RESERVES],
      'readonly'
    );
    return new Promise((resolve, reject) => {
      const req = transactionStore.get(currency);
      req.onerror = this.handleError(`get ${currency} reserves`, reject);
      req.onsuccess = (e: any) => {
        resolve(e.target.result);
      };
    });
  };
}
