import { Injectable } from '@angular/core';
import { CurrencySelectionsService } from '../currency-selections/currency-selections.service';
import { combineLatest, BehaviorSubject } from 'rxjs';
import {
  LiveRate,
  LiveRateResponse,
  LiveRateResponseData
} from '../../shared/types';
import { defaultLiveRate } from '../../shared/constants';
import { toCacheKey } from '../../shared/functions';
import moment from 'moment';
import { AlphavantageClientService } from '../alpha-vantage-client/alphavantage-client.service';

const cacheInvalid = (cache: LiveRate<number, Date>) =>
  moment(cache.refreshTime).isBefore(moment().subtract(2, 'minutes'));

const rateFromServerResponse = (
  res: LiveRateResponseData
): LiveRate<number, Date> => ({
  rate: Number(res['5. Exchange Rate']),
  refreshTime: new Date(res['6. Last Refreshed'])
});

@Injectable({
  providedIn: 'root'
})
export class LiveRateService {
  private rateCache = new Map<string, LiveRate<number, Date>>();
  private r = new BehaviorSubject<LiveRate<number, Date>>(defaultLiveRate);
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
      let cachedRate: LiveRate<number, Date> = this.rateCache.get(cacheKey);
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
