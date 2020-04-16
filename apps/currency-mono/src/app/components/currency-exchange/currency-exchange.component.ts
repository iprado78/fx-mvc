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
  exchangeForm = this.fb.group({
    pay: [0, Validators.required]
  });
  receive = 0;

  onSubmit() {
    this.bankService
      .exchangeCurrency(this.exchangeForm.value.pay, this.receive)
      .subscribe(() => {
        this.exchangeForm.setValue({
          pay: 0
        });
      });
  }
  constructor(
    private fb: FormBuilder,
    private bankService: BankService,
    private liveRateService: LiveRateService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.exchangeForm.valueChanges,
      this.liveRateService.rate
    ]).subscribe(([formValue, liveRate]) => {
      this.receive = Number(formValue.pay) * liveRate.rate;
    });
  }
}
