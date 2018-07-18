import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { GithubDashboardUserCommitsComponent } from './github-dashboard-user-commits.component';

describe('GithubDashboardUserCommitsComponent', () => {
  let component: GithubDashboardUserCommitsComponent;
  let fixture: ComponentFixture<GithubDashboardUserCommitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubDashboardUserCommitsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubDashboardUserCommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
