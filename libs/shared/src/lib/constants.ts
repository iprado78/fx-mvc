import {
  CurrencyReserve,
  CurrencySymbol,
  CurrencyLocale,
  LiveRate
} from './types';
import { Moment } from 'moment';
import moment from 'moment';
import { ColDef } from 'ag-grid-community';

export const defaultBase: CurrencySymbol = 'USD';

export const defaultQuote: CurrencySymbol = 'EUR';

export const defaultBaseReserves: CurrencyReserve<number> = {
  code: defaultBase,
  reserves: 0
};

export const defaultQuoteReserves: CurrencyReserve<number> = {
  code: defaultQuote,
  reserves: 0
};

export const defaultLiveRate: LiveRate<number, Moment> = {
  rate: 0,
  refreshTime: moment()
};

export const currencySymbolLocaleMap: Map<
  CurrencySymbol,
  CurrencyLocale
> = new Map([
  ['USD', 'en-US'],
  ['EUR', 'de-De'],
  ['GBP', 'en-GB'],
  ['JPY', 'ja-JP']
]);

export const transactionsGridDefaultColDef: ColDef = {
  sortable: true,
  cellClass: 'align-right',
  headerClass: 'align-right',
  width: 120
};

export const transactionsGridColumnDefs: ColDef[] = [
  {
    headerName: 'Timestamp',
    field: 'timestamp',
    width: 200
  },
  {
    headerName: 'Pay',
    field: 'payAmount'
  },
  {
    headerName: 'Receive',
    field: 'receiveAmount'
  },
  {
    headerName: 'Pay Balance',
    field: 'payCurrencyBalance'
  },
  {
    headerName: 'Receive Balance',
    field: 'receiveCurrencyBalance'
  }
];
