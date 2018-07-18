import { Component, OnInit } from '@angular/core';
import { SprintProgressBarComponent } from '../sprint-progress-bar/sprint-progress-bar.component';
import { UserService } from "../services/user.service";
import { TrelloService } from "../services/trello.service";
import { LoaderIconComponent } from "../loader-icon/loader-icon.component";


@Component({
  selector: 'app-full-trello',
  templateUrl: './full-trello.component.html',
  styleUrls: ['./full-trello.component.scss']
})
export class FullTrelloComponent implements OnInit {

  trelloData;
  filteredTrelloUsers;
  activeUser;
  loading = true;

  constructor(private userService: UserService, private trelloService: TrelloService) { }

  ngOnInit() {
    // this.userService.getUsersList().subscribe(d => {
    // this.trelloData = d;

    // });
    this.trelloService.awaitData().subscribe(d => {
      if(d !== undefined) {
        this.trelloData = d;
        this.filteredTrelloUsers = d.users;
        this.loading = false;
      }
    });
  }

  assignActiveUser(user): void {
    if(this.activeUser !== user) {
      this.activeUser = user;
      this.filteredTrelloUsers = [user];
    } else {
      this.activeUser = undefined;
      this.filteredTrelloUsers = this.trelloData.users;
    }
  }



}
