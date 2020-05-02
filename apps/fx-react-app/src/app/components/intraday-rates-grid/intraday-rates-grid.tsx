import React from 'react';
import {
  FxEntries,
  CurrencySymbol,
  rowDataFromFxEntries,
  currencyFormatterFactory,
  utcStringToLocal,
  intradayRatesGridColumnDefs,
  intradayRatesGridDefaultColDef
} from '@fx/ui-core-data';
import { AgGridWrapper } from '../ag-grid-wrapper/ag-grid-wrapper';

interface IntradayRatesGridProps {
  intradayRates: FxEntries;
  quoteCurrency: CurrencySymbol;
}
export const IntradayRatesGrid = ({
  intradayRates,
  quoteCurrency
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
