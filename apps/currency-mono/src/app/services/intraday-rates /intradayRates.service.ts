import { Injectable } from '@angular/core';
import { DatesService, Dates } from '../dates/dates.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CurrencySelectionsService } from '../currency-selections/currency-selections.service';
import { CurrencyEntry, CurrencyEntries } from '../../shared/types';
import { toCacheKey } from '../../shared/functions';
import { AlphavantageClientService } from '../alpha-vantage-client/alphavantage-client.service';
import { IntradayRatesResponse } from '../../shared/types';
import { CurrencyEntryValue } from '../../shared/types';

const enttriesFromServerResponse = (res: IntradayRatesResponse) =>
  Object.entries(res['Time Series FX (5min)']).map(([date, rest]) => [
    date,
    Object.keys(rest).reduce(
      (accum, key) => ({ ...accum, [key.split('. ')[1]]: Number(rest[key]) }),
      {} as CurrencyEntryValue
    )
  ]) as CurrencyEntries;

@Injectable({
  providedIn: 'root'
})
export class IntradayRates {
  private entries = new BehaviorSubject<CurrencyEntries>([]);
  currencyEntries = this.entries.asObservable();

  constructor(
    private currencySelection: CurrencySelectionsService,
    private fromAlphaVantage: AlphavantageClientService
  ) {
    combineLatest([
      this.currencySelection.base,
      this.currencySelection.quote
    ]).subscribe(async ([base, quote]) => {
      const rates = await this.fromAlphaVantage.getIntradayRates(base, quote);
      this.entries.next(enttriesFromServerResponse(rates));
    });
  }
}
