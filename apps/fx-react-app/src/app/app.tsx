import React, { useState } from 'react';
import { Header } from './components/header/header';
import { TransactionsGrid } from './components/transactions-grid/transactions-grid';
import { RealTimeCard } from './components/realtime-card/realtime-card';
import { CurrencySymbol } from '../../../../libs/shared/src/lib/types';
import { CurrencyPairSelect } from './components/currency-pair-select/currency-pair-select';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
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
  const { transactions, hydrateTransactions } = useTransactions();
  const liveRate = useLiveRate([baseCurrency, quoteCurrency]);
  const { baseReserves, quoteReserves, hydrateReserves } = useReserves(
    baseCurrency,
    quoteCurrency
  );

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
        <main>
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
          </RealTimeCard>
          <TransactionsGrid transactions={transactions} />
        </main>
      </ThemeProvider>
    </>
  );
};

export default App;
