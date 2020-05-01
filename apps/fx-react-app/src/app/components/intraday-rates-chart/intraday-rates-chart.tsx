import React, { useMemo } from 'react';
import { HighchartsWrapper } from '../highcharts-wrapper/highcharts-wrapper';

import {
  CurrencySymbol,
  FxEntries,
  INTRADAY_CHART_NAME,
  fxEntriesToXpointData,
  utcStringToLocal,
  lineChartOptions
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
      options={lineChartOptions({
        title: `${base}/${quote}`,
        data,
        name: INTRADAY_CHART_NAME,
        stepFactor: 6
      })}
    />
  );
};
