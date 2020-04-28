import React from 'react';
import { FxCard } from '../fx-card/fx-card';
import {
  LiveRate,
  CurrencySymbol
} from '../../../../../../libs/shared/src/lib/types';
import { Moment } from 'moment';
import { formatLiveRateForView } from '../../../../../../libs/shared/src/lib/functions';
import { CurrencyReserves } from '../currency-reserves/currency-reserves';
import { CurrencyExchange } from '../currency-exchange/currency-exchange';

interface RealTimeCardProps {
  liveRate: LiveRate<number, Moment>;
  base: CurrencySymbol;
  quote: CurrencySymbol;
}
export const RealTimeCard = ({ liveRate, base, quote }: RealTimeCardProps) => {
  const { rate, refreshTime } = formatLiveRateForView(liveRate, base, quote);
  return (
    <FxCard title={rate} subtitle={`Live rate @ ${refreshTime}`}>
      <CurrencyReserves base={base} quote={quote} />
      <CurrencyExchange base={base} quote={quote} rate={liveRate.rate} />
    </FxCard>
  );
};
