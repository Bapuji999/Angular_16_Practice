import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  getMessage(){
    return "Hello Bapuji";
  }
}
