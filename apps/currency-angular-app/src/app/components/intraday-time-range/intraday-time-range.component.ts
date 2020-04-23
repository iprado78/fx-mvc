import { Component, OnInit } from '@angular/core';
import { TimesService } from '../../services/times/times.service';
import moment from 'moment';

const ssmToMoment = (seconds: number) =>
  moment()
    .startOf('day')
    .add(seconds, 'seconds');

@Component({
  selector: 'currency-intraday-time-range',
  templateUrl: './intraday-time-range.component.html',
  styleUrls: ['./intraday-time-range.component.css']
})
export class IntradayTimeRangeComponent implements OnInit {
  startTime: string;
  endTime: string;
  constructor(private timesService: TimesService) {}

  onStartTimeInput(secondsSinceMidnight) {
    this.timesService.setTime(ssmToMoment(secondsSinceMidnight), 'startTime');
  }

  onEndTimeInput(secondsSinceMidnight) {
    this.timesService.setTime(ssmToMoment(secondsSinceMidnight), 'endTime');
  }

  ngOnInit(): void {
    this.timesService.times.subscribe({
      next: times => {
        this.startTime = times.startTime.format('HH:mm');
        this.endTime = times.endTime.format('HH:mm');
      }
    });
  }
}
