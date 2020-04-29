import React, { ReactNode } from 'react';
import { FxCard } from '../fx-card/fx-card';
import {
  LiveRate,
  CurrencySymbol
} from '../../../../../../libs/shared/src/lib/types';
import { Moment } from 'moment';
import { formatLiveRateForView } from '../../../../../../libs/shared/src/lib/functions';
import { CurrencyReserves } from '../currency-reserves/currency-reserves';
import { CurrencyExchange } from '../currency-exchange/currency-exchange';
import { makeStyles } from '@material-ui/core';

interface RealTimeCardProps {
  liveRate: LiveRate<number, Moment>;
  base: CurrencySymbol;
  quote: CurrencySymbol;
  children: ReactNode;
}

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '500px'
  }
}));
export const RealTimeCard = ({
  liveRate,
  base,
  quote,
  children
}: RealTimeCardProps) => {
  const { rate, refreshTime } = formatLiveRateForView(liveRate, base, quote);
  const classes = useStyles();
  return (
    <FxCard
      title={rate}
      subtitle={`Live rate @ ${refreshTime}`}
      className={classes.root}
    >
      {children}
    </FxCard>
  );
};
