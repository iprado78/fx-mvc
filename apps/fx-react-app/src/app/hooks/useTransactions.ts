import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '../../../../../libs/shared/src/lib/types';
import { FxTransactionDbClientInstance } from '../transactionDbClient';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction<number>[]>([]);

  const hydrateTransactions = useCallback(async () => {
    FxTransactionDbClientInstance.getTransactions().then(setTransactions);
  }, [setTransactions]);

  useEffect(() => {
    hydrateTransactions();
  }, [hydrateTransactions]);

  return { transactions, hydrateTransactions };
};
