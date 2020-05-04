import { Component, OnInit } from '@angular/core';
import {
  transactionsGridDefaultColDef,
  transactionsGridColumnDefs,
  Transaction,
  transactionsToGridProjection
} from '@fx/ui-core-data';
import { TransactionsService } from '../../services/transactions/transactions.service';

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
      this.rowData = transactions.map(transactionsToGridProjection);
    });
  }
}
