import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { toCacheKey } from '../../shared/functions';
import { Observable } from 'rxjs';
import {
  CurrencySymbol,
  IntradayRatesResponse,
  CacheKeyParams
} from '../../shared/types';
import {
  HistoricalRatesResponse,
  apiFunctions,
  LiveRateResponse
} from '../../shared/types';

const BASE_URL = 'https://www.alphavantage.co/query';
const API_KEY = 'SEDS91YKBFMKI360';

const historicalCacheInvalid = (cache: HistoricalRatesResponse) =>
  moment(cache['Meta Data']['5. Last Refreshed'].split(' ')[0]).isBefore(
    moment(),
    'day'
  );

const intradayCacheInvalid = (cache: IntradayRatesResponse) =>
  moment(cache['Meta Data']['4. Last Refreshed']).isBefore(
    moment().subtract(5, 'minutes')
  );

const toHistoricalCacheKey = (params: CacheKeyParams) =>
  `historical:${toCacheKey(params)}`;
const toIntradayCacheKey = (params: CacheKeyParams) =>
  `intraday:${toCacheKey(params)}`;

@Injectable({
  providedIn: 'root'
})
export class AlphavantageClientService {
  constructor(private http: HttpClient) {}
  private buildUrl(apiFunction: apiFunctions, options) {
    const searchParams = new URLSearchParams({
      function: apiFunction,
      apikey: API_KEY,
      ...options
    });
    return `${BASE_URL}?${searchParams.toString()}`;
  }
  private sendReq(apiFunction: apiFunctions, options) {
    return this.http.get(this.buildUrl(apiFunction, options));
  }
  private sendHistoricalRatesReq(base, quote) {
    return this.sendReq('FX_DAILY', {
      from_symbol: base,
      to_symbol: quote,
      outputsize: 'full'
    }) as Observable<HistoricalRatesResponse>;
  }
  private sendLiveRateReq(base: CurrencySymbol, quote: CurrencySymbol) {
    return this.sendReq('CURRENCY_EXCHANGE_RATE', {
      from_currency: base,
      to_currency: quote
    }) as Observable<LiveRateResponse>;
  }
  private sendIntradayRatesReq(base, quote) {
    return this.sendReq('FX_INTRADAY', {
      from_symbol: base,
      to_symbol: quote,
      outputsize: 'full',
      interval: '5min'
    }) as Observable<IntradayRatesResponse>;
  }
  /**
   * ToDo: figure out how to remove duplication while getting type safety
   */
  async getHistoricalRates(base: CurrencySymbol, quote: CurrencySymbol) {
    const cacheKey = toHistoricalCacheKey({ base, quote });
    let persistentCache: HistoricalRatesResponse = JSON.parse(
      localStorage.getItem(cacheKey)
    );
    if (!persistentCache || historicalCacheInvalid(persistentCache)) {
      try {
        persistentCache = await this.sendHistoricalRatesReq(
          base,
          quote
        ).toPromise();
      } catch (e) {
        console.log(e);
      }
      localStorage.setItem(cacheKey, JSON.stringify(persistentCache));
    }
    return persistentCache;
  }
  getLiveRate(base, quote) {
    return this.sendLiveRateReq(base, quote);
  }
  /**
   * ToDo: figure out how to remove duplication while getting type safety
   */
  async getIntradayRates(base: CurrencySymbol, quote: CurrencySymbol) {
    const cacheKey = toIntradayCacheKey({ base, quote });
    let persistentCache: IntradayRatesResponse = JSON.parse(
      localStorage.getItem(cacheKey)
    );
    if (!persistentCache || intradayCacheInvalid(persistentCache)) {
      try {
        persistentCache = await this.sendIntradayRatesReq(
          base,
          quote
        ).toPromise();
      } catch (e) {
        console.log(e);
      }
      localStorage.setItem(cacheKey, JSON.stringify(persistentCache));
    }
    return persistentCache;
  }
}
