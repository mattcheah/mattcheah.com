import { Component, OnInit } from '@angular/core';
import { TrelloService } from '../services/trello.service';

@Component({
  selector: 'app-sprint-progress-bar',
  templateUrl: './sprint-progress-bar.component.html',
  styleUrls: ['./sprint-progress-bar.component.scss']
})
export class SprintProgressBarComponent implements OnInit {

  totalDays: number;
  sprintProgress: number;
  barClass: string = "bg-primary";
  progressBarText: string = "Sprint Progress";

  constructor(private trelloService: TrelloService) { }

  ngOnInit() {
    let self = this;
    this.trelloService.awaitData().subscribe(d => {
      if (d !== undefined) {
        self.totalDays = d.totalDays;
        self.sprintProgress = d.sprintProgress;
        self.barClass = d.barClass;
        self.progressBarText = d.progressBarText;
      }
    });
  }

}
