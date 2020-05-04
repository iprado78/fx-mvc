import React, { useMemo } from 'react';
import { AgGridWrapper } from '../ag-grid-wrapper/ag-grid-wrapper';
import {
  Transaction,
  transactionsToGridProjection,
  transactionsGridColumnDefs as columnDefs,
  transactionsGridDefaultColDef as defaultColDef
} from '@fx/ui-core-data';

interface TransactionsGridProps {
  transactions: Transaction<number>[];
}

export const TransactionsGrid = ({ transactions }: TransactionsGridProps) => {
  const rowData = useMemo(
    () => transactions.map(transactionsToGridProjection),
    [transactions]
  );
  return (
    <AgGridWrapper
      title="Transactions"
      rowData={rowData}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
    />
  );
};
