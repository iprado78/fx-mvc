import { useCallback, useEffect, useState } from "react";

import {
    CurrencyReserve, CurrencySymbol, defaultBaseReserves, defaultQuoteReserves
} from "@fx/ui-core-data";

import { FxTransactionDbClientInstance } from "../transactionDbClient";

const hydrateReserve = (
  currencySymbol: CurrencySymbol,
  reserveSetter: React.Dispatch<React.SetStateAction<CurrencyReserve<number>>>
) =>
  FxTransactionDbClientInstance.getReserves(currencySymbol).then(reserveSetter);

export const useReserves = (base: CurrencySymbol, quote: CurrencySymbol) => {
  const [baseReserves, setBaseRerve] = useState<CurrencyReserve<number>>(
    defaultBaseReserves
  );
  const [quoteReserves, setQuoteReserves] = useState<CurrencyReserve<number>>(
    defaultQuoteReserves
  );

  useEffect(() => {
    hydrateReserve(base, setBaseRerve);
  }, [base, setBaseRerve]);

  useEffect(() => {
    hydrateReserve(quote, setQuoteReserves);
  }, [quote, setQuoteReserves]);

  const hydrateReserves = useCallback(() => {
    hydrateReserve(base, setBaseRerve);
    hydrateReserve(quote, setQuoteReserves);
  }, [base, quote]);

  return { baseReserves, quoteReserves, hydrateReserves };
};
