import moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  API_SETTINGS,
  DEFAULT_API_KEY,
  NUM_DAYS_TO_PROMPT,
  PERSONAL_KEY,
  PERSONAL_KEY_PREF,
  PROMPT_PREF
} from '@fx/ui-core-data';

import { APP_TITLE } from '../../shared';

@Component({
  selector: 'fx-api-key-preferences',
  templateUrl: './api-key-preferences.component.html',
  styleUrls: ['./api-key-preferences.component.css']
})
export class ApiKeyPreferencesComponent implements OnInit {
  title = APP_TITLE;

  apiKeyPrefForm = this.fb.group({
    personalKeyPref: PERSONAL_KEY_PREF.defaultValue,
    personalKey: PERSONAL_KEY.defaultValue,
    promptPref: PROMPT_PREF.defaultValue,
    numDaysToPrompt: NUM_DAYS_TO_PROMPT.defaultValue
  });

  personalKeyPref = {
    id: PERSONAL_KEY_PREF.id,
    label: PERSONAL_KEY_PREF.label,
    options: PERSONAL_KEY_PREF.options
  };
  personalKey = {
    id: PERSONAL_KEY.id,
    label: PERSONAL_KEY.label
  };
  promptPref = {
    id: PROMPT_PREF.id,
    label: PROMPT_PREF.label,
    options: PROMPT_PREF.options
  };
  numDaysToPrompt = {
    id: NUM_DAYS_TO_PROMPT.id,
    label: NUM_DAYS_TO_PROMPT.label
  };

  constructor(
    private dialogRef: MatDialogRef<ApiKeyPreferencesComponent>,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    console.log('fired');
    const {
      personalKeyPref,
      personalKey,
      promptPref,
      numDaysToPrompt
    } = this.apiKeyPrefForm.controls;
    let newKey, newNextPrompt;
    if (personalKeyPref.value) {
      newKey = personalKey.value;
      newNextPrompt = new Date().toISOString();
    } else {
      newKey = DEFAULT_API_KEY;
      newNextPrompt =
        promptPref.value === 'never'
          ? promptPref.value
          : moment()
              .add(numDaysToPrompt.value, 'days')
              .toISOString();
    }
    API_SETTINGS.key = localStorage.ALPHA_VANTAGE_API_KEY = newKey;
    API_SETTINGS.nextPrompt = localStorage.ALPHA_VANTAGE_API_KEY_NEXT_PROMPT = newNextPrompt;
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
