import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';
import { CurrencyPairSelect } from '../currency-pair-select/currency-pair-select';
import { CurrencySymbol } from '../../../../../../libs/shared/src/lib/types';

export interface HeaderProps {
  baseCurrency: CurrencySymbol;
  quoteCurrency: CurrencySymbol;
  setBaseCurrency: React.Dispatch<React.SetStateAction<CurrencySymbol>>;
  setQuoteCurrency: React.Dispatch<React.SetStateAction<CurrencySymbol>>;
}

export const Header = (props: HeaderProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <div />
        <Typography variant="h4" component="h1" style={{ flexGrow: 1 }}>
          React Fx Demo
        </Typography>
        <CurrencyPairSelect {...props} />
      </Toolbar>
    </AppBar>
  );
};
