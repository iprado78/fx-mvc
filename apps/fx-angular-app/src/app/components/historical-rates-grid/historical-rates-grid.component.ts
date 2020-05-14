import { combineLatest } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import {
  currencyFormatterFactory,
  hisotricalRatesGridColumnDefs,
  historicalRatesGridDefaultColDef,
  rowDataFromFxEntries
} from '@fx/ui-core-data';

import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { HistoricalRates } from '../../services/historical-rates/historical-rates.service';

@Component({
  selector: 'fx-historical-grid',
  templateUrl: './historical-rates-grid.component.html'
})
export class HistoricalRatesGridComponent implements OnInit {
  defaultColDef = historicalRatesGridDefaultColDef;
  columnDefs = hisotricalRatesGridColumnDefs;

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
        this.rowData = rowDataFromFxEntries(
          entries,
          currencyFormatterFactory(quote)
        );
      }
    });
  }
}
