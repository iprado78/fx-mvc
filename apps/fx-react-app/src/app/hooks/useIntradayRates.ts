import { AlphaVantageClient } from '../../../../../libs/alpha-vantage-client/src/lib/alpha-vantage-client';
import { enttriesFromIntradayServerResponse } from '../../../../../libs/shared/src/lib/functions';
import { useEffect, useState } from 'react';
import { RateHookDependencies } from '../../../../../libs/shared/src/lib/types';
import { FxEntries } from '../../../../../libs/shared/src/lib/types';

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
