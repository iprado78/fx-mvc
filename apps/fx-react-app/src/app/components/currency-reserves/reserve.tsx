import React, { useState, useEffect } from 'react';

import { Typography } from '@material-ui/core';
import { useCurrencyFormatter } from '../../hooks/useCurrencyFormatter';
import { CurrencyReserve } from '../../../../../../libs/ui-data/src/lib/types';

interface ReserveProps {
  reserve: CurrencyReserve<number>;
}
export const Reserve = ({ reserve }: ReserveProps) => {
  const formatter = useCurrencyFormatter(reserve.code, 2);
  return (
    <>
      <Typography component="span" style={{ fontWeight: 600 }}>
        {reserve.code}
      </Typography>
      : &nbsp;
      <Typography component="span">{formatter(reserve.reserves)}</Typography>
    </>
  );
};
