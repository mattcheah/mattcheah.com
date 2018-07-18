import { TestBed, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';

import { TrelloService } from './trello.service';

describe('TrelloService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrelloService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should be created', inject([TrelloService], (service: TrelloService) => {
    expect(service).toBeTruthy();
  }));

  it('awaitData() should return an observable', inject([TrelloService], (service: TrelloService) => {
    let observable = service.awaitData();
    expect(observable instanceof Observable).toBeTruthy();
  }));

  it('awaitData() should return values upon subscription', inject([TrelloService], (service: TrelloService) => {
    let observable = service.awaitData();
    observable.subscribe(d => {
      if(d !== undefined) {
        expect(d).toBeDefined();
        expect(d.cards).toBeDefined();
      }
    });
  }));

  it('awaitPriorityData() should return an observable', inject([TrelloService], (service: TrelloService) => {
    let observable = service.awaitPriorityData();
    expect(observable instanceof Observable).toBeTruthy()
    observable.subscribe(d => {
      if (d !== undefined) {
        expect(d).toBeDefined();
        expect(d.cards).toBeDefined();
      }
    });
  }));
});
