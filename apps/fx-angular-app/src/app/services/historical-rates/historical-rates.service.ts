import { Injectable } from '@angular/core';
import { DatesService } from '../dates/dates.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CurrencySelectionsService } from '../currency-selections/currency-selections.service';
import {
  FxEntries,
  toFilterCacheKey,
  enttriesFromHistoricalServerResponse,
  filterFromDates
} from '../../../../../../libs/ui-data/src';
import { AlphaVantageClient } from '../../../../../../libs/alpha-vantage-client/src/lib/alpha-vantage-client';

@Injectable({
  providedIn: 'root'
})
export class HistoricalRates {
  private entries = new BehaviorSubject<FxEntries>([]);
  private filterCache = new Map<string, FxEntries>();
  fxEntries = this.entries.asObservable();

  constructor(
    private dateService: DatesService,
    private currencySelection: CurrencySelectionsService
  ) {
    combineLatest([
      this.dateService.dates,
      this.currencySelection.base,
      this.currencySelection.quote
    ]).subscribe(async ([dates, base, quote]) => {
      const filterCacheKey = toFilterCacheKey({
        dates,
        base,
        quote
      });
      if (!this.filterCache.has(filterCacheKey)) {
        const unfilteredRates = await AlphaVantageClient.getHistoricalRates(
          base,
          quote
        );
        this.filterCache.set(
          filterCacheKey,
          enttriesFromHistoricalServerResponse(unfilteredRates).filter(
            filterFromDates(dates)
          )
        );
      }
      this.entries.next(this.filterCache.get(filterCacheKey));
    });
  }
}
