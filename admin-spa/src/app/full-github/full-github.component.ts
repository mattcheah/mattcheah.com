import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date.service';
import { UserService } from '../services/user.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-full-github',
  templateUrl: './full-github.component.html',
  styleUrls: ['./full-github.component.scss']
})
export class FullGithubComponent implements OnInit {

  loading = true;

  startDate;
  endDate;
  rangeString; 

  githubStats;
  userData;


  usernamesArray;
  loginsArray;

  mostCommitsData;
  mostAdditionsData;
  mostDeletionsData;
  mostFileChangesData;

  constructor(private dateService: DateService, private userService:UserService) { }

  ngOnInit() {
    this.startDate = this.dateService.startDateRange;
    this.endDate = this.dateService.endDateRange;
    this.rangeString = this.dateService.rangeString;

    zip(this.userService.getGithubStats(), this.userService.getUsersList()).subscribe(dataArray => {
      if (dataArray[0] !== undefined && dataArray [1] !== undefined) {
        console.log(dataArray);
        this.loading = false;
        this.loginsArray = [];
        this.githubStats = dataArray[0];
        this.userData = dataArray[1];
        
        for(let login of Object.keys(this.userData)) this.loginsArray.push(login);

        this.createChartTotals();
      }
    });

  }

  createChartTotals(): void {
    let users = this.userData;
    this.usernamesArray = [];
    let userCommitTotals = [];
    let userAdditionsTotals = [];
    let userDeletionsTotals = [];
    let userFileChangesTotals = [];

    for (let user of Object.keys(users)) {
      this.usernamesArray.push(user);
      userCommitTotals.push(users[user].totalCommits);
      userAdditionsTotals.push(users[user].totalAdditions);
      userDeletionsTotals.push(users[user].totalDeletions);
      userFileChangesTotals.push(users[user].totalFileChanges);
    }

    this.mostCommitsData = this.createChartData(userCommitTotals, "Number of Commits - ")
    this.mostAdditionsData = this.createChartData(userAdditionsTotals, "Number of Additions - ", "rgba(52, 168, 83,.8)")
    this.mostDeletionsData = this.createChartData(userDeletionsTotals, "Number of Deletions - ", "rgba(234, 67, 53, .8)")
    this.mostFileChangesData = this.createChartData(userFileChangesTotals, "Number of File Changes - ", "rgba(251, 188, 5,.8)")

  }

  createChartData(data, label, barColor="rgba(61,130,244,.8)") {
    return {
      type: 'bar',
      data: {
        labels: this.usernamesArray,
        datasets: [
          {
            label: label+this.rangeString,
            data: data,
            backgroundColor: [
              barColor,
              barColor,
              barColor,
              barColor,
              barColor,
              barColor
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
