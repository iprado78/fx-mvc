import React, { ChangeEvent, useCallback, useState } from "react";

import { CurrencySymbol } from "@fx/ui-core-data";
import { Button } from "@material-ui/core";

import { FxTransactionDbClientInstance } from "../../transactionDbClient";
import { Col } from "../col/col";
import { Row } from "../row/row";
import { CurrencyAmountInput } from "./currency-amount-input";

const formatNumberForDisplay = (val: number): number => Number(val.toFixed(2));

interface CurrencyExchangeProps {
  base: CurrencySymbol;
  quote: CurrencySymbol;
  rate: number;
  max: number;
  transactionSideEffects?: (() => void)[];
}
export const CurrencyExchange = ({
  base,
  quote,
  rate,
  max,
  transactionSideEffects = [],
}: CurrencyExchangeProps) => {
  const [exchangeAmount, setExchangeAmount] = useState<number | null>(0);
  const scaleReceive = useCallback((x: number) => x * rate, [rate]);

  const exceedReserves = exchangeAmount > max;

  const valueSetter = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      if (Number.isNaN(value)) {
        setExchangeAmount(null);
      } else if (e.target.name === 'pay') {
        setExchangeAmount(value);
      } else if (e.target.name === 'receive') {
        setExchangeAmount(value / rate);
      }
    },
    [rate]
  );

  const handleExchange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof exchangeAmount === 'number') {
      try {
        await FxTransactionDbClientInstance.updatPairReserves(
          {
            amount: exchangeAmount,
            currency: base,
          },
          {
            amount: exchangeAmount * rate,
            currency: quote,
          }
        );

        [
          ...transactionSideEffects,
          () => setExchangeAmount(0),
        ].forEach(sideEffect => sideEffect());
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <form onSubmit={handleExchange}>
      <Row>
        <Col>
          <CurrencyAmountInput
            error={exceedReserves}
            errorMessage={
              exceedReserves ? 'Pay amount exceeds reserves' : undefined
            }
            label="Pay"
            max={max}
            value={exchangeAmount && formatNumberForDisplay(exchangeAmount)}
            valueSetter={valueSetter}
            name="pay"
            currency={base}
          />
        </Col>
        <Col>
          <CurrencyAmountInput
            label="Receive"
            max={scaleReceive(max)}
            value={
              exchangeAmount &&
              formatNumberForDisplay(scaleReceive(exchangeAmount))
            }
            valueSetter={valueSetter}
            currency={quote}
            name="receive"
          />
        </Col>
      </Row>
      <Row>
        <Col />
        <Col>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={exceedReserves}
          >
            Exchange
          </Button>
        </Col>
      </Row>
    </form>
  );
};
