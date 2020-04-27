import React, { useState, useEffect } from 'react';
import { Header } from './components/header/header';
import { TransactionsGrid } from './components/transactions-grid/transactions-grid';
import { RealTimeCard } from './components/realtime-card/realtime-card';
import {
  CurrencySymbol,
  LiveRate
} from '../../../../libs/shared/src/lib/types';
import { AlphaVantageClient } from '../../../../libs/alpha-vantage-client/src/lib/alpha-vantage-client';
import { rateFromServerResponse } from '../../../../libs/shared/src/lib/functions';
import { Moment } from 'moment';
import moment from 'moment';

export const App = () => {
  const [baseCurrency, setBaseCurrency] = useState<CurrencySymbol>('USD');
  const [quoteCurrency, setQuoteCurrency] = useState<CurrencySymbol>('EUR');
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
  return (
    <>
      <Header
        baseCurrency={baseCurrency}
        quoteCurrency={quoteCurrency}
        setBaseCurrency={setBaseCurrency}
        setQuoteCurrency={setQuoteCurrency}
      />
      <main>
        <RealTimeCard
          liveRate={liveRate}
          base={baseCurrency}
          quote={quoteCurrency}
        />
        <TransactionsGrid />
      </main>
    </>
  );
};

export default App;
