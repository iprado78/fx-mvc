import React, { useState, useCallback, ChangeEvent } from 'react';
import {
  CurrencyReserve,
  CurrencySymbol
} from '../../../../../../libs/shared/src/lib/types';
import { Row } from '../row/row';
import { Col } from '../col/col';
import { makeStyles } from '@material-ui/core';
import { CurrencyAmountInput } from './currency-amount-input';

const formatNumberForDisplay = (val: number): number => Number(val.toFixed(2));

interface CurrencyExchangeProps {
  base: CurrencySymbol;
  quote: CurrencySymbol;
  rate: number;
}
export const CurrencyExchange = ({
  base,
  quote,
  rate
}: CurrencyExchangeProps) => {
  const [exchangeAmount, setExchangeAmount] = useState<number | null>(0);
  const valueSetter = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      if (Number.isNaN(value)) {
        setExchangeAmount(null);
      } else if (e.target.name === 'pay') {
        setExchangeAmount(value);
      } else {
        setExchangeAmount(value / rate);
      }
    },
    [rate]
  );
  return (
    <Row>
      <Col>
        <CurrencyAmountInput
          label="Pay"
          value={exchangeAmount && formatNumberForDisplay(exchangeAmount)}
          valueSetter={valueSetter}
          name="pay"
          currency={base}
        />
        <CurrencyAmountInput
          label="Receive"
          value={
            exchangeAmount && formatNumberForDisplay(exchangeAmount * rate)
          }
          valueSetter={valueSetter}
          currency={quote}
          name="receive"
        />
      </Col>
    </Row>
  );
};
