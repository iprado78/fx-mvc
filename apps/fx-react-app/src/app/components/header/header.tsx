import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, makeStyles } from '@material-ui/core';
import { CurrencyPairSelect } from '../currency-pair-select/currency-pair-select';
import { CurrencySymbol } from '../../../../../../libs/shared/src/lib/types';

export interface HeaderProps {
  baseCurrency: CurrencySymbol;
  quoteCurrency: CurrencySymbol;
  setBaseCurrency: React.Dispatch<React.SetStateAction<CurrencySymbol>>;
  setQuoteCurrency: React.Dispatch<React.SetStateAction<CurrencySymbol>>;
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#f5f5f5',
    height: '100px'
  },
  h4: {
    flexGrow: 1,
    fontSize: '20px'
  }
}));

export const Header = (props: HeaderProps) => {
  const classes = useStyles();
  return (
    <AppBar position="static" color="transparent">
      <Toolbar className={classes.root}>
        <Typography variant="h4" component="h1" className={classes.h4}>
          React Fx Demo
        </Typography>
        <CurrencyPairSelect {...props} />
      </Toolbar>
    </AppBar>
  );
};
