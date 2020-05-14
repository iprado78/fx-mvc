import { Component, OnInit } from '@angular/core';
import { currencyFormatterFactory, CurrencyReserve } from '@fx/ui-core-data';

import { BankService } from '../../services/bank/bank.service';

@Component({
  selector: 'currency-reserves',
  templateUrl: './currency-reserves.component.html',
  styleUrls: ['./currency-reserves.component.css']
})
export class CurrencyReservesComponent implements OnInit {
  baseCurrency: CurrencyReserve<string>;
  quoteCurrency: CurrencyReserve<string>;
  static formatReserves = (serviceReserves: CurrencyReserve<number>) => ({
    code: serviceReserves.code,
    reserves: currencyFormatterFactory(
      serviceReserves.code,
      2
    )(serviceReserves.reserves)
  });
  constructor(private bankService: BankService) {}

  ngOnInit(): void {
    this.bankService.baseReserves.subscribe((base: CurrencyReserve<number>) => {
      this.baseCurrency = CurrencyReservesComponent.formatReserves(base);
    });
    this.bankService.quoteReserves.subscribe(
      (quote: CurrencyReserve<number>) => {
        this.quoteCurrency = CurrencyReservesComponent.formatReserves(quote);
      }
    );
  }
}
