import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Utils } from "../utils";
declare var require:any;
var trelloCardData = require('../trelloCardData.json');
var trelloPriorityData = require('../priorityTrelloData.json');

@Injectable({
  providedIn: 'root'
})
export class TrelloService {

  private fetching: boolean = false;
  private priorityFetching: boolean = false;
  private trelloData: any = {};
  private priorityData: any = {};
  private trelloDataStream = new BehaviorSubject(undefined);
  private priorityDataStream = new BehaviorSubject(undefined);

  constructor() {
    this.getPriorityData();
  }

  public awaitData() {
    if (this.trelloDataStream.getValue() === undefined && !this.fetching) {
      this.getSprintData();
    }
    return this.trelloDataStream.asObservable();
  }

  public awaitPriorityData() {
    if (this.priorityDataStream.getValue() === undefined && !this.priorityFetching) {
      this.getPriorityData();
    }
    return this.priorityDataStream.asObservable();
  }

  private getSprintData() {
      // let self = this;
      // self.fetching = true;
      // fetch("https://www.bestattorney.com/admin/trello-calls/get-sprint-info.php", {
      //   method: "GET",
      //   headers: new Headers({
      //     'Content-Type': 'application/json'
      //   })
      // })
      // .then(res => res.json())
      // .then(function (res) {
      //   self.fetching = false;
      //   self.trelloData = res;
      //   self.parseSprintDates(self.trelloData);
      //   self.trelloDataStream.next(self.trelloData);
      // }).catch(function (error) {
      //   self.fetching = false;
      //   self.trelloDataStream.error(error);
      //   console.log("Trello Service Error:" + error);
      // });
      this.trelloDataStream.next(trelloCardData);
  }

  getPriorityData() {
    // let self = this;
    // self.priorityFetching = true;
    // let fetchUrl = "https://api.trello.com/1/boards/afB5VJqK/?cards=open&card_fields=name,shortUrl,idMembers,idList,dateLastActivity,desc";
    // // fetchUrl += "&key="+creds.trelloApiKey+"&token="+creds.trelloToken;

    // fetch(fetchUrl)
    // .then(res => {
    //   return res.json();
    // }).then(res => {
    //   self.priorityFetching = false;
    //   self.priorityData = res;
    //   self.priorityDataStream.next(self.organizePriorityCards(res));
    // }).catch(err => {
    //   self.priorityFetching = false;
    //   self.priorityDataStream.error(err);
    //   console.log("Error in getPriorityData from TrelloService.")
    //   console.log(err);
    // });
    this.priorityDataStream.next(trelloPriorityData);
  }

  parseSprintDates(info): void {
    // console.log("parsing sprint dates");
    // console.log(info);
    let name = info.cards.name;
    let matches = name.match(/\d{1,2}\/\d{1,2}\/\d{1,2}/g);

    let startDate = new Date(matches[0]);
    let endDate = new Date(matches[1]);
    let today = new Date();
    this.trelloData.totalDays = Utils.dayDifference(startDate,endDate) + 1;
    this.trelloData.sprintProgress = Utils.dayDifference(startDate, today)+1;

    let daysLeft = this.trelloData.totalDays - this.trelloData.sprintProgress;
    if (daysLeft < 0) {
      this.trelloData.barClass = "bg-expired";
      this.trelloData.progressBarText = "We're overdue for a sprint meeting!";
    } else if (daysLeft == 0) {
      this.trelloData.barClass = "bg-danger";
      this.trelloData.progressBarText = "Sprint Ending Today!";
    } else if (daysLeft <= 4) {
      this.trelloData.barClass = "bg-warning";
      this.trelloData.progressBarText = "Sprint Ending Soon!";
    } else {
      this.trelloData.barClass = "bg-primary";
      this.trelloData.progressBarText = "Sprint Progress";
    }

  }

  organizePriorityCards(data): object {
    data['priorityCards'] = [];
    data['emergencyCards'] = [];
    for (let card of data.cards) {
      if (card.idList === "5a399275072fab6f4e0917bf") {
        data.priorityCards.push(card);
      } else if (card.idList === "5a3994a33fc9d679dab9ce4d") {
        data.emergencyCards.push(card);
      }
    }
    return data;
  }
}
