import { Transaction, FxEntries, CurrencySymbol } from '../types';
import { currencySymbolLocaleMap } from '../constants';

const TEN_THOUSAND = 10000;

const toPipDiff = (end: number, start: number) =>
  Math.round(TEN_THOUSAND * (end - start));

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

export const transactionsToGridProjection = ({
  payAmount,
  payCurrency,
  receiveAmount,
  receiveCurrency,
  payCurrencyBalance,
  receiveCurrencyBalance,
  timestamp
}: Transaction<number>): Transaction<string> => {
  const payFormatter = currencyFormatterFactory(payCurrency, 2);
  const receiveFormatter = currencyFormatterFactory(receiveCurrency, 2);
  return {
    timestamp,
    payCurrency,
    receiveCurrency,
    payAmount: payFormatter(payAmount),
    receiveAmount: receiveFormatter(receiveAmount),
    payCurrencyBalance: payFormatter(payCurrencyBalance),
    receiveCurrencyBalance: receiveFormatter(receiveCurrencyBalance)
  };
};

export const rowDataFromFxEntries = (
  entries: FxEntries,
  currencyFormatter: (currencyAmount: number) => string,
  datetimeFormatter?: (datetime: string) => string
) => {
  return entries.map(([datetime, { open, high, low, close }]) => ({
    datetime: datetimeFormatter ? datetimeFormatter(datetime) : datetime,
    open: currencyFormatter(open),
    close: currencyFormatter(close),
    diff: toPipDiff(close, open),
    high: currencyFormatter(high),
    low: currencyFormatter(low),
    range: toPipDiff(high, low)
  }));
};
