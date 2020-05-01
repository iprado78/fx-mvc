import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { transactionsToGridProjection } from '../../../../../../libs/ui-data/src/lib/functions';
import { Transaction } from '../../../../../../libs/ui-data/src/lib/types';
import {
  transactionsGridDefaultColDef,
  transactionsGridColumnDefs
} from '../../../../../../libs/ui-data/src/lib/constants';

@Component({
  selector: 'fx-transactions-grid',
  templateUrl: './transactions-grid.component.html',
  styleUrls: ['./transactions-grid.component.css']
})
export class TransactionsGridComponent implements OnInit {
  defaultColDef = transactionsGridDefaultColDef;
  columnDefs = transactionsGridColumnDefs;

  rowData: Transaction<string>[] = [];

  constructor(private transactionService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionService.transactions.subscribe(transactions => {
      this.rowData = transactions.reverse().map(transactionsToGridProjection);
    });
  }
}
