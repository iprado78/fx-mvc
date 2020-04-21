import { Component, OnInit } from '@angular/core';
import { BankService } from '../../services/bank/bank.service';
import { CurrencyReserve } from '../../shared/types';
import { currencyFormatterFactory } from '../../shared/functions';

@Component({
  selector: 'currency-reserves',
  templateUrl: './currency-reserves.component.html',
  styleUrls: ['./currency-reserves.component.css']
})
export class CurrencyReservesComponent implements OnInit {
  baseCurrency: CurrencyReserve<string>;
  quoteCurrency: CurrencyReserve<string>;
  static formatReserves = (serviceReserves: CurrencyReserve<number>) => ({
    id: serviceReserves.id,
    reserves: currencyFormatterFactory(
      serviceReserves.id,
      2
    )(serviceReserves.reserves)
  });
  constructor(private bankService: BankService) {}

  ngOnInit(): void {
    this.bankService.baseReserves.subscribe((base: CurrencyReserve<number>) => {
      this.baseCurrency = CurrencyReservesComponent.formatReserves(base);
    });
    this.bankService.quoteReserves.subscribe(quote => {
      this.quoteCurrency = CurrencyReservesComponent.formatReserves(quote);
    });
  }
}
