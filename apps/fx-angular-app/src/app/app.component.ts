import { Component, OnInit } from '@angular/core';
import { ViewState, shouldPrompt } from '@fx/ui-core-data';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
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

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    if (shouldPrompt()) {
      this.dialog.open(ApiKeyPreferencesComponent, {
        width: '500px'
      });
    }
  }
}
