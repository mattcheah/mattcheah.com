import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DateService {

  startDateRange = moment().subtract(1,'month').toDate();
  endDateRange = new Date();
  rangeString;

  rangeObservable = new BehaviorSubject([this.startDateRange, this.endDateRange]);

  constructor() {
    this.rangeString = this.startDateRange.toLocaleDateString() + " to " + this.endDateRange.toLocaleDateString();

  }

  awaitRange() {
    return this.rangeObservable.asObservable();
  }

  updateDates(startDate, endDate) {
    this.startDateRange = startDate;
    this.endDateRange = endDate;
    this.rangeString = this.startDateRange.toLocaleDateString() + " to " + this.endDateRange.toLocaleDateString()
    this.rangeObservable.next([startDate, endDate]);
  }

}
