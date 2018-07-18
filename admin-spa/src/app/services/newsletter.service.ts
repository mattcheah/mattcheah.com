import { Injectable } from '@angular/core';
import { DateService } from '../services/date.service';
import { BehaviorSubject } from 'rxjs';
declare var require: any;
var signups = require("../signupsData.json");


@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  fetching;

  startDate;
  endDate;

  signupsObservable = new BehaviorSubject(undefined);

  constructor(private dateService: DateService) {
    this.fetching = true;
    this.dateService.awaitRange().subscribe(d => {
      this.startDate = d[0];
      this.endDate = d[1];
      this.makeRequest();
    });
  }

  awaitSignups() {
    if (this.signupsObservable.getValue == undefined && this.fetching === false) {
      this.startDate = this.dateService.startDateRange;
      this.endDate = this.dateService.startDateRange;
      this.makeRequest();
    }
    return this.signupsObservable;
  }

  makeRequest() {
    // let body = {
    //   startDate: this.startDate,
    //   endDate: this.endDate
    // };

    // fetch("https://www.bestattorney.com/admin/newsletter-calls/get-newsletter-signups.php", {
    //   method: 'POST',
    //   body: JSON.stringify(body),
    //   headers: new Headers({
    //     'Content-Type': 'application/json;charset=utf-8',
    //   })
    // }).then(res => res.json())
    // .then(d => this.signupsObservable.next(d))
    // .catch(error => {
    //   console.log("Error in Newsletter Service fetch request:");
    //   console.log(error);
    // });
    this.signupsObservable.next(signups);

  }
}
