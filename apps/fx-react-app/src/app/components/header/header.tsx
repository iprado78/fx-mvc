import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" component="h1">
          React Fx Demo
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
