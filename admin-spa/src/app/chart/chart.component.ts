import { Component, Input, OnChanges, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() chartElementId: any;
  @Input() chartData: any;

  chartCanvas;
  myChart;

  constructor() { }
  ngOnInit() {}

  ngAfterViewInit() {
    this.chartCanvas = document.getElementById(this.chartElementId);
    this.myChart = new Chart(this.chartCanvas, this.chartData);
  }

  ngOnChanges() {
    if (this.chartCanvas) this.myChart = new Chart(this.chartCanvas, this.chartData);
  }

}
