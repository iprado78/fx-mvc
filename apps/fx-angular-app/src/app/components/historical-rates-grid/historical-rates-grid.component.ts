import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import {
  historicalRatesGridDefaultColDef,
  hisotricalRatesGridColumnDefs,
  rowDataFromFxEntries,
  currencyFormatterFactory
} from '@fx/ui-core-data';
import { HistoricalRates } from '../../services/historical-rates/historical-rates.service';
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';

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
