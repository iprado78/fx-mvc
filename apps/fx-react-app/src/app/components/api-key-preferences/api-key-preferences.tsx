import React, { useState, useCallback, useMemo } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import moment from 'moment';

import { API_SETTINGS, DEFAULT_API_KEY } from '@fx/ui-core-data';
import { PreferencesText } from './preferences-dialog-text';
import { PersonalKeyPreferences } from './personal-key-preferences';
import { SharedKeyPreferences } from './shared-key-preferences';

export const PERSONAL_KEY_PREF = 'personal-key-pref';
export const PROMPT_PREF = 'prompt-pref';
export const NUM_DAYS_TO_PROMPT = 'num-days-to-prompt';
export const PERSONAL_KEY = 'personal-key';

const shouldPrompt = (): boolean =>
  API_SETTINGS.key === DEFAULT_API_KEY &&
  API_SETTINGS.nextPrompt !== 'never' &&
  moment().isAfter(moment(API_SETTINGS.nextPrompt));

export const ApiKeyPreferences = () => {
  console.log(API_SETTINGS.key, API_SETTINGS.nextPrompt);
  const [open, setOpen] = useState(shouldPrompt());
  const [personalKeyPref, setPersonalKeyPref] = useState(true);
  const [personalKey, setPersonalKey] = useState('');
  const [promptPref, setPromptPref] = useState('after');
  const [numDaysToPrompt, setNumDaysToPrompt] = useState(10);

  const promptAfterTimestamp = useMemo(
    () =>
      moment()
        .add(numDaysToPrompt, 'days')
        .toISOString(),
    [numDaysToPrompt]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      const { name: fieldName, value } = event.target;
      switch (fieldName) {
        case PERSONAL_KEY_PREF:
          setPersonalKeyPref(JSON.parse(value));
          break;
        case PROMPT_PREF:
          setPromptPref(value);
          break;
        case NUM_DAYS_TO_PROMPT:
          setNumDaysToPrompt(JSON.parse(value));
          break;
        case PERSONAL_KEY:
          setPersonalKey(value);
          break;
        default:
          throw new Error('Attempting to set unknown API key preference');
      }
    },
    [setPersonalKeyPref, setPromptPref, setNumDaysToPrompt, setPersonalKey]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let newKey, newNextPrompt;
    if (personalKeyPref) {
      newKey = personalKey;
      newNextPrompt = new Date().toISOString();
    } else {
      newKey = DEFAULT_API_KEY;
      newNextPrompt =
        promptPref === 'never' ? promptPref : promptAfterTimestamp;
    }
    API_SETTINGS.key = localStorage.ALPHA_VANTAGE_API_KEY = newKey;
    API_SETTINGS.nextPrompt = localStorage.ALPHA_VANTAGE_API_KEY_NEXT_PROMPT = newNextPrompt;
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
      <DialogTitle>API key prefrences</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <PreferencesText />
          <PersonalKeyPreferences
            personalKeyPref={personalKeyPref}
            personalKey={personalKey}
            handleChange={handleChange}
          />
          {!personalKeyPref && (
            <SharedKeyPreferences
              promptPref={promptPref}
              handleChange={handleChange}
              numDaysToPrompt={numDaysToPrompt}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={personalKeyPref && !personalKey}
          >
            Save Preferences
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
