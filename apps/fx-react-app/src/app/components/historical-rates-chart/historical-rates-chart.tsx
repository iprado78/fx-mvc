import React, { useMemo } from 'react';
import { HighchartsWrapper } from '../highcharts-wrapper/highcharts-wrapper';
import {
  historicalChartOptions,
  fxEntriesToXpointData,
  lineChartOptions,
  FxEntries,
  CurrencySymbol
} from '@fx/ui-core-data';

interface HistoricalRatesChartProps {
  historicalRates: FxEntries;
  base: CurrencySymbol;
  quote: CurrencySymbol;
}
export const HistoricalRatesChart = ({
  historicalRates,
  base,
  quote
}: HistoricalRatesChartProps) => {
  const data = useMemo(() => fxEntriesToXpointData(historicalRates), [
    historicalRates
  ]);
  return (
    <HighchartsWrapper
      options={lineChartOptions(historicalChartOptions(data, base, quote))}
    />
  );
};
