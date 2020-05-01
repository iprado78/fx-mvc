import { Component } from '@angular/core';
import { ViewState } from '@fx/ui-core-data';

@Component({
  selector: 'fx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  viewState: ViewState = 'intraday';
  setViewState(state: ViewState) {
    this.viewState = state;
  }
}
