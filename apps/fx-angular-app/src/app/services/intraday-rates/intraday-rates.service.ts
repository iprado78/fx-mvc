import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CurrencySelectionsService } from '../currency-selections/currency-selections.service';
import {
  FxEntryValue,
  IntradayRatesResponse,
  FxEntries,
  FxEntry,
  Times
} from '../../../../../../libs/shared/src';
import { TimesService } from '../times/times.service';
import moment from 'moment';
import { debounceTime } from 'rxjs/operators';
import { AlphaVantageClient } from '../../../../../../libs/alpha-vantage-client/src/lib/alpha-vantage-client';

const enttriesFromServerResponse = (res: IntradayRatesResponse) =>
  Object.entries(res['Time Series FX (5min)']).map(([date, rest]) => [
    date,
    Object.keys(rest).reduce(
      (accum, key) => ({ ...accum, [key.split('. ')[1]]: Number(rest[key]) }),
      {} as FxEntryValue
    )
  ]) as FxEntries;

const filterFromTimes = (times: Times) => ([datetimeString]: FxEntry) => {
  const asMoment = moment.utc(datetimeString).local();
  return (
    asMoment.isSameOrAfter(times.startTime) &&
    asMoment.isSameOrBefore(times.endTime)
  );
};

@Injectable({
  providedIn: 'root'
})
export class IntradayRates {
  private entries = new BehaviorSubject<FxEntries>([]);
  fxEntries = this.entries.asObservable();

  constructor(
    private timesService: TimesService,
    private currencySelection: CurrencySelectionsService
  ) {
    combineLatest([
      this.timesService.times.pipe(debounceTime(5000)),
      this.currencySelection.base,
      this.currencySelection.quote
    ]).subscribe(async ([times, base, quote]) => {
      const rates = await AlphaVantageClient.getIntradayRates(base, quote);
      this.entries.next(
        enttriesFromServerResponse(rates).filter(filterFromTimes(times))
      );
    });
  }
}
