import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoaderIconComponent } from '../loader-icon/loader-icon.component';
// import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-github-dashboard-recent-commits',
  templateUrl: './github-dashboard-recent-commits.component.html',
  styleUrls: ['./github-dashboard-recent-commits.component.scss']
})
export class GithubDashboardRecentCommitsComponent implements OnInit {

  githubStats;
  date: Date = new Date();
  loading = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getGithubStats().subscribe(d => {
      if (d !== undefined) {
        this.githubStats = d;
        this.loading = false;
      }
    });

  }

}
