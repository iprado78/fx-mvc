import React, { useState } from "react";

import { CurrencySymbol, defaultBase, defaultQuote } from "@fx/ui-core-data";
import { ThemeProvider } from "@material-ui/core";

import { ApiKeyPreferences } from "./components/api-key-preferences/api-key-preferences";
import { CurrencyPairSelect } from "./components/currency-pair-select/currency-pair-select";
import { Header } from "./components/header/header";
import { Main } from "./components/main/main";
import { theme } from "./theme";

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
