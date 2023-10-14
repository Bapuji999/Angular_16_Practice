import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor() { }

  @Input() name:any; 
  @Output() classEvent = new EventEmitter();
  ngOnInit() {
  }
  onClick(){
    debugger;
    this.classEvent.emit("red");
  }
}
