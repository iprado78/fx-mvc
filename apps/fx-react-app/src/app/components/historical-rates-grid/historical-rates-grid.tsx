import React from 'react';
import { AgGridWrapper } from '../ag-grid-wrapper/ag-grid-wrapper';
import {
  historicalRatesGridDefaultColDef,
  hisotricalRatesGridColumnDefs
} from '../../../../../../libs/shared/src/lib/constants/grids';
import {
  rowDataFromFxEntries,
  currencyFormatterFactory
} from '../../../../../../libs/shared/src/lib/functions';
import {
  CurrencySymbol,
  FxEntries
} from '../../../../../../libs/shared/src/lib/types';

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
      title="Historical Rates"
      columnDefs={hisotricalRatesGridColumnDefs}
      defaultColDef={historicalRatesGridDefaultColDef}
      rowData={rowDataFromFxEntries(
        historicalRates,
        currencyFormatterFactory(quoteCurrency)
      )}
    />
  );
};
