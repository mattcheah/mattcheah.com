import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, zip } from 'rxjs';

import { GithubService } from '../services/github.service';
import { TrelloService } from '../services/trello.service';

import { User } from '../user';
declare var require:any;
var trelloCardData = require('../trelloCardData.json');

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private trelloData;
  private githubData;
  private recentCommits;

  private parsedUserData = {};
  private calculatedGithubStats = {};

  private githubStats = new BehaviorSubject(undefined);
  private usersList = new BehaviorSubject(undefined);

  private fetching: boolean = false;

  constructor(private githubService: GithubService, private trelloService: TrelloService) {
    this.parsedUserData["mattcheah"] = new User();
    this.parsedUserData["4kristi"] = new User();
    this.parsedUserData["MReynoso2018"] = new User();
    this.parsedUserData["bobbyhasbrook"] = new User();
    this.parsedUserData["insarov"] = new User();
  }

  public getUsersList(): Observable<{}> {
    if (this.usersList.getValue() === undefined && !this.fetching) {
      this.makeAllRequests();
    }
    return this.usersList.asObservable();
  }

  public getGithubStats(): Observable<{}> {
    if (this.githubStats.getValue() === undefined && !this.fetching) {
      this.makeAllRequests();
    }
    return this.githubStats.asObservable();
  }

  private makeAllRequests() {

    let githubObservable = this.githubService.awaitData();
    let trelloObservable = this.trelloService.awaitData();

    trelloObservable.subscribe(d => {
      if (d !== undefined ){
        this.trelloData = d;
        this.sortTrelloData();
      }
    });

    // Add this here to change parsed user info when date is changed.
    githubObservable.subscribe(d => {
      this.githubData = d;
      if (d !== undefined) {
        this.sortGithubData();
      }
    });
  }

  private returnUserDataIfComplete() {
    if (Object.keys(this.parsedUserData).length == 0) return;
    if (!this.parsedUserData[Object.keys(this.parsedUserData)[0]].commits) return;
    if (!this.parsedUserData[Object.keys(this.parsedUserData)[0]].trelloLists) return;

    this.usersList.next(this.parsedUserData);
    this.githubStats.next(this.calculatedGithubStats);
  }

  private sortGithubData(): void {
    for (let user of this.githubData.users) {
      let myUser = this.parsedUserData[user.login];
      myUser.reset();
      myUser.name = user.name;
      myUser.login = user.login;
      myUser.id = user.id;
      myUser.commits = user.commits;
      myUser.totalCommits = myUser.commits.length;
      myUser.email = user.email;
      myUser.avatarUrl = user.avatarUrl;
      for (let i = 0; i < myUser.commits.length; i++) {
        let commit = myUser.commits[i];
        myUser.summateData(commit.node.changedFiles, commit.node.additions, commit.node.deletions);
      }
      myUser.calculateMetaData();
    }
    this.parseGithubStats();
    this.returnUserDataIfComplete();
  }

  private sortTrelloData(): void {
    let username;
    for(let user of this.trelloData.users) {
      switch (user.fullName) {
        case "Matt Cheah":
          username = "mattcheah";
          break;
        case "Kristi Feathers":
          username = "4kristi";
          break;
        case "Monica Reynoso":
          username = "MReynoso2018";
          break;
        case "Robert Hasbrook":
          username = "bobbyhasbrook";
          break;
        case "Ryan":
          username = "insarov";
          break;
      }
      this.parsedUserData[username].trelloLists = user.lists;
      this.parsedUserData[username].trelloCards = user.cards;
    }
    // this.usersList.next(this.parsedUserData);
    this.returnUserDataIfComplete();
  }

  private parseGithubStats():void {
    let mostCommits = 0, mostFileChanges = 0, mostAdditions = 0, mostDeletions = 0;
    let mostCommitsUser, mostFileChangesUser, mostAdditionsUser, mostDeletionsUser;
    let allCommitsTotal = 0, allAdditionsTotal = 0, allDeletionsTotal = 0, allFileChangesTotal = 0;

    for (let login of Object.keys(this.parsedUserData)) {
      let user = this.parsedUserData[login];

      if(user.totalCommits >= mostCommits) {
        mostCommits = user.totalCommits;
        mostCommitsUser = user;
      }
      if (user.totalAdditions >= mostAdditions) {
        mostAdditions = user.totalAdditions;
        mostAdditionsUser = user;
      }
      if (user.totalDeletions >= mostDeletions) {
        mostDeletions = user.totalDeletions;
        mostDeletionsUser = user;
      }
      if (user.totalFileChanges >= mostFileChanges) {
        mostFileChanges = user.totalFileChanges;
        mostFileChangesUser = user;
      }

      allCommitsTotal += user.totalCommits;
      allAdditionsTotal += user.totalAdditions;
      allDeletionsTotal += user.totalDeletions;
      allFileChangesTotal += user.totalFileChanges;
    }

    let usersLength = Object.keys(this.parsedUserData).length;

    this.calculatedGithubStats["mostCommits"] = mostCommits;
    this.calculatedGithubStats["mostCommitsUser"] = mostCommitsUser;
    this.calculatedGithubStats["mostFileChanges"] = mostFileChanges;
    this.calculatedGithubStats["mostFileChangesUser"] = mostFileChangesUser;
    this.calculatedGithubStats["mostAdditions"] = mostAdditions;
    this.calculatedGithubStats["mostAdditionsUser"] = mostAdditionsUser;
    this.calculatedGithubStats["mostDeletions"] = mostDeletions;
    this.calculatedGithubStats["mostDeletionsUser"] = mostDeletionsUser;
    this.calculatedGithubStats["recentCommits"] = this.githubData.recentCommits;
    this.calculatedGithubStats["userCommitsAverage"] = Math.round(allCommitsTotal/usersLength);
    this.calculatedGithubStats["userAdditionsAverage"] = Math.round(allAdditionsTotal/usersLength);
    this.calculatedGithubStats["userDeletionsAverage"] = Math.round(allDeletionsTotal/usersLength);
    this.calculatedGithubStats["userFileChangesAverage"] = Math.round(allFileChangesTotal/usersLength);
  }

}
