import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CurrencySelectionsService } from '../currency-selections/currency-selections.service';
import { CurrencyEntries, Times, CurrencyEntry } from '../../shared/types';
import { AlphavantageClientService } from '../alpha-vantage-client/alphavantage-client.service';
import { IntradayRatesResponse } from '../../shared/types';
import { CurrencyEntryValue } from '../../shared/types';
import { TimesService } from '../times/times.service';
import moment from 'moment';
import { debounceTime } from 'rxjs/operators';

const enttriesFromServerResponse = (res: IntradayRatesResponse) =>
  Object.entries(res['Time Series FX (5min)']).map(([date, rest]) => [
    date,
    Object.keys(rest).reduce(
      (accum, key) => ({ ...accum, [key.split('. ')[1]]: Number(rest[key]) }),
      {} as CurrencyEntryValue
    )
  ]) as CurrencyEntries;

const filterFromTimes = (times: Times) => ([datetimeString]: CurrencyEntry) => {
  const asMoment = moment.utc(datetimeString).local();
  console.log(
    asMoment.format('hh:mm A'),
    asMoment.isSameOrAfter(times.startTime) &&
      asMoment.isSameOrBefore(times.endTime)
  );
  return (
    asMoment.isSameOrAfter(times.startTime) &&
    asMoment.isSameOrBefore(times.endTime)
  );
};

@Injectable({
  providedIn: 'root'
})
export class IntradayRates {
  private entries = new BehaviorSubject<CurrencyEntries>([]);
  currencyEntries = this.entries.asObservable();

  constructor(
    private timesService: TimesService,
    private currencySelection: CurrencySelectionsService,
    private fromAlphaVantage: AlphavantageClientService
  ) {
    combineLatest([
      this.timesService.times.pipe(debounceTime(5000)),
      this.currencySelection.base,
      this.currencySelection.quote
    ]).subscribe(async ([times, base, quote]) => {
      const rates = await this.fromAlphaVantage.getIntradayRates(base, quote);
      this.entries.next(
        enttriesFromServerResponse(rates).filter(filterFromTimes(times))
      );
    });
  }
}
