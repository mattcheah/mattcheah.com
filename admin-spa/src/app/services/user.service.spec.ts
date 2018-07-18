import { TestBed, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from './user.service';


describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('$getUsersList should return an observable of a object of users.', inject([UserService], (service: UserService) => {
    let observable = service.getUsersList();
    expect(observable instanceof Observable).toBeTruthy();
    observable.subscribe(data => {
      let dataKeys = Object.keys(data);
      for(let key of dataKeys) {
        expect(data[key] instanceof User).toBeTruthy();
      }
      expect('avatarUrl' in data[dataKeys[0]]).toBeTruthy();
      expect('commits' in data[dataKeys[0]]).toBeTruthy();
      expect('id' in data[dataKeys[0]]).toBeTruthy();
      expect('login' in data[dataKeys[0]]).toBeTruthy();
      expect('additions' in data[dataKeys[0]]).toBeTruthy();
      expect('email' in data[dataKeys[0]]).toBeTruthy();
      expect('name' in data[dataKeys[0]]).toBeTruthy();
      expect('trelloCards' in data[dataKeys[0]]).toBeTruthy();
      expect('trelloLists' in data[dataKeys[0]]).toBeTruthy();

    });
  }));

  it('$getGithubStats should return an observable of a key-value array of some github statistics.', inject([UserService], (service: UserService) => {
    let observable = service.getGithubStats();
    expect(observable instanceof Observable).toBeTruthy();
    observable.subscribe(data => {

      expect(data['mostAdditionsUser'] instanceof User).toBeTruthy();
      expect(data['mostCommitsUser'] instanceof User).toBeTruthy();
      expect(data['mostDeletionsUser'] instanceof User).toBeTruthy();
      expect(data['mostFileChangesUser'] instanceof User).toBeTruthy();

      expect('mostAdditions' in data).toBeTruthy();
      expect('mostCommits' in data).toBeTruthy();
      expect('mostDeletions' in data).toBeTruthy();
      expect('mostFileChanges' in data).toBeTruthy();
      expect('recentCommits' in data).toBeTruthy();
    });
  }));

});
