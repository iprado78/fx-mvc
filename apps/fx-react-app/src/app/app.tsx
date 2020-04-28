import React, { useState, useEffect } from 'react';
import { Header } from './components/header/header';
import { TransactionsGrid } from './components/transactions-grid/transactions-grid';
import { RealTimeCard } from './components/realtime-card/realtime-card';
import { CurrencySymbol } from '../../../../libs/shared/src/lib/types';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import deepPurple from '@material-ui/core/colors/deepPurple';
import amber from '@material-ui/core/colors/amber';
import { useLiveRate } from './hooks/useLiveRate';
import {
  defaultBase,
  defaultQuote
} from '../../../../libs/shared/src/lib/constants';
import { useTransactions } from './hooks/useTransactions';

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
  const transactions = useTransactions();
  const liveRate = useLiveRate([baseCurrency, quoteCurrency]);

  return (
    <>
      <ThemeProvider theme={theme}>
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
          <TransactionsGrid transactions={transactions} />
        </main>
      </ThemeProvider>
    </>
  );
};

export default App;
