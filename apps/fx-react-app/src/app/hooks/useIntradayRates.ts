import { AlphaVantageClient } from '../../../../../libs/alpha-vantage-client/src/lib/alpha-vantage-client';
import { useEffect, useState } from 'react';
import {
  RateHookDependencies,
  FxEntries,
  enttriesFromIntradayServerResponse
} from '@fx/ui-core-data';

export const useIntradayRates = ([
  baseCurrency,
  quoteCurrency
]: RateHookDependencies) => {
  const [intradayRates, setIntradayRates] = useState<FxEntries>([]);
  useEffect(() => {
    AlphaVantageClient.getIntradayRates(baseCurrency, quoteCurrency)
      .then(enttriesFromIntradayServerResponse)
      .then(setIntradayRates);
  }, [baseCurrency, quoteCurrency]);
  return intradayRates;
};
