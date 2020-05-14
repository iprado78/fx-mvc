import { AlphaVantageClient } from '@fx/alpha-vantage-client';
import { useEffect, useState } from 'react';
import {
  RateHookDependencies,
  rateFromServerResponse,
  defaultLiveRate
} from '@fx/ui-core-data';

export const useLiveRate = ([
  baseCurrency,
  quoteCurrency
]: RateHookDependencies) => {
  const [liveRate, setLiveRate] = useState(defaultLiveRate);

  useEffect(() => {
    AlphaVantageClient.getLiveRate(baseCurrency, quoteCurrency)
      .then(res =>
        rateFromServerResponse(res['Realtime Currency Exchange Rate'])
      )
      .then(setLiveRate);
  }, [baseCurrency, quoteCurrency]);
  return liveRate;
};
