import React, { ReactNode } from 'react';
import { Moment } from 'moment';
import {
  LiveRate,
  CurrencySymbol,
  formatLiveRateForView
} from '@fx/ui-core-data';
import { FxCard } from '../fx-card/fx-card';

interface RealTimeCardProps {
  liveRate: LiveRate<number, Moment>;
  base: CurrencySymbol;
  quote: CurrencySymbol;
  children: ReactNode;
}

export const RealTimeCard = ({
  liveRate,
  base,
  quote,
  children
}: RealTimeCardProps) => {
  const { rate, refreshTime } = formatLiveRateForView(liveRate, base, quote);
  return (
    <FxCard title={rate} subtitle={`Rate @ ${refreshTime}`}>
      {children}
    </FxCard>
  );
};
