import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, zip } from 'rxjs';
import { DateService } from '../services/date.service';
declare var require: any;
var githubData = require('../githubData.json');

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  public startDate: Date;
  public endDate: Date;
  private githubData = new BehaviorSubject(undefined);
  private fetching: boolean = false;

  private lastCommitsResponse;
  // data to go inside githubData;
  private users;
  private commits = [];

  constructor(private dateService: DateService) {
    this.getDatesAndRefreshData();
  }

  public awaitData() {
    if(this.githubData.getValue() === undefined && !this.fetching) {
      if (this.startDate && this.endDate) {
        this.refreshData();
      } else {
        this.getDatesAndRefreshData();
      }
    }
    return this.githubData.asObservable();
  }

  public getDatesAndRefreshData() {
    let rangeObservable = this.dateService.awaitRange();
    rangeObservable.subscribe(dataArray => {
      this.startDate = dataArray[0];
      this.endDate = dataArray[1];
      this.refreshData();
    });
  }

  public refreshData(): void {
    // this.fetching = true;
    // this.commits = [];
    // let promiseArray = [
    //   this.getGithubUsers(),
    //   this.getCommitsOverTime(this.startDate, this.endDate),
    //   this.getRecentCommits()
    // ];
    // let self = this;

    // Promise.all(promiseArray).then((promiseReturnArray) => {

    //   self.fetching = false;
    //   let allUsers = promiseReturnArray[0];
    //   let recentCommits = promiseReturnArray[2];
    //   self.users = allUsers["data"].repository.collaborators.edges;



    //   self.sortCommits();
    //   self.githubData.next({
    //     users: self.users,
    //     commits: self.commits,
    //     recentCommits: recentCommits["data"].repository.ref.target.history.edges
    //   });
    //   // console.log("self.users from github service");
    //   // console.log(self.users);
    // }).catch(error => {
    //   self.githubData.error(error);
    //   console.log("GithubService Error in refreshData() - Promise Failed:")
    //   console.log(error);
    // });
    this.githubData.next(githubData);


  }

  /**
   * Gets a list of all of the users on bestattorney/bestattorney.com
   * Returns a promise
   */
  private getGithubUsers() {
    let self = this;
    let query =
    `query {
      repository(owner: "bestattorney", name: "bestattorney.com") {
        collaborators(first:10) {
          edges {
            node {
              login
              id
              name
              avatarUrl
              email
            }
          }
        }
      }
    }`;

    let variables = {};
    return this.makeFetchRequest(query, variables);
  }

  /**
   * Gets all commits from the master branch on bestattorney/bestattorney.com in the specified time frame.
   * startDate and endDate should be javascript Date objects
   * Returns a promise that resolves with no value
   */
  private getCommitsOverTime(startDate: Date, endDate: Date) {

    let self = this;
    let query =
      `query($cursor: String, $startDate: GitTimestamp, $endDate: GitTimestamp) {
        repository(owner: "bestattorney", name: "bestattorney.com") {
          ref(qualifiedName: "master") {
            target {
              ... on Commit {
                id
                history(first: 100, since: $startDate, until: $endDate, after: $cursor) {
                  totalCount
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                  edges {
                    node {
                      messageHeadline
                      author {
                        user {
                          login
                          id
                        }
                        name
                        date
                      }
                      changedFiles
                      additions
                      deletions
                    }
                    cursor
                  }
                }
              }
            }
          }
        }
      }`;

    let variables = {
      startDate: startDate,
      endDate: endDate
    };
    variables['cursor'] = this.lastCommitsResponse ? this.lastCommitsResponse.pageInfo.endCursor : null;

    return new Promise(function(resolve,reject) {
      self.makeFetchRequest(query, variables).then(response => {
        let history = response["data"].repository.ref.target.history;
        self.commits = self.commits.concat(history.edges);

        if (history.pageInfo.hasNextPage == true) {
          self.lastCommitsResponse = history;
          resolve(self.getCommitsOverTime(self.startDate, self.endDate));
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Gets the 20 most recent commits from the master branch on bestattorney/bestattorney.com
   * Returns a promise
   */
  private getRecentCommits() {
    let self = this;
    let query =
      `query {
        repository(owner: "bestattorney", name: "bestattorney.com") {
          ref(qualifiedName: "master") {
            target {
              ... on Commit {
                id
                history(first: 20) {
                  edges {
                    node {
                      messageHeadline
                      author {
                        user {
                          login
                          id
                        }
                        name
                        date
                        avatarUrl
                      }
                      changedFiles
                      additions
                      deletions
                    }
                  }
                }
              }
            }
          }
        }
      }`;

    let variables = {};
    return this.makeFetchRequest(query, variables);
  }

  private sortCommits() {
    for(let i = 0; i < this.users.length; i++) {
      this.users[i] = this.users[i].node;
      let user = this.users[i];
      user.commits = [];
      for(let j = 0; j < this.commits.length; j++) {
          let commit = this.commits[j];

          if (commit.node.messageHeadline.substring(0,5) == "Merge" || commit.node.messageHeadline.substring(0,15) == "[skip ci] Merge") {
            // console.log("commit is merge:");
            // console.log(commit.node);
            // Do nothing because I'm a terrible coder.
          } else if (commit.node.author.user && commit.node.author.user.id === user.id) {
            user.commits.push(commit);
          }
      }
    }
  }

  private makeFetchRequest(query, variables) {
    let self = this;
    let body = JSON.stringify({query: query, variables: variables});

    return new Promise((resolve, reject) => {
      fetch("https://api.github.com/graphql", {
        method: 'POST',
        body: body,
        headers: new Headers({
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': 'bearer 051371695949579c9d2602d97dca5a5e713db61b'
        })
      }).then(res => res.json())
        .then(function (res) {
          if(res.errors && res.errors.length > 0) {
            reject(res.errors[0].message);
          }
          resolve(res);
        }).catch(error => {
          console.error('Error in fetch request:', error);
          reject(error);
        });
    });
  }

}
