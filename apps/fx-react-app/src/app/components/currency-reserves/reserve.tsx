import React, { useState, useEffect, useMemo } from 'react';
import { FxTransactionDbClientInstance } from '../../transactionDbClient';
import { currencyFormatterFactory } from '../../../../../../libs/shared/src/lib/functions';
import { Typography } from '@material-ui/core';
import { useCurrencyFormatter } from '../../hooks/useCurrencyFormatter';
import {
  CurrencyReserve,
  CurrencySymbol
} from '../../../../../../libs/shared/src/lib/types';

const useReserveEffect = (currencySymbol: CurrencySymbol, reserveSetter) =>
  useEffect(() => {
    FxTransactionDbClientInstance.getReserves(currencySymbol).then(
      reserveSetter
    );
  }, [currencySymbol]);

interface ReserveProps {
  currency: CurrencySymbol;
  defaultReserve: CurrencyReserve<number>;
}
export const Reserve = ({ currency, defaultReserve }: ReserveProps) => {
  const [reserve, setReserve] = useState<CurrencyReserve<number>>(
    defaultReserve
  );
  useReserveEffect(currency, setReserve);
  const formatter = useCurrencyFormatter(currency);
  return (
    <>
      <Typography component="span">{reserve.code}</Typography>
      <Typography component="span">{formatter(reserve.reserves)}</Typography>
    </>
  );
};
