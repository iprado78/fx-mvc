import moment from 'moment';
import {
  HistoricalRatesResponse,
  apiFunctions,
  LiveRateResponse,
  CurrencySymbol,
  IntradayRatesResponse,
  CacheKeyParams,
  toCacheKey
} from '../../../shared/src';

const toJson = (res: Response): Promise<unknown> => res.json();
const BASE_URL = 'https://www.alphavantage.co/query';
const API_KEY = 'SEDS91YKBFMKI360';

const historicalCacheInvalid = (cache: HistoricalRatesResponse) =>
  moment
    .utc(cache['Meta Data']['5. Last Refreshed'].split(' ')[0])
    .isBefore(moment(), 'day');

const intradayCacheInvalid = (cache: IntradayRatesResponse) =>
  moment
    .utc(cache['Meta Data']['4. Last Refreshed'])
    .isBefore(moment().subtract(5, 'minutes'));

const toHistoricalCacheKey = (params: CacheKeyParams) =>
  `historical:${toCacheKey(params)}`;
const toIntradayCacheKey = (params: CacheKeyParams) =>
  `intraday:${toCacheKey(params)}`;

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
  private static sendReq(apiFunction: apiFunctions, options) {
    return window.fetch(this.buildUrl(apiFunction, options));
  }
  private static sendHistoricalRatesReq(base, quote) {
    return AlphaVantageClient.sendReq('FX_DAILY', {
      from_symbol: base,
      to_symbol: quote,
      outputsize: 'full'
    }).then(toJson) as Promise<HistoricalRatesResponse>;
  }
  private static sendLiveRateReq(base: CurrencySymbol, quote: CurrencySymbol) {
    return AlphaVantageClient.sendReq('CURRENCY_EXCHANGE_RATE', {
      from_currency: base,
      to_currency: quote
    }).then(toJson) as Promise<LiveRateResponse>;
  }
  private static sendIntradayRatesReq(base, quote) {
    return AlphaVantageClient.sendReq('FX_INTRADAY', {
      from_symbol: base,
      to_symbol: quote,
      outputsize: 'full',
      interval: '5min'
    }).then(toJson) as Promise<IntradayRatesResponse>;
  }
  /**
   * ToDo: figure out how to remove duplication while getting type safety
   */
  static async getHistoricalRates(base: CurrencySymbol, quote: CurrencySymbol) {
    const cacheKey = toHistoricalCacheKey({ base, quote });
    let persistentCache: HistoricalRatesResponse = JSON.parse(
      localStorage.getItem(cacheKey)
    );
    if (!persistentCache || historicalCacheInvalid(persistentCache)) {
      try {
        const res = await AlphaVantageClient.sendHistoricalRatesReq(
          base,
          quote
        );
        /**
         * Handle API limit
         */
        if (res['Meta Data']) {
          persistentCache = res;
        }
      } catch (e) {
        console.log(e);
      }
      localStorage.setItem(cacheKey, JSON.stringify(persistentCache));
    }
    return persistentCache;
  }
  static getLiveRate(base: CurrencySymbol, quote: CurrencySymbol) {
    return AlphaVantageClient.sendLiveRateReq(base, quote);
  }
  /**
   * ToDo: figure out how to remove duplication while getting type safety
   */
  static async getIntradayRates(base: CurrencySymbol, quote: CurrencySymbol) {
    const cacheKey = toIntradayCacheKey({ base, quote });
    let persistentCache: IntradayRatesResponse = JSON.parse(
      localStorage.getItem(cacheKey)
    );
    if (!persistentCache || intradayCacheInvalid(persistentCache)) {
      try {
        const res = await AlphaVantageClient.sendIntradayRatesReq(base, quote);
        /**
         * Handle API limit
         */
        if (res['Meta Data']) {
          persistentCache = res;
        }
      } catch (e) {
        console.log(e);
      }
      localStorage.setItem(cacheKey, JSON.stringify(persistentCache));
    }
    return persistentCache;
  }
}
