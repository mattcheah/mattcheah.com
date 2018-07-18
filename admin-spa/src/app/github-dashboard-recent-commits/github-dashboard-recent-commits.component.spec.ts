import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { GithubDashboardRecentCommitsComponent } from './github-dashboard-recent-commits.component';

describe('GithubDashboardRecentCommitsComponent', () => {
  let component: GithubDashboardRecentCommitsComponent;
  let fixture: ComponentFixture<GithubDashboardRecentCommitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubDashboardRecentCommitsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubDashboardRecentCommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
