import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { defaultBase, defaultQuote, CurrencySymbol } from '@fx/ui-core-data';
import { Header } from './components/header/header';
import { CurrencyPairSelect } from './components/currency-pair-select/currency-pair-select';
import { theme } from './theme';
import { Main } from './components/main/main';
import { ApiKeyPreferences } from './components/api-key-preferences/api-key-preferences';

export const App = () => {
  const [baseCurrency, setBaseCurrency] = useState<CurrencySymbol>(defaultBase);
  const [quoteCurrency, setQuoteCurrency] = useState<CurrencySymbol>(
    defaultQuote
  );

  return (
    <ThemeProvider theme={theme}>
      <ApiKeyPreferences />
      <Header>
        <CurrencyPairSelect
          baseCurrency={baseCurrency}
          quoteCurrency={quoteCurrency}
          setBaseCurrency={setBaseCurrency}
          setQuoteCurrency={setQuoteCurrency}
        />
      </Header>
      <Main baseCurrency={baseCurrency} quoteCurrency={quoteCurrency} />
    </ThemeProvider>
  );
};

export default App;
