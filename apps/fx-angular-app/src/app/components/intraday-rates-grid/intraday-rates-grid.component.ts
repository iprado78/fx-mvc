import { combineLatest } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import {
  currencyFormatterFactory,
  intradayRatesGridColumnDefs,
  intradayRatesGridDefaultColDef,
  rowDataFromFxEntries,
  utcStringToLocal
} from '@fx/ui-core-data';

import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { IntradayRates } from '../../services/intraday-rates/intraday-rates.service';

@Component({
  selector: 'fx-intraday-grid',
  templateUrl: './intraday-rates-grid.component.html',
  styleUrls: ['./intraday-rates-grid.component.css']
})
export class IntradayRatesGridComponent implements OnInit {
  defaultColDef = intradayRatesGridDefaultColDef;
  columnDefs = intradayRatesGridColumnDefs;
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
        this.rowData = rowDataFromFxEntries(
          entries,
          currencyFormatterFactory(quote),
          utcStringToLocal
        );
      }
    });
  }
}
