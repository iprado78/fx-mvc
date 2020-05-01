import React, { ReactNode } from 'react';
import { FxCard } from '../fx-card/fx-card';
import {
  LiveRate,
  CurrencySymbol
} from '../../../../../../libs/ui-data/src/lib/types';
import { Moment } from 'moment';
import { formatLiveRateForView } from '../../../../../../libs/ui-data/src/lib/functions';

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
