import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullGithubComponent } from './full-github.component';

describe('FullGithubComponent', () => {
  let component: FullGithubComponent;
  let fixture: ComponentFixture<FullGithubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullGithubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullGithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
