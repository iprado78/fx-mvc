import React from "react";

import {
    currencyFormatterFactory, CurrencySymbol, FxEntries, hisotricalRatesGridColumnDefs,
    historicalRatesGridDefaultColDef, rowDataFromFxEntries
} from "@fx/ui-core-data";

import { AgGridWrapper } from "../ag-grid-wrapper/ag-grid-wrapper";

interface HistoricalRatesGridProps {
  historicalRates: FxEntries;
  quoteCurrency: CurrencySymbol;
}
export const HistoricalRatesGrid = ({
  historicalRates,
  quoteCurrency,
}: HistoricalRatesGridProps) => {
  return (
    <AgGridWrapper
      columnDefs={hisotricalRatesGridColumnDefs}
      defaultColDef={historicalRatesGridDefaultColDef}
      rowData={rowDataFromFxEntries(
        historicalRates,
        currencyFormatterFactory(quoteCurrency)
      )}
    />
  );
};
