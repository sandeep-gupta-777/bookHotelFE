import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  @Input() status:number =1;//1: requested 2: estimated 3:service performed
  constructor() { }

  ngOnInit() {
  }

}
