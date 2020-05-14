import { useEffect, useState } from "react";

import { AlphaVantageClient } from "@fx/alpha-vantage-client";
import {
    enttriesFromIntradayServerResponse, FxEntries, RateHookDependencies
} from "@fx/ui-core-data";

export const useIntradayRates = ([
  baseCurrency,
  quoteCurrency,
]: RateHookDependencies) => {
  const [intradayRates, setIntradayRates] = useState<FxEntries>([]);
  useEffect(() => {
    AlphaVantageClient.getIntradayRates(baseCurrency, quoteCurrency)
      .then(enttriesFromIntradayServerResponse)
      .then(setIntradayRates);
  }, [baseCurrency, quoteCurrency]);
  return intradayRates;
};
