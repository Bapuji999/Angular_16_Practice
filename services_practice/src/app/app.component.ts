import { Component } from '@angular/core';
import { MessageService } from './Services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private msg: MessageService) { }
  title = 'services_practice';

  ngOnInit() {
    debugger;
    var msg = this.msg.getMessage();
    alert(msg);
  }
}
