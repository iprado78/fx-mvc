import React from 'react';
import { Typography } from '@material-ui/core';
import { CurrencyReserve } from '@fx/ui-core-data';
import { useCurrencyFormatter } from '../../hooks/useCurrencyFormatter';

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
