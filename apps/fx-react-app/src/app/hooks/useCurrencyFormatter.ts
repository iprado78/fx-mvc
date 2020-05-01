import { useMemo } from 'react';
import { CurrencySymbol, currencyFormatterFactory } from '@fx/ui-core-data';

export const useCurrencyFormatter = (
  currencySymbol: CurrencySymbol,
  digits: number
) =>
  useMemo(() => currencyFormatterFactory(currencySymbol, digits), [
    currencySymbol
  ]);
