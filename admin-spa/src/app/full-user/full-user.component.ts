import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { DateService } from '../services/date.service';
import { zip } from 'rxjs';
import { LoaderIconComponent } from "../loader-icon/loader-icon.component";
import { Utils } from '../utils';

declare var $;

@Component({
  selector: 'app-full-user',
  templateUrl: './full-user.component.html',
  styleUrls: ['./full-user.component.scss']
})
export class FullUserComponent implements OnInit {

  login:string;
  usersList;
  user;
  userName;
  loading = true;

  maxCommits = 5;
  rangeString;

  constructor(private route:ActivatedRoute, private userService: UserService, private dateService: DateService) {
    this.rangeString = this.dateService.rangeString;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadUserData(params['id']);
    });

    this.dateService.awaitRange().subscribe(d => {
      this.rangeString = this.dateService.rangeString;
    });
  }

  loadUserData(id) {
    this.userService.getUsersList().subscribe(data => {
      if (data !== undefined) {
        this.usersList = data;
        this.user = this.usersList[id];
        this.userName = this.user.name || this.user.login;
        this.loading = false;
        this.createSparklineDataArrays();
      }
    });

  }

  createSparklineDataArrays() {
    let commitsArray = [0];
    let fileChangesArray = [];


    let prevDate;
    let firstDate;
    let currentDate;


    for (let i = this.user.commits.length-1; i >= 0; i--) {

      let commit = this.user.commits[i];
      fileChangesArray.push(commit.node.changedFiles);
      currentDate = new Date(commit.node.author.date);

      if (!prevDate) {
        firstDate = currentDate;
        commitsArray[0] = commitsArray[0]++;
      } else {
        let diff = Utils.dayDifference(prevDate,currentDate);
        if (diff === 0) {
          commitsArray[commitsArray.length - 1] = commitsArray[commitsArray.length - 1] + 1;
        } else {
          for(let j = 0; j < diff-1; j++) {
            commitsArray.push(0);
          }
          commitsArray.push(1);
        }
      }
      prevDate = currentDate;
    }

    setTimeout(() => {
      $("#sparkline-commits").sparkline(commitsArray, {
        type: "line",
      });
      $("#sparkline-file-changes").sparkline(fileChangesArray, {
        type: "bar",
      });
      $(".sparkline canvas").css({ maxWidth: '125px'});
      $("#sparkline-additions-deletions").sparkline([this.user.totalAdditions,this.user.totalDeletions], {
        type: "pie",
        width:"75px",
        height: "75px"
      });
    }, .01);
  }

  showCommits(addNum) {
    this.maxCommits = addNum;
  }

}
