import { IDBFactory, reset } from "shelving-mock-indexeddb";

import { CurrencySymbol } from "@fx/ui-core-data";

import { FxTransactionDbClient } from "./fx-transaction-db-client";

// @ts-ignore: reassign readonly
window.indexedDB = new IDBFactory();

/**
 * Inner describe blocks are expected to run in order
 */
describe('FxTransactionDbClient', () => {
  let client: FxTransactionDbClient;

  describe('initialization', () => {
    beforeAll(() => {
      client = new FxTransactionDbClient();
    });

    afterAll(() => {
      reset();
    });

    it('should load', () => {
      return expect(client.loaded).resolves.toBe(true);
    });

    it('should set correct initial values', async () => {
      const usdBalance = await client.getReserves('USD');
      expect(usdBalance.reserves).toBe(5000);

      const foreignCurrencies: CurrencySymbol[] = ['JPY', 'EUR', 'GBP'];
      const foreignBalance = await client.getReserves(
        foreignCurrencies[Math.floor(Math.random() * foreignCurrencies.length)]
      );
      expect(foreignBalance.reserves).toBe(0);
    });

    it('should not re-initialize after first run', async () => {
      await client.updatPairReserves(
        {
          currency: 'USD',
          amount: 2000,
        },
        {
          currency: 'EUR',
          amount: 1500,
        }
      );

      client = new FxTransactionDbClient();

      const usdBalance = await client.getReserves('USD');
      expect(usdBalance.reserves).toBe(3000);
    });
  });

  describe('transactions', () => {
    beforeAll(() => {
      client = new FxTransactionDbClient();
    });

    afterAll(() => {
      reset();
    });

    it('should return most recent transactions first', async () => {
      await client.updatPairReserves(
        {
          currency: 'USD',
          amount: 2000,
        },
        {
          currency: 'EUR',
          amount: 1500,
        }
      );
      await client.updatPairReserves(
        {
          currency: 'EUR',
          amount: 1000,
        },
        {
          currency: 'JPY',
          amount: 500,
        }
      );
      const [transaction1, transaction2] = await client.getTransactions();
      expect(transaction1.payCurrency).toBe('EUR');
      expect(transaction2.payCurrency).toBe('USD');
    });
  });

  describe('reserves', () => {
    beforeAll(() => {
      client = new FxTransactionDbClient();
    });

    afterAll(() => {
      reset();
    });

    it('should not transact when pay amount exceeds reserves', () => {
      return expect(
        client.updatPairReserves(
          {
            currency: 'EUR',
            amount: 1000,
          },
          {
            currency: 'JPY',
            amount: 500,
          }
        )
      ).rejects.toMatch('exceeds');
    });
  });
});
