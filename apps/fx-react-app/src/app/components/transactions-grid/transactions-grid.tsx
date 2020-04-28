import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { FxCard } from '../fx-card/fx-card';
import { transactionsToGridProjection } from '../../../../../../libs/shared/src/lib/functions';
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
