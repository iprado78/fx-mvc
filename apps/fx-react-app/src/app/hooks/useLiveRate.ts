import { AlphaVantageClient } from '../../../../../libs/alpha-vantage-client/src/lib/alpha-vantage-client';
import { rateFromServerResponse } from '../../../../../libs/shared/src/lib/functions';
import { Moment } from 'moment';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  LiveRate,
  RateHookDependencies
} from '../../../../../libs/shared/src/lib/types';

export const useLiveRate = ([
  baseCurrency,
  quoteCurrency
]: RateHookDependencies) => {
  const [liveRate, setLiveRate] = useState({
    rate: 0,
    refreshTime: moment.utc(new Date())
  } as LiveRate<number, Moment>);

  useEffect(() => {
    AlphaVantageClient.getLiveRate(baseCurrency, quoteCurrency)
      .then(res =>
        rateFromServerResponse(res['Realtime Currency Exchange Rate'])
      )
      .then(setLiveRate);
  }, [baseCurrency, quoteCurrency]);
  return liveRate;
};
