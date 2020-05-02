import React from 'react';
import { CurrencySymbol } from '@fx/ui-core-data';
import { HistoricalRatesChart } from '../historical-rates-chart/historical-rates-chart';
import { HistoricalRatesGrid } from '../historical-rates-grid/historical-rates-grid';
import { useHistoricalRates } from '../../hooks/useHistoricalRates';
import { TabCol } from '../tab-col/tab-col';

interface HistoricalTabProps {
  baseCurrency: CurrencySymbol;
  quoteCurrency: CurrencySymbol;
}
export const HistoricalTab = ({
  baseCurrency,
  quoteCurrency
}: HistoricalTabProps) => {
  const historicalRates = useHistoricalRates([baseCurrency, quoteCurrency]);
  return (
    <TabCol
      top={
        <HistoricalRatesChart
          historicalRates={historicalRates}
          base={baseCurrency}
          quote={quoteCurrency}
        />
      }
      bottom={
        <HistoricalRatesGrid
          historicalRates={historicalRates}
          quoteCurrency={quoteCurrency}
        />
      }
    />
  );
};
