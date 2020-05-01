import React, { useMemo } from 'react';
import { HighchartsWrapper } from '../highcharts-wrapper/highcharts-wrapper';
import {
  FxEntries,
  CurrencySymbol
} from '../../../../../../libs/ui-data/src/lib/types';
import {
  fxEntriesToXpointData,
  lineChartOptions
} from '../../../../../../libs/ui-data/src/lib/functions';
import { HISTORICAL_CHART_NAME } from 'libs/ui-data/src';

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
      options={lineChartOptions({
        title: `${base}/${quote}`,
        data,
        name: HISTORICAL_CHART_NAME,
        stepFactor: 10
      })}
    />
  );
};
