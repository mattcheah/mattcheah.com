import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FullTrelloComponent } from './full-trello.component';

describe('FullTrelloComponent', () => {
  let component: FullTrelloComponent;
  let fixture: ComponentFixture<FullTrelloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FullTrelloComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullTrelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
