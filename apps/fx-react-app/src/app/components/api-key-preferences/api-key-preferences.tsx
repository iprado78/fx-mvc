import React, { useState, useCallback, useMemo } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles
} from '@material-ui/core';
import moment from 'moment';

import {
  API_SETTINGS,
  DEFAULT_API_KEY,
  shouldPrompt,
  PERSONAL_KEY_PREF,
  PROMPT_PREF,
  PERSONAL_KEY,
  NUM_DAYS_TO_PROMPT
} from '@fx/ui-core-data';
import { PreferencesText } from './preferences-dialog-text';
import { PersonalKeyPreferences } from './personal-key-preferences';
import { SharedKeyPreferences } from './shared-key-preferences';

const useStyles = makeStyles({
  root: {
    width: '150px'
  }
});

export const ApiKeyPreferences = () => {
  const [open, setOpen] = useState(shouldPrompt());
  const [personalKeyPref, setPersonalKeyPref] = useState(
    PERSONAL_KEY_PREF.defaultValue
  );
  const [personalKey, setPersonalKey] = useState(PERSONAL_KEY.defaultValue);
  const [promptPref, setPromptPref] = useState(PROMPT_PREF.defaultValue);
  const [numDaysToPrompt, setNumDaysToPrompt] = useState(
    NUM_DAYS_TO_PROMPT.defaultValue
  );
  const radioClasses = useStyles();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      const { name: fieldName, value } = event.target;
      switch (fieldName) {
        case PERSONAL_KEY_PREF.id:
          setPersonalKeyPref(JSON.parse(value));
          break;
        case PROMPT_PREF.id:
          setPromptPref(value);
          break;
        case NUM_DAYS_TO_PROMPT.id:
          setNumDaysToPrompt(JSON.parse(value));
          break;
        case PERSONAL_KEY.id:
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
        promptPref === 'never'
          ? promptPref
          : moment()
              .add(numDaysToPrompt, 'days')
              .toISOString();
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
            radioClasses={radioClasses}
            personalKeyPref={personalKeyPref}
            personalKey={personalKey}
            handleChange={handleChange}
          />
          {!personalKeyPref && (
            <SharedKeyPreferences
              promptPref={promptPref}
              radioClasses={radioClasses}
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
