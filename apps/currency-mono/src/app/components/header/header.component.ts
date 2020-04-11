import { Component, OnInit } from '@angular/core';
import { DatesService } from '../../services/dates/dates.service';
import { CurrencyOption, CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service'

type OnDateInput = (date: Date) => void
type OnCurrencyInput = (currency: CurrencyOption) => void

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
  sourceCurrency: CurrencyOption;
  targetCurrency: CurrencyOption;
  sourceOptions: CurrencyOption[];
  targetOptions: CurrencyOption[];
  onStartDateInput: OnDateInput;
  onEndDateInput: OnDateInput;
  onSourceCurrencyInput: OnCurrencyInput;
  onTargetCurrencyInput: OnCurrencyInput;

  constructor(private dateService: DatesService, private currencySelectionsService: CurrencySelectionsService) { 
    this.min = new Date(2020, 0, 1);
    this.max =  new Date();
    this.dateService.setDate(new Date(this.max.getFullYear(), this.max.getMonth() - 1, this.max.getDate()), 'startDate');
    this.dateService.setDate(this.max, 'endDate');
    this.onStartDateInput = this.onDateInputFactory('startDate');
    this.onEndDateInput = this.onDateInputFactory('endDate');
    this.onSourceCurrencyInput = this.currencyInputFactory('Source');
    this.onTargetCurrencyInput = this.currencyInputFactory('Target');
  }
  private currencyChangeObservor = (type: 'source' | 'target') => {
    return (currency: CurrencyOption) => {
      this[`${type}Currency`] = currency
      this[`${type === 'source' ? 'target' : 'source'}Options`] = [...this.currencySelectionsService.currencyOptions].filter(cur => cur !== currency)
    }
  }
  private onDateInputFactory = (type: 'startDate' | 'endDate') => {
    return (date): void => {
      this.dateService.setDate(date, type)
    }
  }

  private currencyInputFactory = (type: 'Source'| 'Target') => {
    return (currency: CurrencyOption): void => {
      this.currencySelectionsService[`set${type}`](currency);
    }
  }

  ngOnInit(): void {
    this.dateService.dates.subscribe(dates => {
      this.startDate = dates.startDate;
      this.endDate = dates.endDate;
    });
    this.currencySelectionsService.source.subscribe(this.currencyChangeObservor('source'));
    this.currencySelectionsService.target.subscribe(this.currencyChangeObservor('target'));
  }
}
