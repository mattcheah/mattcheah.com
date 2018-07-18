import { Component, OnInit, Input } from '@angular/core';
import { CamelCasePipe } from '../../pipes/camel-case.pipe';

@Component({
  selector: 'app-full-trello-user-data',
  templateUrl: './full-trello-user-data.component.html',
  styleUrls: ['./full-trello-user-data.component.scss']
})
export class FullTrelloUserDataComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit() {

  }

}
