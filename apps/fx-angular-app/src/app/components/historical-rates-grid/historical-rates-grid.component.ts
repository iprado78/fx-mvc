import { Component, OnInit } from '@angular/core';
import { HistoricalRates } from '../../services/historical-rates/historical-rates.service';
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { combineLatest } from 'rxjs';
import {
  rowDataFromFxEntries,
  currencyFormatterFactory
} from '../../../../../../libs/ui-data/src/lib/functions';
import {
  historicalRatesGridDefaultColDef,
  hisotricalRatesGridColumnDefs
} from '../../../../../../libs/ui-data/src/lib/constants/grids';

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
