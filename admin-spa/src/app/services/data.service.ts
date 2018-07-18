import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  startDate;
  endDate;

  constructor() { }

  updateDates(startDate, endDate) {
    this.startDate = startDate;
    this.endDate = endDate;
    console.log("dates in dateService are:");
    console.log(this.startDate);
    console.log(this.endDate);
  }
}
