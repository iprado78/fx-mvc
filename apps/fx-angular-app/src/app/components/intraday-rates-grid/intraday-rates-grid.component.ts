import { Component, OnInit } from '@angular/core';
import { IntradayRates } from '../../services/intraday-rates/intraday-rates.service';
import { combineLatest } from 'rxjs';
import {
  currencyFormatterFactory,
  toPipDiff,
  utcStringToLocal
} from '../../shared/functions';
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'fx-intraday-grid',
  templateUrl: './intraday-rates-grid.component.html',
  styleUrls: ['./intraday-rates-grid.component.css']
})
export class IntradayRatesGridComponent implements OnInit {
  defaultColDef: ColDef = {
    sortable: true,
    cellClass: 'align-right',
    headerClass: 'align-right',
    width: 125
  };
  columnDefs: ColDef[] = [
    {
      headerName: 'Time',
      field: 'time'
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
    private intradayRatesService: IntradayRates,
    private selectedCurrencyService: CurrencySelectionsService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.selectedCurrencyService.quote,
      this.intradayRatesService.fxEntries
    ]).subscribe({
      next: ([quote, entries]) => {
        const format = currencyFormatterFactory(quote);
        this.rowData = entries.map(([time, { open, high, low, close }]) => ({
          time: utcStringToLocal(time),
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
