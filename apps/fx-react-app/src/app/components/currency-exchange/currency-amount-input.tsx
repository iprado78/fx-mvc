import React, { ChangeEvent } from 'react';
import { CurrencySymbol } from '../../../../../../libs/shared/src/lib/types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, Input } from '@material-ui/core';

interface CurrencyAmountInputProps {
  label: string;
  value: number | null;
  currency: CurrencySymbol;
  max: number;
  name: string;
  valueSetter: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const CurrencyAmountInput = ({
  label,
  value,
  valueSetter,
  currency,
  max,
  name
}: CurrencyAmountInputProps) => {
  const id = `${label.toLowerCase()}-input`;
  return (
    <FormControl>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        inputProps={{ max }}
        type="number"
        name={name}
        id={id}
        value={value ?? ''}
        onChange={valueSetter}
      />
    </FormControl>
  );
};
