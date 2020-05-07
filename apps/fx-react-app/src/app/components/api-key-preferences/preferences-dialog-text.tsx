import React from 'react';
import { DialogContentText } from '@material-ui/core';

export const PreferencesText = () => (
  <>
    <DialogContentText>
      To retrieve exchange rates, you are currently using a default Alpha
      Vantage API key that is limited to 5 requests per minute, 500 requests per
      day. It is shared across users.
    </DialogContentText>
    <DialogContentText>
      You can generate a free a personal key{' '}
      <a href="https://www.alphavantage.co/support/#api-key">here</a> and enter
      below to use with <strong>React Fx Demo</strong> on this browser.
    </DialogContentText>
  </>
);
