import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { AlphaVantageClient } from '@fx/alpha-vantage-client';
import {
  FxEntries,
  enttriesFromIntradayServerResponse
} from '@fx/ui-core-data';
import { CurrencySelectionsService } from '../currency-selections/currency-selections.service';

@Injectable({
  providedIn: 'root'
})
export class IntradayRates {
  private entries = new BehaviorSubject<FxEntries>([]);
  fxEntries = this.entries.asObservable();

  constructor(private currencySelection: CurrencySelectionsService) {
    combineLatest([
      this.currencySelection.base,
      this.currencySelection.quote
    ]).subscribe(async ([base, quote]) => {
      this.entries.next(
        enttriesFromIntradayServerResponse(
          await AlphaVantageClient.getIntradayRates(base, quote)
        )
      );
    });
  }
}
