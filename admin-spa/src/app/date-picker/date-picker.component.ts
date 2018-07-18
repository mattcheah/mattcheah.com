import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment';
import { MatDatepickerModule } from '@angular/material';
import { FormControl } from "@angular/forms";

import { DateService } from "../services/date.service";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  startDateRange;
  endDateRange;

  constructor(private dateService: DateService) {
    this.startDateRange = new FormControl(this.dateService.startDateRange);
    this.endDateRange = new FormControl(this.dateService.endDateRange);
  }

  ngOnInit() {
  }

  updateDateService() {
    console.log("====================");
    console.log("===== NEW DATE =====");
    console.log("====================");

    console.log("starting date: "+this.startDateRange.value);
    console.log("ending date: "+this.endDateRange.value);

    this.dateService.updateDates(this.startDateRange.value, this.endDateRange.value);
  }

}
