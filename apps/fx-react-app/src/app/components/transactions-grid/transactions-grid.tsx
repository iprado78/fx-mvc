import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { useAsync } from 'react-use';
import { CardContent } from '@material-ui/core';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { FxTransactionDbClientInstance } from '../../transactionDbClient';
import {
  Transaction,
  transactionsToGridProjection
} from '../../../../../../libs/shared/src';

const defaultColDef: ColDef = {
  sortable: true,
  cellClass: 'align-right',
  headerClass: 'align-right',
  width: 120
};

const columnDefs: ColDef[] = [
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

export const TransactionsGrid = () => {
  const [rowData, setRowData] = useState<Transaction<string>[]>([]);
  const transactions = useAsync(FxTransactionDbClientInstance.getTransactions);

  useEffect(() => {
    const { value: resolved } = transactions;
    if (resolved) {
      setRowData(resolved.reverse().map(transactionsToGridProjection));
    }
  }, [transactions.value]);

  return (
    <Card>
      <CardHeader title="Transactions"></CardHeader>
      <CardContent>
        <div
          className="ag-theme-balham"
          style={{ height: '600px', maxWidth: '1400px' }}
        >
          <AgGridReact
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            rowData={rowData}
          />
        </div>
      </CardContent>
    </Card>
  );
};
