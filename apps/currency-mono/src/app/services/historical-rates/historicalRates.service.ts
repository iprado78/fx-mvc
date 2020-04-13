import { Injectable } from '@angular/core';
import { DatesService, Dates } from '../dates/dates.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  CurrencySelectionsService,
  CurrencyOption
} from '../currency-selections/currency-selections.service';

const filterFromDates = (dates: Dates) => ([dateString]: CurrencyEntry) => {
  const asDate = new Date(dateString);
  return asDate >= dates.startDate && asDate <= dates.endDate;
};

interface CacheKeyParams {
  dates: Dates;
  base: CurrencyOption;
  quote: CurrencyOption;
}

type CurrencyEntry = [string, Record<string, number>];
export type CurrencyEntries = CurrencyEntry[];

const toCacheKey = ({ dates, base, quote }: CacheKeyParams) =>
  `${dates.startDate.toString()}:${dates.endDate.toString()}:${base}:${quote}`;

const enttriesFromServerResponse = res =>
  Object.entries(res['Time Series FX (Daily)']).map(([date, rest]) => [
    date,
    Object.keys(rest).reduce(
      (accum, key) => ({ ...accum, [key.split('. ')[1]]: Number(rest[key]) }),
      {}
    )
  ]) as CurrencyEntries;

@Injectable({
  providedIn: 'root'
})
export class HistoricalRates {
  private entries = new BehaviorSubject<CurrencyEntries>([]);
  private responseCache = new Map<string, CurrencyEntries>();
  currencyEntries = this.entries.asObservable();

  private getFromServer(base, quote) {
    return this.http.get(
      `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${base}&to_symbol=${quote}&outputsize=full&apikey=SEDS91YKBFMKI360`
    );
  }
  constructor(
    private dateService: DatesService,
    private http: HttpClient,
    private currencySelection: CurrencySelectionsService
  ) {
    combineLatest([
      this.dateService.dates,
      this.currencySelection.base,
      this.currencySelection.quote
    ]).subscribe(async ([dates, base, quote]) => {
      const cacheKey = toCacheKey({ dates, base, quote } as CacheKeyParams);
      if (!this.responseCache.has(cacheKey)) {
        const res = await this.getFromServer(base, quote).toPromise();
        this.responseCache.set(
          cacheKey,
          enttriesFromServerResponse(res).filter(filterFromDates(dates))
        );
      }
      this.entries.next(this.responseCache.get(cacheKey));
    });
  }
}
