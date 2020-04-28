import React, { ChangeEvent } from 'react';
import { CurrencySymbol } from '../../../../../../libs/shared/src/lib/types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, Input } from '@material-ui/core';

interface CurrencyAmountInputProps {
  label: string;
  value: number | null;
  currency: CurrencySymbol;
  name: string;
  valueSetter: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const CurrencyAmountInput = ({
  label,
  value,
  valueSetter,
  currency,
  name
}: CurrencyAmountInputProps) => {
  const lowercaseLabel = label.toLowerCase();
  const id = `${lowercaseLabel}-input`;

  return (
    <FormControl>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        type="number"
        name={name}
        id={id}
        value={value ?? ''}
        onChange={valueSetter}
      />
    </FormControl>
  );
};
