import React from 'react';
import { PreferencesControlWrap } from './preferences-control-wrap';
import { PERSONAL_KEY_PREF, PERSONAL_KEY } from './api-key-preferences';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Input,
  Radio
} from '@material-ui/core';

interface PersonalKeyPreferencesProps {
  personalKeyPref: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  personalKey: string;
}

export const PersonalKeyPreferences = ({
  personalKeyPref,
  handleChange,
  personalKey
}: PersonalKeyPreferencesProps) => (
  <PreferencesControlWrap>
    <FormControl component="fieldset">
      <FormLabel component="legend">Use</FormLabel>
      <RadioGroup
        aria-label={PERSONAL_KEY_PREF}
        name={PERSONAL_KEY_PREF}
        value={personalKeyPref}
        onChange={handleChange}
        row
      >
        <FormControlLabel
          value={false}
          control={<Radio />}
          label="Shared Key"
        />
        <FormControlLabel
          value={true}
          control={<Radio />}
          label="Personal Key"
        />
      </RadioGroup>
    </FormControl>
    {personalKeyPref && (
      <FormControl focused>
        <FormLabel htmlFor={PERSONAL_KEY} component="legend">
          API Key
        </FormLabel>
        <Input
          placeholder="Enter key"
          name={PERSONAL_KEY}
          id={PERSONAL_KEY}
          value={personalKey}
          onChange={handleChange}
        />
      </FormControl>
    )}
  </PreferencesControlWrap>
);
