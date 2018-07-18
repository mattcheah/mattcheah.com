import { Component, OnInit } from '@angular/core';
import { LoaderIconComponent } from "../loader-icon/loader-icon.component";
import { SprintProgressBarComponent } from '../sprint-progress-bar/sprint-progress-bar.component';
import { TrelloService } from '../services/trello.service';

@Component({
  selector: 'app-trello-dashboard-card',
  templateUrl: './trello-dashboard-card.component.html',
  styleUrls: ['./trello-dashboard-card.component.scss']
})
export class TrelloDashboardCardComponent implements OnInit {

  trelloInfo;
  loading = true;

  constructor(private trelloService: TrelloService) { }

  ngOnInit() {
    // this.getTrelloInfo();
    this.trelloService.awaitData().subscribe(d => {
      if (d !== undefined) {
        this.loading = false;
        this.trelloInfo = d;
      }
    });
  }
}
