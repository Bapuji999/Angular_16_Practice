import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor() { }
  name:any = 'bapuji';
  class:any = "black";
  ngOnInit() {
    this.name = 'ok';
  }
  recivedClass(item:any){
    debugger;
    this.class = item;
  }

}
