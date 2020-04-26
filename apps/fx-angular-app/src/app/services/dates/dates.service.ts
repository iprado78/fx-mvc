import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dates, DateType } from '../../../../../../libs/shared/src';

@Injectable({
  providedIn: 'root'
})
export class DatesService {
  private d = new BehaviorSubject<Dates>({
    startDate: new Date(),
    endDate: new Date()
  });

  dates = this.d.asObservable();

  get latest() {
    return this.d.getValue();
  }

  constructor() {}

  setDate(date: Date, dateType: DateType) {
    this.d.next({ ...this.latest, [dateType]: date });
  }
}
