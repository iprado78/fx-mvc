import { Component, OnInit } from '@angular/core';
import { DatesService } from '../../services/dates/dates.service';
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { CurrencySymbol } from '../../shared/types';

type OnDateInput = (date: Date) => void;
type OnCurrencyInput = (currency: CurrencySymbol) => void;

@Component({
  selector: 'currency-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Angular Fx Demo';
  min: Date;
  max: Date;
  startDate: Date;
  endDate: Date;
  baseCurrency: CurrencySymbol;
  quoteCurrency: CurrencySymbol;
  baseOptions: CurrencySymbol[];
  quoteOptions: CurrencySymbol[];
  onStartDateInput: OnDateInput;
  onEndDateInput: OnDateInput;
  onBaseCurrencyInput: OnCurrencyInput;
  onQuoteCurrencyInput: OnCurrencyInput;

  constructor(
    private dateService: DatesService,
    private currencySelectionsService: CurrencySelectionsService
  ) {
    this.min = new Date(2020, 0, 1);
    this.max = new Date();
    this.dateService.setDate(
      new Date(
        this.max.getFullYear(),
        this.max.getMonth() - 1,
        this.max.getDate()
      ),
      'startDate'
    );
    this.dateService.setDate(this.max, 'endDate');
    this.onStartDateInput = this.onDateInputFactory('startDate');
    this.onEndDateInput = this.onDateInputFactory('endDate');
    this.onBaseCurrencyInput = this.currencyInputFactory('Base');
    this.onQuoteCurrencyInput = this.currencyInputFactory('Quote');
  }
  private currencyChangeObservor = (type: 'base' | 'quote') => {
    return (currency: CurrencySymbol) => {
      this[`${type}Currency`] = currency;
      this[`${type === 'base' ? 'quote' : 'base'}Options`] = [
        ...this.currencySelectionsService.currencyOptions
      ].filter(cur => cur !== currency);
    };
  };
  private onDateInputFactory = (type: 'startDate' | 'endDate') => {
    return (date): void => {
      this.dateService.setDate(date, type);
    };
  };

  private currencyInputFactory = (type: 'Base' | 'Quote') => {
    return (currency: CurrencySymbol): void => {
      this.currencySelectionsService[`set${type}`](currency);
    };
  };

  ngOnInit(): void {
    this.dateService.dates.subscribe(dates => {
      this.startDate = dates.startDate;
      this.endDate = dates.endDate;
    });
    this.currencySelectionsService.base.subscribe(
      this.currencyChangeObservor('base')
    );
    this.currencySelectionsService.quote.subscribe(
      this.currencyChangeObservor('quote')
    );
  }
}
