import React from "react";

import { CurrencySymbol } from "@fx/ui-core-data";

import { useIntradayRates } from "../../hooks/useIntradayRates";
import { IntradayRatesChart } from "../intraday-rates-chart/intraday-rates-chart";
import { IntradayRatesGrid } from "../intraday-rates-grid/intraday-rates-grid";
import { TabCol } from "../tab-col/tab-col";

interface IntradayTabProps {
  baseCurrency: CurrencySymbol;
  quoteCurrency: CurrencySymbol;
}
export const IntradayTab = ({
  baseCurrency,
  quoteCurrency,
}: IntradayTabProps) => {
  const intradayRates = useIntradayRates([baseCurrency, quoteCurrency]);
  return (
    <TabCol
      top={
        <IntradayRatesChart
          intradayRates={intradayRates}
          base={baseCurrency}
          quote={quoteCurrency}
        />
      }
      bottom={
        <IntradayRatesGrid
          intradayRates={intradayRates}
          quoteCurrency={quoteCurrency}
        />
      }
    />
  );
};
