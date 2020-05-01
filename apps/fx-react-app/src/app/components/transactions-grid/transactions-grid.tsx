import React, { useMemo } from 'react';
import { transactionsToGridProjection } from '../../../../../../libs/ui-data/src/lib/functions';
import { AgGridWrapper } from '../ag-grid-wrapper/ag-grid-wrapper';
import {
  Transaction,
  transactionsGridColumnDefs as columnDefs,
  transactionsGridDefaultColDef as defaultColDef
} from '../../../../../../libs/ui-data/src';

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
