import { Component, OnInit } from '@angular/core';
import { LoaderIconComponent } from "../loader-icon/loader-icon.component";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {

  priorityCards: Array<any>;
  emergencyCards: Array<any>;

  constructor() {

  }

  ngOnInit() {

  }



}
