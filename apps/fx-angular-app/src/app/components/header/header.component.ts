import { Component, OnInit } from '@angular/core';
import { CurrencySelectionsService } from '../../services/currency-selections/currency-selections.service';
import { CurrencySymbol } from '../../../../../../libs/shared/src/lib/types';

type OnCurrencyInput = (currency: CurrencySymbol) => void;

@Component({
  selector: 'fx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Angular Fx Demo';
  baseCurrency: CurrencySymbol;
  quoteCurrency: CurrencySymbol;
  baseOptions: CurrencySymbol[];
  quoteOptions: CurrencySymbol[];
  onBaseCurrencyInput: OnCurrencyInput;
  onQuoteCurrencyInput: OnCurrencyInput;

  constructor(private currencySelectionsService: CurrencySelectionsService) {
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

  private currencyInputFactory = (type: 'Base' | 'Quote') => {
    return (currency: CurrencySymbol): void => {
      this.currencySelectionsService[`set${type}`](currency);
    };
  };

  ngOnInit(): void {
    this.currencySelectionsService.base.subscribe(
      this.currencyChangeObservor('base')
    );
    this.currencySelectionsService.quote.subscribe(
      this.currencyChangeObservor('quote')
    );
  }
}
