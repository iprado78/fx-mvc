import React, { useState } from 'react';
import { Header } from './components/header/header';
import { TransactionsGrid } from './components/transactions-grid/transactions-grid';
import { RealTimeCard } from './components/realtime-card/realtime-card';
import {
  CurrencySymbol,
  ViewState
} from '../../../../libs/shared/src/lib/types';
import { CurrencyPairSelect } from './components/currency-pair-select/currency-pair-select';
import {
  ThemeProvider,
  createMuiTheme,
  Grid,
  Tab,
  Tabs
} from '@material-ui/core';
import deepPurple from '@material-ui/core/colors/deepPurple';
import amber from '@material-ui/core/colors/amber';
import { useLiveRate } from './hooks/useLiveRate';
import {
  defaultBase,
  defaultQuote
} from '../../../../libs/shared/src/lib/constants';
import { useTransactions } from './hooks/useTransactions';
import { CurrencyReserves } from './components/currency-reserves/currency-reserves';
import { CurrencyExchange } from './components/currency-exchange/currency-exchange';
import { useReserves } from './hooks/useReserves';
import { IntradayRatesGrid } from './components/intraday-rates-grid/intraday-rates-grid';
import { HistoricalRatesGrid } from './components/historical-rates-grid/historical-rates-grid';
import { useHistoricalRates } from './hooks/useHistoricalRates';
import { useIntradayRates } from './hooks/useIntradayRates';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: amber
  }
});

export const App = () => {
  const [baseCurrency, setBaseCurrency] = useState<CurrencySymbol>(defaultBase);
  const [quoteCurrency, setQuoteCurrency] = useState<CurrencySymbol>(
    defaultQuote
  );
  const [viewState, setViewState] = useState<ViewState>('intraday');
  const { transactions, hydrateTransactions } = useTransactions();
  const liveRate = useLiveRate([baseCurrency, quoteCurrency]);
  const historicalRates = useHistoricalRates([baseCurrency, quoteCurrency]);
  const { baseReserves, quoteReserves, hydrateReserves } = useReserves(
    baseCurrency,
    quoteCurrency
  );
  const intradayRates = useIntradayRates([baseCurrency, quoteCurrency]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header>
          <CurrencyPairSelect
            baseCurrency={baseCurrency}
            quoteCurrency={quoteCurrency}
            setBaseCurrency={setBaseCurrency}
            setQuoteCurrency={setQuoteCurrency}
          />
        </Header>
        <Grid container>
          <Grid item xs={6}>
            <RealTimeCard
              liveRate={liveRate}
              base={baseCurrency}
              quote={quoteCurrency}
            >
              <CurrencyReserves base={baseReserves} quote={quoteReserves} />
              <CurrencyExchange
                max={baseReserves.reserves}
                base={baseCurrency}
                quote={quoteCurrency}
                rate={liveRate.rate}
                transactionSideEffects={[hydrateTransactions, hydrateReserves]}
              />
              <TransactionsGrid transactions={transactions} />
            </RealTimeCard>
          </Grid>
          <Grid item xs={6}>
            <Tabs
              value={viewState}
              onChange={(_e, value: ViewState) => setViewState(value)}
            >
              <Tab label="Intraday" value="intraday" />
              <Tab label="Historical" value="historical" />
            </Tabs>
            <section>
              {viewState === 'intraday' && (
                <IntradayRatesGrid
                  intradayRates={intradayRates}
                  quoteCurrency={quoteCurrency}
                />
              )}
              {viewState === 'historical' && (
                <HistoricalRatesGrid
                  historicalRates={historicalRates}
                  quoteCurrency={quoteCurrency}
                />
              )}
            </section>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default App;
