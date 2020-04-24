import { Component, OnInit } from '@angular/core';
import { LiveRate, CurrencySymbol } from '../../shared/types';
import { LiveRateService } from '../../services/live-rate/live-rate.service';
import {
  currencyFormatterFactory,
  formatUtcMoment
} from '../../shared/functions';
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { combineLatest } from 'rxjs';
import { sample } from 'rxjs/operators';
import { Moment } from 'moment';

@Component({
  selector: 'fx-realtime-card',
  templateUrl: './live-rate.component.html',
  styleUrls: ['./live-rate.component.css']
})
export class LiveRateComponent implements OnInit {
  liveRate: LiveRate<string, string>;
  constructor(
    private service: LiveRateService,
    private currencySelectionService: CurrencySelectionsService
  ) {}

  static formatLiveRate = (
    serviceRate: LiveRate<number, Moment>,
    base: CurrencySymbol,
    quote: CurrencySymbol
  ): LiveRate<string, string> => ({
    rate: `${base}/${quote} = ${currencyFormatterFactory(quote)(
      serviceRate.rate
    )}`,
    refreshTime: formatUtcMoment(serviceRate.refreshTime, true)
  });
  ngOnInit(): void {
    combineLatest([
      this.service.rate,
      this.currencySelectionService.base,
      this.currencySelectionService.quote
    ])
      .pipe(sample(this.service.rate))
      .subscribe(([rate, base, quote]) => {
        this.liveRate = LiveRateComponent.formatLiveRate(rate, base, quote);
      });
  }
}
