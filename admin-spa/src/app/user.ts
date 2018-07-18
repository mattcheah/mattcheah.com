export class User {

    public name: string;
    public login: string;
    public id: string;
    public avatarUrl: string;
    public email: string;

    public totalCommits: number;
    public totalFileChanges: number = 0;
    public totalAdditions: number = 0;
    public totalDeletions: number = 0;
    public averageAdditions: number;
    public averageFileChanges: number;
    public averageDeletions: number;
    public averageLineChangeSum: number;

    public commits;

    constructor() {

    }
    public reset():void {
      this.totalFileChanges = 0;
      this.totalAdditions = 0;
      this.totalDeletions = 0;
      this.commits = undefined;
    }

    public summateData(changedFiles: number, additions: number, deletions: number): void {
        this.totalFileChanges += changedFiles;
        this.totalAdditions += additions;
        this.totalDeletions += deletions;
    }

    public calculateMetaData(): void {
        if (this.totalCommits > 0) {
            this.averageFileChanges = Math.floor(this.totalFileChanges / this.totalCommits);
            this.averageAdditions = Math.floor(this.totalAdditions / this.totalCommits);
            this.averageDeletions = Math.floor(this.totalDeletions / this.totalCommits);
            this.averageLineChangeSum = Math.floor((this.totalAdditions - this.totalDeletions) / this.totalCommits);
        }
    }


}
