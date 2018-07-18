import * as moment from 'moment/moment';

export class Utils {

  static waitTimers = {};

  static waitForFinalEvent(callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "x1x2x3x4";
    }

    if (this.waitTimers[uniqueId]) {
      clearTimeout(this.waitTimers[uniqueId]);
    }

    this.waitTimers[uniqueId] = setTimeout(callback, ms);
  }

  static dayDifference(firstDate, lastDate): number {
    // let date1 = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    // let date2 = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
    // console.log("my formula says:");
    // console.log(Math.abs(Math.floor((date1.getTime() - date2.getTime()) / 1000 / 60 / 60 / 24)));
    // return Math.abs(Math.floor((date1.getTime() - date2.getTime()) / 1000 / 60 / 60 / 24));

    //New with moment.js
    return Math.abs(moment(firstDate).diff(moment(lastDate),'days'));
  }


}
