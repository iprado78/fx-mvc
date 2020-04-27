import React, { useState, useEffect } from 'react';
import { useAsync } from 'react-use';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { FxTransactionDbClientInstance } from '../../transactionDbClient';
import { FxCard } from '../fx-card/fx-card';
import {
  Transaction,
  transactionsToGridProjection,
  transactionsGridColumnDefs as columnDefs,
  transactionsGridDefaultColDef as defaultColDef
} from '../../../../../../libs/shared/src';

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
    <FxCard title="Transactions">
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
    </FxCard>
  );
};
