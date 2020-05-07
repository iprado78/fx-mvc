import React from 'react';
import { PreferencesControlWrap } from './preferences-control-wrap';
import { PROMPT_PREF, NUM_DAYS_TO_PROMPT } from './api-key-preferences';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Input,
  FormControlLabel
} from '@material-ui/core';

interface SharedKeyPreferencesProps {
  promptPref: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  numDaysToPrompt: number;
}

export const SharedKeyPreferences = ({
  promptPref,
  handleChange,
  numDaysToPrompt
}: SharedKeyPreferencesProps) => (
  <PreferencesControlWrap>
    <FormControl component="fieldset">
      <FormLabel component="legend">Prompt again</FormLabel>
      <RadioGroup
        aria-label={PROMPT_PREF}
        name={PROMPT_PREF}
        value={promptPref}
        onChange={handleChange}
        row
      >
        <FormControlLabel value={'never'} control={<Radio />} label="Never" />
        <FormControlLabel value="after" control={<Radio />} label={'After'} />
      </RadioGroup>
    </FormControl>
    {promptPref === 'after' && (
      <FormControl focused>
        <FormLabel htmlFor={NUM_DAYS_TO_PROMPT} component="legend">
          Days
        </FormLabel>
        <Input
          type="number"
          id={NUM_DAYS_TO_PROMPT}
          name={NUM_DAYS_TO_PROMPT}
          value={numDaysToPrompt}
          style={{ width: 30 }}
        />
      </FormControl>
    )}
  </PreferencesControlWrap>
);
