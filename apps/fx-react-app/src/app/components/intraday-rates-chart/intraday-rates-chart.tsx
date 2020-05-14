import React, { useMemo } from "react";

import {
    CurrencySymbol, FxEntries, fxEntriesToXpointData, intradayChartOptions, lineChartOptions,
    utcStringToLocal
} from "@fx/ui-core-data";

import { HighchartsWrapper } from "../highcharts-wrapper/highcharts-wrapper";

interface IntradayRatesChartProps {
  intradayRates: FxEntries;
  base: CurrencySymbol;
  quote: CurrencySymbol;
}
export const IntradayRatesChart = ({
  intradayRates,
  base,
  quote,
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
