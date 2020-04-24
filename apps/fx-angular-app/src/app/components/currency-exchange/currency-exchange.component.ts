import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BankService } from '../../services/bank/bank.service';
import { LiveRateService } from '../../services/live-rate/live-rate.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.css']
})
export class CurrencyExchangeComponent implements OnInit {
  receive = 0;
  exchangeForm = this.fb.group({
    pay: [0, [Validators.required, Validators.max(0)]]
  });

  async onSubmit() {
    try {
      await this.bankService.exchangeCurrency(
        this.exchangeForm.value.pay,
        this.receive
      );
      this.exchangeForm.setValue({
        pay: 0
      });
    } catch (e) {
      console.log(e);
    }
  }
  constructor(
    private fb: FormBuilder,
    private bankService: BankService,
    private liveRateService: LiveRateService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.exchangeForm.controls.pay.valueChanges,
      this.liveRateService.rate
    ]).subscribe(([payVal, liveRate]) => {
      this.receive = Number(payVal) * liveRate.rate;
    });

    this.bankService.baseReserves.subscribe({
      next: ({ reserves }) => {
        const { pay } = this.exchangeForm.controls;
        pay.setValidators([Validators.required, Validators.max(reserves)]);
        pay.updateValueAndValidity();
      }
    });
  }
}
