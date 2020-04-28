import { useState, useEffect } from 'react';
import { Transaction } from '../../../../../libs/shared/src/lib/types';
import { FxTransactionDbClientInstance } from '../transactionDbClient';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction<number>[]>([]);

  useEffect(() => {
    FxTransactionDbClientInstance.getTransactions().then(setTransactions);
  }, [setTransactions]);

  return transactions;
};
