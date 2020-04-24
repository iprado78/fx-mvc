import { Injectable } from '@angular/core';
import { DatesService, Dates } from '../dates/dates.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CurrencySelectionsService } from '../currency-selections/currency-selections.service';
import {
  FxEntry,
  FxEntries,
  HistoricalRatesCacheKeyParams
} from '../../shared/types';
import { toCacheKey } from '../../shared/functions';
import { AlphavantageClientService } from '../alpha-vantage-client/alphavantage-client.service';
import { HistoricalRatesResponse, FxEntryValue } from '../../shared/types';

const filterFromDates = (dates: Dates) => ([dateString]: FxEntry) => {
  const asDate = new Date(dateString);
  return asDate >= dates.startDate && asDate <= dates.endDate;
};

const toFilterCacheKey = ({ dates, ...rest }: HistoricalRatesCacheKeyParams) =>
  `${dates.startDate.toString()}:${dates.endDate.toString()}:${toCacheKey(
    rest
  )}`;

const enttriesFromServerResponse = (res: HistoricalRatesResponse) =>
  Object.entries(res['Time Series FX (Daily)']).map(([date, rest]) => [
    date,
    Object.keys(rest).reduce(
      (accum, key) => ({ ...accum, [key.split('. ')[1]]: Number(rest[key]) }),
      {} as FxEntryValue
    )
  ]) as FxEntries;

@Injectable({
  providedIn: 'root'
})
export class HistoricalRates {
  private entries = new BehaviorSubject<FxEntries>([]);
  private filterCache = new Map<string, FxEntries>();
  fxEntries = this.entries.asObservable();

  constructor(
    private dateService: DatesService,
    private currencySelection: CurrencySelectionsService,
    private fromAlphaVantage: AlphavantageClientService
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
        const unfilteredRates = await this.fromAlphaVantage.getHistoricalRates(
          base,
          quote
        );
        this.filterCache.set(
          filterCacheKey,
          enttriesFromServerResponse(unfilteredRates).filter(
            filterFromDates(dates)
          )
        );
      }
      this.entries.next(this.filterCache.get(filterCacheKey));
    });
  }
}
