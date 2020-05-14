import React, { useMemo } from "react";

import {
    Transaction, transactionsGridColumnDefs as columnDefs,
    transactionsGridDefaultColDef as defaultColDef, transactionsToGridProjection
} from "@fx/ui-core-data";

import { AgGridWrapper } from "../ag-grid-wrapper/ag-grid-wrapper";

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
