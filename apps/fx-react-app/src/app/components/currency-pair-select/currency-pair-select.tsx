import React, { useMemo } from 'react';
import { CurrencySymbol } from '../../../../../../libs/ui-data/src/lib/types';
import { currencySymbolLocaleMap } from '../../../../../../libs/ui-data/src/lib/constants';
import { CurrencySelect } from './currency-select';

interface CurrencyPairSelectProps {
  baseCurrency: CurrencySymbol;
  quoteCurrency: CurrencySymbol;
  setBaseCurrency: React.Dispatch<React.SetStateAction<CurrencySymbol>>;
  setQuoteCurrency: React.Dispatch<React.SetStateAction<CurrencySymbol>>;
}

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
