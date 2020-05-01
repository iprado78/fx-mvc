import React from 'react';
import { AgGridWrapper } from '../ag-grid-wrapper/ag-grid-wrapper';
import {
  intradayRatesGridColumnDefs,
  intradayRatesGridDefaultColDef
} from '../../../../../../libs/ui-data/src/lib/constants/grids';
import { FxEntries, CurrencySymbol } from 'libs/ui-data/src';
import {
  rowDataFromFxEntries,
  currencyFormatterFactory,
  utcStringToLocal
} from '../../../../../../libs/ui-data/src/lib/functions';

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
