import React from 'react';
import { AgGridWrapper } from '../ag-grid-wrapper/ag-grid-wrapper';
import {
  historicalRatesGridDefaultColDef,
  hisotricalRatesGridColumnDefs,
  rowDataFromFxEntries,
  currencyFormatterFactory,
  CurrencySymbol,
  FxEntries
} from '@fx/ui-core-data';

interface HistoricalRatesGridProps {
  historicalRates: FxEntries;
  quoteCurrency: CurrencySymbol;
}
export const HistoricalRatesGrid = ({
  historicalRates,
  quoteCurrency
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
