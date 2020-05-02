import React, { useMemo } from 'react';
import { HighchartsWrapper } from '../highcharts-wrapper/highcharts-wrapper';

import {
  CurrencySymbol,
  FxEntries,
  fxEntriesToXpointData,
  utcStringToLocal,
  lineChartOptions,
  intradayChartOptions
} from '@fx/ui-core-data';

interface IntradayRatesChartProps {
  intradayRates: FxEntries;
  base: CurrencySymbol;
  quote: CurrencySymbol;
}
export const IntradayRatesChart = ({
  intradayRates,
  base,
  quote
}: IntradayRatesChartProps) => {
  const data = useMemo(
    () => fxEntriesToXpointData(intradayRates, utcStringToLocal),
    [intradayRates]
  );
  return (
    <HighchartsWrapper
      options={lineChartOptions(intradayChartOptions(data, base, quote))}
    />
  );
};
