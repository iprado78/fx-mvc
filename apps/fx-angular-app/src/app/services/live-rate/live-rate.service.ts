import { Injectable } from '@angular/core';
import { CurrencySelectionsService } from '../currency-selections/currency-selections.service';
import { combineLatest, BehaviorSubject } from 'rxjs';
import {
  defaultLiveRate,
  LiveRate,
  rateFromServerResponse
} from '@fx/ui-core-data';
import { Moment } from 'moment';
import { AlphaVantageClient } from '@fx/alpha-vantage-client';

@Injectable({
  providedIn: 'root'
})
export class LiveRateService {
  private r = new BehaviorSubject<LiveRate<number, Moment>>(defaultLiveRate);
  rate = this.r.asObservable();

  constructor(private currencySelection: CurrencySelectionsService) {
    combineLatest([
      this.currencySelection.base,
      this.currencySelection.quote
    ]).subscribe(async ([base, quote]) => {
      const {
        ['Realtime Currency Exchange Rate']: res
      } = await AlphaVantageClient.getLiveRate(base, quote);
      this.r.next(rateFromServerResponse(res));
    });
  }
}
