import { Component, OnInit } from '@angular/core';
import { HistoricalRates } from '../../services/historical-rates/historicalRates.service'
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { combineLatest } from 'rxjs';

const toBasis = (end: number, start: number) => Math.round(10_0000 * (end - start) / start)

@Component({
  selector: 'currency-mono-grid',
  templateUrl: './currency-grid.component.html',
  styleUrls: ['./currency-grid.component.css']
})
export class CurrencyGridComponent implements OnInit {

  defaultColDef = {
    sortable: true,
    cellClass: 'align-right',
    headerClass: 'align-right'
  }

  columnDefs = [
    {
     headerName: "Date",
     field: "date",
   },
   {
     headerName: "Open",
     field: "open",

   },
   {
     headerName: "Close",
     field: "close",
   },
   {
     headerName: "Daily Diff (BPS)",
     field: "diff",
   },
   {
     headerName: "High",
     field: "high",
   },
   {
     headerName: "Low",
     field: "low",
   },
   {
     headerName: "Daily Volatility (BPS)",
     field: "volatility",
   }
   ]

   rowData = []

  constructor(private historicalRatesService: HistoricalRates, private selectedCurrenciesService: CurrencySelectionsService) { }

  ngOnInit(): void {
    combineLatest([this.selectedCurrenciesService.target, this.historicalRatesService.currencyEntries]).subscribe({
      next: ([target, entries]) => {
        const { format } = new Intl.NumberFormat(this.selectedCurrenciesService.currencyToLocale.get(target), { style: 'currency', currency: target, maximumSignificantDigits: 5, minimumSignificantDigits: 5 })
        this.rowData = entries.map(([date, { open, high, low, close}]) => ({
            date,
            open: format(open),
            close: format(close),
            diff: toBasis(close, open),
            high: format(high),
            low: format(low),
            volatility: toBasis(high, low)
        }))
    }})
  }
}