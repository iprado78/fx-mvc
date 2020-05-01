import React from 'react';
import { CurrencyReserve } from '../../../../../../libs/ui-data/src/lib/types';
import { Row } from '../row/row';
import { Reserve } from './reserve';

import { Col } from '../col/col';

interface CurrencyReservesProps {
  base: CurrencyReserve<number>;
  quote: CurrencyReserve<number>;
}
export const CurrencyReserves = ({ base, quote }: CurrencyReservesProps) => (
  <Row>
    <Col>
      <Reserve reserve={base} />
    </Col>
    <Col>
      <Reserve reserve={quote} />
    </Col>
  </Row>
);
