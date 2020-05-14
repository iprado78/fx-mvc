import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { shouldPrompt, ViewState } from '@fx/ui-core-data';

import { ApiKeyPreferencesComponent } from './components/api-key-preferences/api-key-preferences.component';

@Component({
  selector: 'fx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  viewState: ViewState = 'intraday';
  setViewState(state: ViewState) {
    this.viewState = state;
  }

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    if (shouldPrompt()) {
      this.dialog.open(ApiKeyPreferencesComponent, {
        width: '500px'
      });
    }
  }
}
