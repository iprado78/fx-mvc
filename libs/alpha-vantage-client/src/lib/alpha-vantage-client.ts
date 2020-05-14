import moment from "moment";

import {
    API_SETTINGS, apiFunctions, CurrencySymbol, HistoricalRatesResponse, IntradayRatesResponse,
    LiveRateResponse
} from "@fx/ui-core-data";

interface IntradayRatesReqOptions {
  cacheKey: 'intraday-rates';
  apiFunction: 'FX_INTRADAY';
  buildReqOptions: {
    from_symbol: CurrencySymbol;
    to_symbol: CurrencySymbol;
    interval: '5min';
  };
  errorMessage: string;
  successfulResponseKey: 'Meta Data';
}

interface LiveRateReqOptions {
  cacheKey: 'live-rate';
  apiFunction: 'CURRENCY_EXCHANGE_RATE';
  buildReqOptions: {
    from_currency: CurrencySymbol;
    to_currency: CurrencySymbol;
  };
  errorMessage: string;
  successfulResponseKey: 'Realtime Currency Exchange Rate';
}

interface HistoricalReqOptions {
  cacheKey: 'historical-rates';
  apiFunction: 'FX_DAILY';
  buildReqOptions: {
    from_symbol: CurrencySymbol;
    to_symbol: CurrencySymbol;
  };
  errorMessage: string;
  successfulResponseKey: 'Meta Data';
}

type RatesReqOptions =
  | IntradayRatesReqOptions
  | LiveRateReqOptions
  | HistoricalReqOptions;

type RatesRes<T extends RatesReqOptions> = T extends IntradayRatesReqOptions
  ? IntradayRatesResponse
  : T extends LiveRateReqOptions
  ? LiveRateResponse
  : T extends HistoricalReqOptions
  ? HistoricalRatesResponse
  : never;

const BASE_URL = 'https://www.alphavantage.co/query';
const API_KEY = API_SETTINGS.key;
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

export class AlphaVantageClient {
  constructor() {}
  private static buildUrl(apiFunction: apiFunctions, options) {
    const searchParams = new URLSearchParams({
      function: apiFunction,
      apikey: API_KEY,
      ...options,
    });
    return `${BASE_URL}?${searchParams.toString()}`;
  }

  private static buildReq(apiFunction: apiFunctions, options) {
    return new Request(this.buildUrl(apiFunction, options));
  }

  static async getHistoricalRates(base: CurrencySymbol, quote: CurrencySymbol) {
    return this.getRates<HistoricalRatesResponse, HistoricalReqOptions>(
      historicalCacheIsValid,
      {
        cacheKey: 'historical-rates',
        apiFunction: 'FX_DAILY',
        errorMessage: HISTORICAL_REQ_ERR_MESSAGE,
        buildReqOptions: {
          from_symbol: base,
          to_symbol: quote,
        },
        successfulResponseKey: 'Meta Data',
      }
    );
  }

  static async getLiveRate(base: CurrencySymbol, quote: CurrencySymbol) {
    return this.getRates<LiveRateResponse, LiveRateReqOptions>(
      liveRateCacheIsValid,
      {
        cacheKey: 'live-rate',
        apiFunction: 'CURRENCY_EXCHANGE_RATE',
        buildReqOptions: {
          from_currency: base,
          to_currency: quote,
        },
        errorMessage: LIVE_RATE_REQ_ERR_MESSAGE,
        successfulResponseKey: 'Realtime Currency Exchange Rate',
      }
    );
  }

  static async getIntradayRates(base: CurrencySymbol, quote: CurrencySymbol) {
    return this.getRates<IntradayRatesResponse, IntradayRatesReqOptions>(
      intradayCacheIsValid,
      {
        cacheKey: 'intraday-rates',
        apiFunction: 'FX_INTRADAY',
        buildReqOptions: {
          from_symbol: base,
          to_symbol: quote,
          interval: '5min',
        },
        errorMessage: INTRADAY_REQ_ERR_MESSAGE,
        successfulResponseKey: 'Meta Data',
      }
    );
  }

  private static async getRates<
    T extends RatesRes<Q>,
    Q extends RatesReqOptions
  >(cacheValidator: (res: T) => boolean, options: Q) {
    const cache = await caches.open(options.cacheKey);
    const request = this.buildReq(options.apiFunction, options.buildReqOptions);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      const resolvedCacheResponse: T = await cachedResponse.json();
      if (cacheValidator(resolvedCacheResponse)) {
        return resolvedCacheResponse;
      }
    }
    try {
      const res = await window.fetch(request.clone());
      const resolvedResponse: T = await res.clone().json();
      if (!res.ok || !resolvedResponse[options.successfulResponseKey]) {
        throw new Error(options.errorMessage);
      }
      cache.put(request, res);
      return resolvedResponse;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
