import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { transactionsToGridProjection } from '../../../../../../libs/shared/src/lib/functions';
import { Transaction } from '../../../../../../libs/shared/src/lib/types';

@Component({
  selector: 'fx-transactions-grid',
  templateUrl: './transactions-grid.component.html',
  styleUrls: ['./transactions-grid.component.css']
})
export class TransactionsGridComponent implements OnInit {
  defaultColDef: ColDef = {
    sortable: true,
    cellClass: 'align-right',
    headerClass: 'align-right',
    width: 120
  };
  columnDefs: ColDef[] = [
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

  rowData: Transaction<string>[] = [];

  constructor(private transactionService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionService.transactions.subscribe(transactions => {
      this.rowData = transactions.reverse().map(transactionsToGridProjection);
    });
  }
}
