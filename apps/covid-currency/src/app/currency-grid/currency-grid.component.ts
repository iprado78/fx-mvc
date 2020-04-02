import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service'

@Component({
  selector: 'covid-currency-grid',
  templateUrl: './currency-grid.component.html',
  styleUrls: ['./currency-grid.component.css']
})
export class CurrencyGridComponent implements OnInit {
  columnDefs = []
  rowData = []

  constructor(private service: CurrencyService) { }

  ngOnInit(): void {
    this.columnDefs = this.service.getFxCols();
    this.rowData = this.service.getFxRows();
  }
}
