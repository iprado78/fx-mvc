import { AlphaVantageClient } from '../../../../../libs/alpha-vantage-client/src/lib/alpha-vantage-client';
import { enttriesFromHistoricalServerResponse } from '../../../../../libs/shared/src/lib/functions';
import { useEffect, useState } from 'react';
import { RateHookDependencies } from '../../../../../libs/shared/src/lib/types';
import { FxEntries } from '../../../../../libs/shared/src/lib/types';

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
