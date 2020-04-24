import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { currencyFormatterFactory } from '../../shared/functions';
import { Transaction } from '../../shared/types';

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
      this.rowData = transactions
        .reverse()
        .map(
          ({
            payAmount,
            payCurrency,
            receiveAmount,
            receiveCurrency,
            payCurrencyBalance,
            receiveCurrencyBalance,
            timestamp
          }) => {
            const payFormatter = currencyFormatterFactory(payCurrency, 2);
            const receiveFormatter = currencyFormatterFactory(
              receiveCurrency,
              2
            );
            return {
              timestamp,
              payCurrency,
              receiveCurrency,
              payAmount: payFormatter(payAmount),
              receiveAmount: receiveFormatter(receiveAmount),
              payCurrencyBalance: payFormatter(payCurrencyBalance),
              receiveCurrencyBalance: receiveFormatter(receiveCurrencyBalance)
            };
          }
        );
    });
  }
}
