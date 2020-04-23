import { Component, OnInit } from '@angular/core';
import { DatesService } from '../../services/dates/dates.service';

type OnDateInput = (date: Date) => void;

@Component({
  selector: 'currency-historical-date-range',
  templateUrl: './historical-date-range.component.html',
  styleUrls: ['./historical-date-range.component.css']
})
export class HistoricalDateRangeComponent implements OnInit {
  min: Date;
  max: Date;
  startDate: Date;
  endDate: Date;
  onStartDateInput: OnDateInput;
  onEndDateInput: OnDateInput;
  constructor(private dateService: DatesService) {
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
  }

  private onDateInputFactory = (type: 'startDate' | 'endDate') => {
    return (date): void => {
      this.dateService.setDate(date, type);
    };
  };

  ngOnInit(): void {
    this.dateService.dates.subscribe(dates => {
      this.startDate = dates.startDate;
      this.endDate = dates.endDate;
    });
  }
}
