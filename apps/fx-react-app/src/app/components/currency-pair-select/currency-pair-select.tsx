import React, { useMemo } from 'react';
import { CurrencySymbol } from '../../../../../../libs/shared/src/lib/types';
import { currencySymbolLocaleMap } from '../../../../../../libs/shared/src/lib/constants';
import { HeaderProps as CurrencyPairSelectProps } from '../header/header';
import { CurrencySelect } from './currency-select';

const currencyOptions = Array.from(currencySymbolLocaleMap.keys());

const filterOptions = (option: CurrencySymbol) =>
  currencyOptions.filter(opt => opt !== option);

const useFilteredOptions = (excluded: CurrencySymbol) =>
  useMemo(() => filterOptions(excluded), [excluded]);

export const CurrencyPairSelect = ({
  baseCurrency,
  quoteCurrency,
  setBaseCurrency,
  setQuoteCurrency
}: CurrencyPairSelectProps) => {
  return (
    <>
      <CurrencySelect
        label="Base"
        value={baseCurrency}
        valueSetter={setBaseCurrency}
        options={useFilteredOptions(quoteCurrency)}
      />
      <CurrencySelect
        label="Quote"
        value={quoteCurrency}
        valueSetter={setQuoteCurrency}
        options={useFilteredOptions(baseCurrency)}
      />
    </>
  );
};
