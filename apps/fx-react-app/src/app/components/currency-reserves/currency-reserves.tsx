import React from 'react';
import { CurrencySymbol } from '../../../../../../libs/shared/src/lib/types';
import { Row } from '../row/row';
import { Reserve } from './reserve';

import {
  defaultBaseReserves,
  defaultQuoteReserves
} from '../../../../../../libs/shared/src/lib/constants';
import { Col } from '../col/col';

interface CurrencyReservesProps {
  base: CurrencySymbol;
  quote: CurrencySymbol;
}
export const CurrencyReserves = ({ base, quote }: CurrencyReservesProps) => (
  <Row>
    <Col>
      <Reserve currency={base} defaultReserve={defaultBaseReserves} />
    </Col>
    <Col>
      <Reserve currency={quote} defaultReserve={defaultQuoteReserves} />
    </Col>
  </Row>
);
