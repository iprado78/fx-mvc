import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core';
import { CurrencySymbol } from '../../../../../../libs/shared/src/lib/types';

interface CurrencySelectProps {
  label: string;
  value: CurrencySymbol;
  options: CurrencySymbol[];
  valueSetter: React.Dispatch<React.SetStateAction<CurrencySymbol>>;
}

const useStyles = makeStyles(() => ({
  formControl: {
    marginLeft: 20
  }
}));

export const CurrencySelect = ({
  label,
  value,
  options,
  valueSetter
}: CurrencySelectProps) => {
  const lowercaseLabel = label.toLowerCase();
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        labelId={`${lowercaseLabel}-currency-label`}
        id={`${lowercaseLabel}-currency-select`}
        value={value}
        onChange={(e: React.ChangeEvent<{ value: CurrencySymbol }>) =>
          valueSetter(e.target.value)
        }
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
