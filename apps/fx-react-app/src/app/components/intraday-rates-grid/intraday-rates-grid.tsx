import React from 'react';
import { AgGridWrapper } from '../ag-grid-wrapper/ag-grid-wrapper';
import {
  intradayRatesGridColumnDefs,
  intradayRatesGridDefaultColDef
} from '../../../../../../libs/shared/src/lib/constants/grids';
import { FxEntries, CurrencySymbol } from '@fx/test';
import {
  rowDataFromFxEntries,
  currencyFormatterFactory,
  utcStringToLocal
} from '../../../../../../libs/shared/src/lib/functions';

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
      title="Intraday Rates"
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
