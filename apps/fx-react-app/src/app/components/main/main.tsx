import React, { useState } from "react";

import { CurrencySymbol, ViewState } from "@fx/ui-core-data";
import { Grid, makeStyles, Tab, Tabs } from "@material-ui/core";

import { useLiveRate } from "../../hooks/useLiveRate";
import { useReserves } from "../../hooks/useReserves";
import { useTransactions } from "../../hooks/useTransactions";
import { CurrencyExchange } from "../currency-exchange/currency-exchange";
import { CurrencyReserves } from "../currency-reserves/currency-reserves";
import { HistoricalTab } from "../historical-tab/historical-tab";
import { IntradayTab } from "../intraday-tab/intraday-tab";
import { RealTimeCard } from "../realtime-card/realtime-card";
import { TabCol } from "../tab-col/tab-col";
import { TransactionsGrid } from "../transactions-grid/transactions-grid";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#ddd',
    padding: '0 8px',
  },
  item: {
    paddingTop: '12px',
  },
}));

interface MainProps {
  baseCurrency: CurrencySymbol;
  quoteCurrency: CurrencySymbol;
}
export const Main = ({ baseCurrency, quoteCurrency }: MainProps) => {
  const [viewState, setViewState] = useState<ViewState>('intraday');
  const { transactions, hydrateTransactions } = useTransactions();
  const liveRate = useLiveRate([baseCurrency, quoteCurrency]);
  const { baseReserves, quoteReserves, hydrateReserves } = useReserves(
    baseCurrency,
    quoteCurrency
  );
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={7}>
        <Tabs
          indicatorColor="primary"
          value={viewState}
          onChange={(_e, value: ViewState) => setViewState(value)}
        >
          <Tab label="Intraday Rates" value="intraday" />
          <Tab label="Historical Rates" value="historical" />
        </Tabs>
        {viewState === 'intraday' && (
          <IntradayTab
            baseCurrency={baseCurrency}
            quoteCurrency={quoteCurrency}
          />
        )}
        {viewState === 'historical' && (
          <HistoricalTab
            baseCurrency={baseCurrency}
            quoteCurrency={quoteCurrency}
          />
        )}
      </Grid>
      <Grid item xs={5} style={{ marginTop: '48px' }}>
        <TabCol
          top={
            <RealTimeCard
              liveRate={liveRate}
              base={baseCurrency}
              quote={quoteCurrency}
            >
              <CurrencyReserves base={baseReserves} quote={quoteReserves} />
              <CurrencyExchange
                max={baseReserves.reserves}
                base={baseCurrency}
                quote={quoteCurrency}
                rate={liveRate.rate}
                transactionSideEffects={[hydrateTransactions, hydrateReserves]}
              />
            </RealTimeCard>
          }
          bottom={<TransactionsGrid transactions={transactions} />}
        />
      </Grid>
    </Grid>
  );
};
