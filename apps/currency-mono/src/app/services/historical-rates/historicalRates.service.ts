import { Injectable } from '@angular/core';
import { DatesService, Dates } from '../dates/dates.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CurrencySelectionsService, CurrencyOption } from '../currency-selections/currency-selections.service';

const filterFromDates = (dates: Dates) => ([dateString]: CurrencyEntry) =>  {
  const asDate = new Date(dateString);
  return asDate >= dates.startDate && asDate <= dates.endDate
}

interface CacheKeyParams {
  dates: Dates;
  source: CurrencyOption;
  target: CurrencyOption;
}

const toCacheKey = ({dates, source, target }: CacheKeyParams) => 
  `${dates.startDate.toString()}:${dates.endDate.toString()}:${source}:${target}`

const enttriesFromServerResponse = (res) => 
  Object
    .entries(res["Time Series FX (Daily)"])
    .map(([date, rest]) => [
      date, 
      Object.keys(rest).reduce(
        (accum, key) => ({ ...accum, [key.split('. ')[1]]: Number(rest[key]) } ), {}
      )
    ]) as CurrencyEntries;

type CurrencyEntry = [string, Record<string, number>]
type CurrencyEntries = CurrencyEntry[]

@Injectable({
  providedIn: 'root'
})
export class HistoricalRates {
  private entries = new BehaviorSubject<CurrencyEntries>([]);
  private responseCache = new Map<string, CurrencyEntries>();
  currencyEntries = this.entries.asObservable();

  private getFromServer (source, target) {
    return this.http.get(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${source}&to_symbol=${target}&outputsize=full&apikey=SEDS91YKBFMKI360`)
  }
  constructor(private dateService: DatesService, private http: HttpClient, private currencySelection: CurrencySelectionsService) { 
    combineLatest([this.dateService.dates, this.currencySelection.source, this.currencySelection.target])
      .subscribe(async ([dates, source, target]) => {
        const cacheKey = toCacheKey({dates, source, target});
        if (!this.responseCache.has(cacheKey)) {
          const res = await this.getFromServer(source, target).toPromise();
          this.responseCache.set(cacheKey, enttriesFromServerResponse(res).filter(filterFromDates(dates)))
        }
        this.entries.next(this.responseCache.get(cacheKey));
      })
  }
}
