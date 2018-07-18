import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { TrelloDashboardCardComponent } from './trello-dashboard-card/trello-dashboard-card.component';
import { GithubDashboardRecentCommitsComponent } from './github-dashboard-recent-commits/github-dashboard-recent-commits.component';
import { GithubDashboardUserCommitsComponent } from './github-dashboard-user-commits/github-dashboard-user-commits.component';
import { LoaderIconComponent } from './loader-icon/loader-icon.component';
import { ChartComponent } from './chart/chart.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        LeftSidebarComponent,
        HomeDashboardComponent,
        TrelloDashboardCardComponent,
        GithubDashboardUserCommitsComponent,
        GithubDashboardRecentCommitsComponent,
        LoaderIconComponent,
        ChartComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
