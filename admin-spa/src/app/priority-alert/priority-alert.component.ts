import { Component, OnInit } from '@angular/core';
import { TrelloService } from '../services/trello.service';

@Component({
  selector: 'app-priority-alert',
  templateUrl: './priority-alert.component.html',
  styleUrls: ['./priority-alert.component.scss']
})
export class PriorityAlertComponent implements OnInit {

  priorityCards: Array<any>;
  emergencyCards: Array<any>;
  showEmergencyCards: boolean = false;
  showPriorityCards: boolean = false;
  alertClasses = {
    "alert-contrast": false,
    "alert-danger": false,
    "alert-warning": true
  }

  constructor(private trelloService: TrelloService) {
  }

  ngOnInit() {
    this.trelloService.awaitPriorityData().subscribe(data => {
      if (data !== undefined) {
        this.priorityCards = data.priorityCards;
        this.emergencyCards = data.emergencyCards;
        if (this.emergencyCards.length > 0) {
          this.showEmergencyCards = true;
          this.alertClasses["alert-contrast"] = true; 
          this.alertClasses["alert-danger"] = true; 
          this.alertClasses["alert-warning"] = false; 
        }
        if (this.priorityCards.length > 0) this.showPriorityCards = true;

      }
    });
  }

  hideCards() {
    this.showEmergencyCards = false;
    this.showPriorityCards = false;
  }

}
