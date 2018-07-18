import { Component, OnInit } from '@angular/core';
// import { GithubService } from '../services/github.service';
import { UserService } from '../services/user.service';
import { DateService } from '../services/date.service';
import { LoaderIconComponent } from '../loader-icon/loader-icon.component';

@Component({
  selector: 'app-github-dashboard-user-commits',
  templateUrl: './github-dashboard-user-commits.component.html',
  styleUrls: ['./github-dashboard-user-commits.component.scss']
})
export class GithubDashboardUserCommitsComponent implements OnInit {

  userData;
  mostCommitsData: Object;
  rangeString = "";

  loading = true;
  constructor(private userService: UserService, private dateService: DateService) { }

  ngOnInit() {
    this.userService.getUsersList().subscribe(d => {
      if (d !== undefined) {
        this.userData = d;
        this.assignMostCommits();
        this.loading = false;
        this.rangeString = this.dateService.rangeString;
      }
    });

  }

  assignMostCommits(): void {

    let users = this.userData;
    let userNames = [];
    let userCommitTotals = [];

    for (let user of Object.keys(users)) {
      userNames.push(user);
      userCommitTotals.push(users[user].totalCommits);
    }

    this.mostCommitsData = {
      type: 'bar',
      data: {
        labels: userNames,
        datasets: [
          {
            label: "Number of Commits - "+this.rangeString,
            data: userCommitTotals,
            backgroundColor: [
              'rgba(61,130,244,.8)',
              'rgba(61,130,244,.8)',
              'rgba(61,130,244,.8)',
              'rgba(61,130,244,.8)',
              'rgba(61,130,244,.8)',
              'rgba(61,130,244,.8)',
            ],
            borderColor: [
              'rgb(51,120,234)',
              'rgb(51,120,234)',
              'rgb(51,120,234)',
              'rgb(51,120,234)',
              'rgb(51,120,234)',
              'rgb(51,120,234)'
            ]
          }
        ]
      },
      options: {}
    };
  }

}
