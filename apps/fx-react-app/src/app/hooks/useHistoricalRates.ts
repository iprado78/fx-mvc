import { useEffect, useState } from "react";

import { AlphaVantageClient } from "@fx/alpha-vantage-client";
import {
    enttriesFromHistoricalServerResponse, FxEntries, RateHookDependencies
} from "@fx/ui-core-data";

export const useHistoricalRates = ([
  baseCurrency,
  quoteCurrency,
]: RateHookDependencies) => {
  const [historicalRates, setHistoricalRates] = useState<FxEntries>([]);
  useEffect(() => {
    AlphaVantageClient.getHistoricalRates(baseCurrency, quoteCurrency)
      .then(enttriesFromHistoricalServerResponse)
      .then(setHistoricalRates);
  }, [baseCurrency, quoteCurrency]);
  return historicalRates;
};
