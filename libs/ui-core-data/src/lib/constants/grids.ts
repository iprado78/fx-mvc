import { ColDef } from 'ag-grid-community';

const allDefaults: ColDef = {
  sortable: true,
  cellClass: 'align-right',
  headerClass: 'align-right'
};

export const transactionsGridDefaultColDef: ColDef = {
  ...allDefaults,
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

export const intradayRatesGridDefaultColDef: ColDef = {
  ...allDefaults,
  width: 125
};

const baseRatesGrid: ColDef[] = [
  {
    headerName: 'Open',
    field: 'open'
  },
  {
    headerName: 'Close',
    field: 'close'
  },
  {
    headerName: 'Change (Pips)',
    field: 'diff'
  },
  {
    headerName: 'High',
    field: 'high'
  },
  {
    headerName: 'Low',
    field: 'low'
  },
  {
    headerName: 'Range (Pips)',
    field: 'range'
  }
];

export const intradayRatesGridColumnDefs: ColDef[] = [
  {
    headerName: 'Time',
    field: 'datetime'
  },
  ...baseRatesGrid
];

export const historicalRatesGridDefaultColDef: ColDef = intradayRatesGridDefaultColDef;

export const hisotricalRatesGridColumnDefs: ColDef[] = [
  {
    headerName: 'Date',
    field: 'datetime'
  },
  ...baseRatesGrid
];
