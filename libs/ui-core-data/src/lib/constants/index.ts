export * from './grids';
export * from './charts';

import {
  CurrencyReserve,
  CurrencySymbol,
  CurrencyLocale,
  LiveRate,
  ApiSettigs
} from '../types';

import { Moment } from 'moment';
const moment: Moment = require('moment'); // Hack required for tests

export const defaultBase: CurrencySymbol = 'USD';

export const defaultQuote: CurrencySymbol = 'EUR';

export const defaultBaseReserves: CurrencyReserve<number> = {
  code: defaultBase,
  reserves: 0
};

export const defaultQuoteReserves: CurrencyReserve<number> = {
  code: defaultQuote,
  reserves: 0
};

export const defaultLiveRate: LiveRate<number, Moment> = {
  rate: 0,
  refreshTime: moment.utc()
};

export const currencySymbolLocaleMap: Map<
  CurrencySymbol,
  CurrencyLocale
> = new Map([
  ['USD', 'en-US'],
  ['EUR', 'de-De'],
  ['GBP', 'en-GB'],
  ['JPY', 'ja-JP']
]);

export const DEFAULT_API_KEY = 'SEDS91YKBFMKI360';

export const API_SETTINGS: ApiSettigs = {
  key: localStorage.ALPHA_VANTAGE_API_KEY ?? DEFAULT_API_KEY,
  nextPrompt:
    localStorage.ALPHA_VANTAGE_API_KEY_NEXT_PROMPT ?? new Date().toISOString()
};

export const PERSONAL_KEY_PREF = {
  label: 'Use',
  id: 'personal-key-pref',
  defaultValue: true,
  options: [
    {
      label: 'Shared Key',
      value: false
    },
    {
      label: 'Personal Key',
      value: true
    }
  ]
};

export const PERSONAL_KEY = {
  id: 'personal-key',
  label: 'API Key',
  defaultValue: ''
};

export const PROMPT_PREF = {
  id: 'prompt-pref',
  label: 'Prompt again',
  defaultValue: 'after',
  options: [
    {
      label: 'Never',
      value: 'never'
    },
    {
      label: 'After',
      value: 'after'
    }
  ]
};

export const NUM_DAYS_TO_PROMPT = {
  id: 'num-days-to-prompt',
  label: 'Days',
  defaultValue: 10
};
