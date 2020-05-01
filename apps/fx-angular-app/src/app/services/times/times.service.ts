import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import moment, { Moment } from 'moment';
import { TimeType, Times } from '@fx/ui-core-data';

@Injectable({
  providedIn: 'root'
})
export class TimesService {
  private t = new BehaviorSubject<Times>({
    startTime: moment().startOf('day'),
    endTime: moment()
  });
  times = this.t.asObservable();
  get latest() {
    return this.t.getValue();
  }
  constructor() {}
  setTime(time: Moment, timeType: TimeType) {
    this.t.next({ ...this.latest, [timeType]: time });
  }
}
