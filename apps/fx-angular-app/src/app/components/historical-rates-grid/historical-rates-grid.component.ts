import { Component, OnInit } from '@angular/core';
import { HistoricalRates } from '../../services/historical-rates/historical-rates.service';
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { combineLatest } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import {
  currencyFormatterFactory,
  toPipDiff
} from '../../../../../../libs/shared/src';

@Component({
  selector: 'fx-historical-grid',
  templateUrl: './historical-rates-grid.component.html'
})
export class HistoricalRatesGridComponent implements OnInit {
  defaultColDef: ColDef = {
    sortable: true,
    cellClass: 'align-right',
    headerClass: 'align-right',
    width: 125
  };
  columnDefs: ColDef[] = [
    {
      headerName: 'Date',
      field: 'date'
    },
    {
      headerName: 'Open',
      field: 'open'
    },
    {
      headerName: 'Close',
      field: 'close'
    },
    {
      headerName: 'Change (Pips)',
      field: 'diff'
    },
    {
      headerName: 'High',
      field: 'high'
    },
    {
      headerName: 'Low',
      field: 'low'
    },
    {
      headerName: 'Range (Pips)',
      field: 'range'
    }
  ];

  rowData = [];

  constructor(
    private historicalRatesService: HistoricalRates,
    private selectedCurrenciesService: CurrencySelectionsService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.selectedCurrenciesService.quote,
      this.historicalRatesService.fxEntries
    ]).subscribe({
      next: ([quote, entries]) => {
        const format = currencyFormatterFactory(quote);
        this.rowData = entries.map(([date, { open, high, low, close }]) => ({
          date,
          open: format(open),
          close: format(close),
          diff: toPipDiff(close, open),
          high: format(high),
          low: format(low),
          range: toPipDiff(high, low)
        }));
      }
    });
  }
}
