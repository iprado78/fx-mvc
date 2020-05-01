import { Component, OnInit } from '@angular/core';
import { IntradayRates } from '../../services/intraday-rates/intraday-rates.service';
import { combineLatest } from 'rxjs';
import {
  currencyFormatterFactory,
  utcStringToLocal
} from '../../../../../../libs/ui-data/src';
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { rowDataFromFxEntries } from '../../../../../../libs/ui-data/src/lib/functions';
import {
  intradayRatesGridDefaultColDef,
  intradayRatesGridColumnDefs
} from '../../../../../../libs/ui-data/src/lib/constants/grids';

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
