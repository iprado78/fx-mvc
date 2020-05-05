import moment from 'moment';

import {
  HistoricalRatesResponse,
  apiFunctions,
  LiveRateResponse,
  CurrencySymbol,
  IntradayRatesResponse
} from '@fx/ui-core-data';

const BASE_URL = 'https://www.alphavantage.co/query';
const API_KEY = 'SEDS91YKBFMKI360';
const HISTORICAL_REQ_ERR_MESSAGE = 'Failed historical rates request';
const INTRADAY_REQ_ERR_MESSAGE = 'Failed intraday rates request';
const LIVE_RATE_REQ_ERR_MESSAGE = 'Failed live rate request';

const intradayCacheIsValid = (cache: IntradayRatesResponse) =>
  !moment
    .utc(cache['Meta Data']['4. Last Refreshed'])
    .isBefore(moment().subtract(10, 'minutes'));

const historicalCacheIsValid = (cache: HistoricalRatesResponse) =>
  !moment
    .utc(cache['Meta Data']['5. Last Refreshed'])
    .isBefore(moment().startOf('day'));

const liveRateCacheIsValid = (cache: LiveRateResponse) =>
  !moment
    .utc(cache['Realtime Currency Exchange Rate']['6. Last Refreshed'])
    .isBefore(moment().subtract(1, 'minute'));

/**
 * ToDo: abstract common functionality in request while preserving type safety.
 */
export class AlphaVantageClient {
  constructor() {}
  private static buildUrl(apiFunction: apiFunctions, options) {
    const searchParams = new URLSearchParams({
      function: apiFunction,
      apikey: API_KEY,
      ...options
    });
    return `${BASE_URL}?${searchParams.toString()}`;
  }

  private static buildReq(apiFunction: apiFunctions, options) {
    return new Request(this.buildUrl(apiFunction, options));
  }

  static async getHistoricalRates(base: CurrencySymbol, quote: CurrencySymbol) {
    const historicalCache = await caches.open('historical-rates');
    const request = this.buildReq('FX_DAILY', {
      from_symbol: base,
      to_symbol: quote
    });
    const cachedResponse = await historicalCache.match(request);
    if (cachedResponse) {
      const resolvedCachedResponse: HistoricalRatesResponse = await cachedResponse.json();
      if (historicalCacheIsValid(resolvedCachedResponse)) {
        return resolvedCachedResponse;
      }
    }
    try {
      const res = await window.fetch(request.clone());
      const resolvedResponse: HistoricalRatesResponse = await res
        .clone()
        .json();
      if (!res.ok || !resolvedResponse['Meta Data']) {
        throw new Error(HISTORICAL_REQ_ERR_MESSAGE);
      }
      historicalCache.put(request, res);
      return resolvedResponse;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  static async getLiveRate(base: CurrencySymbol, quote: CurrencySymbol) {
    const liveRateCache = await caches.open('live-rate');
    const request = this.buildReq('CURRENCY_EXCHANGE_RATE', {
      from_currency: base,
      to_currency: quote
    });

    const cachedResponse = await liveRateCache.match(request);
    if (cachedResponse) {
      const resolvedCacheResponse: LiveRateResponse = await cachedResponse.json();
      if (liveRateCacheIsValid(resolvedCacheResponse)) {
        return resolvedCacheResponse;
      }
    }
    try {
      const res = await window.fetch(request.clone());
      const resolvedResponse: LiveRateResponse = await res.clone().json();
      if (!res.ok || !resolvedResponse['Realtime Currency Exchange Rate']) {
        throw new Error(LIVE_RATE_REQ_ERR_MESSAGE);
      }
      liveRateCache.put(request, res);
      return resolvedResponse;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  static async getIntradayRates(base: CurrencySymbol, quote: CurrencySymbol) {
    const intradayCache = await caches.open('intraday-rates');
    const request = this.buildReq('FX_INTRADAY', {
      from_symbol: base,
      to_symbol: quote,
      interval: '5min'
    });
    const cachedResponse = await intradayCache.match(request);
    if (cachedResponse) {
      const resolvedCacheResponse: IntradayRatesResponse = await cachedResponse.json();
      if (intradayCacheIsValid(resolvedCacheResponse)) {
        return resolvedCacheResponse;
      }
    }
    try {
      const res = await window.fetch(request.clone());
      const resolvedResponse: IntradayRatesResponse = await res.clone().json();
      if (!res.ok || !resolvedResponse['Meta Data']) {
        throw new Error(INTRADAY_REQ_ERR_MESSAGE);
      }
      intradayCache.put(request, res);
      return resolvedResponse;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
