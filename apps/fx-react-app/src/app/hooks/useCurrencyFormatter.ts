import { currencyFormatterFactory } from '../../../../../libs/shared/src/lib/functions';
import { useMemo } from 'react';
import { CurrencySymbol } from '../../../../../libs/shared/src/lib/types';

export const useCurrencyFormatter = (currencySymbol: CurrencySymbol) =>
  useMemo(() => currencyFormatterFactory(currencySymbol), [currencySymbol]);
