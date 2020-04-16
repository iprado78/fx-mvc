import { CurrencySymbol } from './types';
import { currencySymbolLocaleMap } from './constants';

export const currencyFormatterFactory = (
  symbol: CurrencySymbol,
  sigDif: number = 4
) => {
  const { format } = new Intl.NumberFormat(
    currencySymbolLocaleMap.get(symbol),
    {
      style: 'currency',
      currency: symbol,
      maximumFractionDigits: sigDif,
      minimumFractionDigits: sigDif
    }
  );

  return format;
};
