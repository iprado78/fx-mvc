import React, { useMemo } from 'react';
import { transactionsToGridProjection } from '../../../../../../libs/shared/src/lib/functions';
import { AgGridWrapper } from '../ag-grid-wrapper/ag-grid-wrapper';
import {
  Transaction,
  transactionsGridColumnDefs as columnDefs,
  transactionsGridDefaultColDef as defaultColDef
} from '../../../../../../libs/shared/src';

interface TransactionsGridProps {
  transactions: Transaction<number>[];
}

export const TransactionsGrid = ({ transactions }: TransactionsGridProps) => {
  const rowData = useMemo(
    () => transactions.reverse().map(transactionsToGridProjection),
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
