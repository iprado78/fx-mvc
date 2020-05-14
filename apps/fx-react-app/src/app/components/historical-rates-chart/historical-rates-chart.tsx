import React, { useMemo } from "react";

import {
    CurrencySymbol, FxEntries, fxEntriesToXpointData, historicalChartOptions, lineChartOptions
} from "@fx/ui-core-data";

import { HighchartsWrapper } from "../highcharts-wrapper/highcharts-wrapper";

interface HistoricalRatesChartProps {
  historicalRates: FxEntries;
  base: CurrencySymbol;
  quote: CurrencySymbol;
}
export const HistoricalRatesChart = ({
  historicalRates,
  base,
  quote,
}: HistoricalRatesChartProps) => {
  const data = useMemo(() => fxEntriesToXpointData(historicalRates), [
    historicalRates,
  ]);
  return (
    <HighchartsWrapper
      options={lineChartOptions(historicalChartOptions(data, base, quote))}
    />
  );
};
