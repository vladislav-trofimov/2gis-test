import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import * as Rx from 'rxjs/Rx';
// сервис полученияданных о пользователе
@Injectable()
export class StatusService {
  private status:boolean;
  infoStatus = new Rx.Subject();
  constructor() { }

  setStatus(status){
    this.status = status;
    this.infoStatus.next();
  }

  infoChanged() {
    return this.infoStatus;
  }

  getStatus(){
    let user = localStorage.getItem('user');
    if (user){
      return JSON.parse(user).role;
    }
  }

  getUserName(){
    let user = localStorage.getItem('user');
    if (user){
      return JSON.parse(user).name;
    }
  }

}
