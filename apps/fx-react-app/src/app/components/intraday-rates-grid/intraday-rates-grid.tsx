import React from "react";

import {
    currencyFormatterFactory, CurrencySymbol, FxEntries, intradayRatesGridColumnDefs,
    intradayRatesGridDefaultColDef, rowDataFromFxEntries, utcStringToLocal
} from "@fx/ui-core-data";

import { AgGridWrapper } from "../ag-grid-wrapper/ag-grid-wrapper";

interface IntradayRatesGridProps {
  intradayRates: FxEntries;
  quoteCurrency: CurrencySymbol;
}
export const IntradayRatesGrid = ({
  intradayRates,
  quoteCurrency,
}: IntradayRatesGridProps) => {
  return (
    <AgGridWrapper
      columnDefs={intradayRatesGridColumnDefs}
      defaultColDef={intradayRatesGridDefaultColDef}
      rowData={rowDataFromFxEntries(
        intradayRates,
        currencyFormatterFactory(quoteCurrency),
        utcStringToLocal
      )}
    />
  );
};
