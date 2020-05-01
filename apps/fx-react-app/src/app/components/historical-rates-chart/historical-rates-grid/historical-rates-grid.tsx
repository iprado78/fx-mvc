import React from 'react';
import { AgGridWrapper } from '../../ag-grid-wrapper/ag-grid-wrapper';
import {
  historicalRatesGridDefaultColDef,
  hisotricalRatesGridColumnDefs
} from '../../../../../../../libs/ui-data/src/lib/constants/grids';
import {
  rowDataFromFxEntries,
  currencyFormatterFactory
} from '../../../../../../../libs/ui-data/src/lib/functions';
import {
  CurrencySymbol,
  FxEntries
} from '../../../../../../../libs/ui-data/src/lib/types';

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
