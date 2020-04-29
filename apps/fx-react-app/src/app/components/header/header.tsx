import React, { ReactNode } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, makeStyles } from '@material-ui/core';

export interface HeaderProps {
  children: ReactNode;
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

export const Header = ({ children }: HeaderProps) => {
  const classes = useStyles();
  return (
    <AppBar position="static" color="transparent">
      <Toolbar className={classes.root}>
        <Typography variant="h4" component="h1" className={classes.h4}>
          React Fx Demo
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};
