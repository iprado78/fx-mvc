import { Injectable } from '@angular/core';
import { CurrencySelectionsService } from '../currency-selections/currency-selections.service';
import { HttpClient } from '@angular/common/http';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { LiveRate } from '../../shared/types';
import { defaultLiveRate } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class LiveRateService {
  private r = new BehaviorSubject<LiveRate<number, Date>>(defaultLiveRate);
  rate = this.r.asObservable();

  constructor(
    private currencySelection: CurrencySelectionsService,
    private http: HttpClient
  ) {
    combineLatest([
      this.currencySelection.base,
      this.currencySelection.quote
    ]).subscribe(async ([base, quote]) => {
      const res = (await this.getFromServer(base, quote).toPromise())[
        'Realtime Currency Exchange Rate'
      ];
      this.r.next({
        rate: Number(res['5. Exchange Rate']),
        refreshTime: new Date(res['6. Last Refreshed'])
      });
    });
  }
  private getFromServer(base, quote) {
    return this.http.get(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${base}&to_currency=${quote}&apikey=SEDS91YKBFMKI360`
    );
  }
}
