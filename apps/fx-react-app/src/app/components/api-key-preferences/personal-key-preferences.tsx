import React from "react";

import { PERSONAL_KEY, PERSONAL_KEY_PREF } from "@fx/ui-core-data";
import {
    FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup
} from "@material-ui/core";

import { PreferencesControlWrap } from "./preferences-control-wrap";

interface PersonalKeyPreferencesProps {
  personalKeyPref: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  personalKey: string;
  radioClasses: Record<string, any>;
}

export const PersonalKeyPreferences = ({
  personalKeyPref,
  handleChange,
  personalKey,
  radioClasses,
}: PersonalKeyPreferencesProps) => (
  <PreferencesControlWrap>
    <FormControl component="fieldset">
      <FormLabel component="legend">{PERSONAL_KEY_PREF.label}</FormLabel>
      <RadioGroup
        aria-label={PERSONAL_KEY_PREF.id}
        name={PERSONAL_KEY_PREF.id}
        value={personalKeyPref}
        onChange={handleChange}
        row
      >
        {PERSONAL_KEY_PREF.options.map(({ label, value }) => (
          <FormControlLabel
            className={radioClasses.root}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
    {personalKeyPref && (
      <FormControl focused>
        <FormLabel htmlFor={PERSONAL_KEY.id} component="legend">
          {PERSONAL_KEY.id}
        </FormLabel>
        <Input
          name={PERSONAL_KEY.id}
          id={PERSONAL_KEY.id}
          value={personalKey}
          onChange={handleChange}
        />
      </FormControl>
    )}
  </PreferencesControlWrap>
);
