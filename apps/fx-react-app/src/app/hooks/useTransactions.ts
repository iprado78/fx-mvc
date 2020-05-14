import { useCallback, useEffect, useState } from "react";

import { Transaction } from "@fx/ui-core-data";

import { FxTransactionDbClientInstance } from "../transactionDbClient";

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
