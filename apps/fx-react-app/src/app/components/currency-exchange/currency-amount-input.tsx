import React, { ChangeEvent } from "react";

import { CurrencySymbol } from "@fx/ui-core-data";
import { FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";

interface CurrencyAmountInputProps {
  label: string;
  value: number | null;
  currency: CurrencySymbol;
  max: number;
  name: string;
  error?: boolean;
  errorMessage?: string | undefined;
  valueSetter: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const CurrencyAmountInput = ({
  label,
  value,
  valueSetter,
  currency,
  error,
  errorMessage,
  max,
  name,
}: CurrencyAmountInputProps) => {
  const id = `${label.toLowerCase()}-input`;
  return (
    <FormControl error={error}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        inputProps={{ max }}
        type="number"
        name={name}
        id={id}
        value={value ?? ''}
        onChange={valueSetter}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};
