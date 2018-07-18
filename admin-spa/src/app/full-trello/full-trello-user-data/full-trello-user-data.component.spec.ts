import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CamelCasePipe } from '../../pipes/camel-case.pipe';

import { FullTrelloUserDataComponent } from './full-trello-user-data.component';

describe('FullTrelloUserDataComponent', () => {
  let component: FullTrelloUserDataComponent;
  let fixture: ComponentFixture<FullTrelloUserDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullTrelloUserDataComponent, CamelCasePipe ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullTrelloUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
