import { AlphaVantageClient } from '../../../../../libs/alpha-vantage-client/src/lib/alpha-vantage-client';
import { useEffect, useState } from 'react';
import {
  RateHookDependencies,
  FxEntries,
  enttriesFromHistoricalServerResponse
} from '@fx/ui-core-data';

export const useHistoricalRates = ([
  baseCurrency,
  quoteCurrency
]: RateHookDependencies) => {
  const [historicalRates, setHistoricalRates] = useState<FxEntries>([]);
  useEffect(() => {
    AlphaVantageClient.getHistoricalRates(baseCurrency, quoteCurrency)
      .then(enttriesFromHistoricalServerResponse)
      .then(setHistoricalRates);
  }, [baseCurrency, quoteCurrency]);
  return historicalRates;
};
