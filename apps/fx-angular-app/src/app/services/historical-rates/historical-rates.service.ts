import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import {
  FxEntries,
  toFilterCacheKey,
  enttriesFromHistoricalServerResponse,
  filterFromDates
} from '@fx/ui-core-data';
import { AlphaVantageClient } from '@fx/alpha-vantage-client';
import { CurrencySelectionsService } from '../currency-selections/currency-selections.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricalRates {
  private entries = new BehaviorSubject<FxEntries>([]);
  fxEntries = this.entries.asObservable();

  constructor(private currencySelection: CurrencySelectionsService) {
    combineLatest([
      this.currencySelection.base,
      this.currencySelection.quote
    ]).subscribe(async ([base, quote]) => {
      this.entries.next(
        enttriesFromHistoricalServerResponse(
          await AlphaVantageClient.getHistoricalRates(base, quote)
        )
      );
    });
  }
}
