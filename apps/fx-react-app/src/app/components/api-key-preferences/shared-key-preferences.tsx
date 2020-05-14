import React from "react";

import { NUM_DAYS_TO_PROMPT, PROMPT_PREF } from "@fx/ui-core-data";
import {
    FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup
} from "@material-ui/core";

import { PreferencesControlWrap } from "./preferences-control-wrap";

interface SharedKeyPreferencesProps {
  promptPref: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  numDaysToPrompt: number;
  radioClasses: Record<string, any>;
}

export const SharedKeyPreferences = ({
  promptPref,
  handleChange,
  numDaysToPrompt,
  radioClasses,
}: SharedKeyPreferencesProps) => (
  <PreferencesControlWrap>
    <FormControl component="fieldset">
      <FormLabel component="legend">{PROMPT_PREF.label}</FormLabel>
      <RadioGroup
        aria-label={PROMPT_PREF.id}
        name={PROMPT_PREF.id}
        value={promptPref}
        onChange={handleChange}
        row
      >
        {PROMPT_PREF.options.map(({ label, value }) => (
          <FormControlLabel
            className={radioClasses.root}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
    {promptPref === 'after' && (
      <FormControl focused>
        <FormLabel htmlFor={NUM_DAYS_TO_PROMPT.id} component="legend">
          {NUM_DAYS_TO_PROMPT.label}
        </FormLabel>
        <Input
          type="number"
          id={NUM_DAYS_TO_PROMPT.id}
          name={NUM_DAYS_TO_PROMPT.id}
          value={numDaysToPrompt}
          style={{ width: 30 }}
        />
      </FormControl>
    )}
  </PreferencesControlWrap>
);
