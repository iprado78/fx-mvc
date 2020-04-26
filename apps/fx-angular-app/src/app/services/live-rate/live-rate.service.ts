import { Injectable } from '@angular/core';
import { CurrencySelectionsService } from '../currency-selections/currency-selections.service';
import { combineLatest, BehaviorSubject } from 'rxjs';
import {
  toCacheKey,
  defaultLiveRate,
  LiveRate,
  LiveRateResponseData
} from '../../../../../../libs/shared/src';
import moment, { Moment } from 'moment';
import { AlphavantageClientService } from '../alpha-vantage-client/alphavantage-client.service';

const cacheInvalid = (cache: LiveRate<number, Moment>) =>
  moment.utc(cache.refreshTime).isBefore(moment().subtract(2, 'minutes'));

const rateFromServerResponse = (
  res: LiveRateResponseData
): LiveRate<number, Moment> => ({
  rate: Number(res['5. Exchange Rate']),
  refreshTime: moment.utc(res['6. Last Refreshed'])
});

@Injectable({
  providedIn: 'root'
})
export class LiveRateService {
  private rateCache = new Map<string, LiveRate<number, Moment>>();
  private r = new BehaviorSubject<LiveRate<number, Moment>>(defaultLiveRate);
  rate = this.r.asObservable();

  constructor(
    private currencySelection: CurrencySelectionsService,
    private fromAlphaVantage: AlphavantageClientService
  ) {
    combineLatest([
      this.currencySelection.base,
      this.currencySelection.quote
    ]).subscribe(async ([base, quote]) => {
      const cacheKey = toCacheKey({ base, quote });
      let cachedRate: LiveRate<number, Moment> = this.rateCache.get(cacheKey);
      if (!cachedRate || cacheInvalid(cachedRate)) {
        const {
          ['Realtime Currency Exchange Rate']: res
        } = await this.fromAlphaVantage.getLiveRate(base, quote).toPromise();
        cachedRate = rateFromServerResponse(res);
        this.rateCache.set(cacheKey, cachedRate);
      }
      this.r.next(cachedRate);
    });
  }
}
