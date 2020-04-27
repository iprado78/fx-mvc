import React, { useMemo } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { CurrencySymbol } from '../../../../../../libs/shared/src/lib/types';
import { currencySymbolLocaleMap } from '../../../../../../libs/shared/src/lib/constants';
import { HeaderProps as CurrencyPairSelectProps } from '../header/header';

const currencyOptions = Array.from(currencySymbolLocaleMap.keys());
const filterOptions = (option: CurrencySymbol) =>
  currencyOptions.filter(opt => opt !== option);

const renderOptions = (options: CurrencySymbol[]) =>
  options.map(option => (
    <MenuItem key={option} value={option}>
      {option}
    </MenuItem>
  ));

export const CurrencyPairSelect = ({
  baseCurrency,
  quoteCurrency,
  setBaseCurrency,
  setQuoteCurrency
}: CurrencyPairSelectProps) => {
  const baseOptions = useMemo(() => filterOptions(quoteCurrency), [
    quoteCurrency
  ]);
  const quoteOptions = useMemo(() => filterOptions(baseCurrency), [
    baseCurrency
  ]);
  return (
    <>
      <FormControl>
        <InputLabel id="base-currency-label">Base</InputLabel>
        <Select
          labelId="base-currency-label"
          id="base-currency-select"
          value={baseCurrency}
          onChange={e => setBaseCurrency(e.target.value as CurrencySymbol)}
        >
          {renderOptions(baseOptions)}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Quote</InputLabel>
        <Select
          labelId="quote-currency-label"
          id="quote-currency-select"
          value={quoteCurrency}
          onChange={e => setQuoteCurrency(e.target.value as CurrencySymbol)}
        >
          {renderOptions(quoteOptions)}
        </Select>
      </FormControl>
    </>
  );
};
