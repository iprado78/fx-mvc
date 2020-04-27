import { Component, OnInit } from '@angular/core';
import { LiveRate } from '../../../../../../libs/shared/src';
import { LiveRateService } from '../../services/live-rate/live-rate.service';
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { combineLatest } from 'rxjs';
import { sample } from 'rxjs/operators';
import { formatLiveRateForView } from '../../../../../../libs/shared/src/lib/functions';

@Component({
  selector: 'fx-realtime-card',
  templateUrl: './realtime-card.component.html',
  styleUrls: ['./realtime-card.component.css']
})
export class LiveRateComponent implements OnInit {
  liveRate: LiveRate<string, string>;
  constructor(
    private service: LiveRateService,
    private currencySelectionService: CurrencySelectionsService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.service.rate,
      this.currencySelectionService.base,
      this.currencySelectionService.quote
    ])
      .pipe(sample(this.service.rate))
      .subscribe(([rate, base, quote]) => {
        this.liveRate = formatLiveRateForView(rate, base, quote);
      });
  }
}
