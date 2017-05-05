import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class StatusService {
  private status:boolean;
  infoStatus = new Rx.Subject();
  constructor() { }

  setStatus(status){
    this.status = status;
    this.infoStatus.next();
    console.log('settled status: '+ this.status);
  }

  infoChanged() {
    return this.infoStatus;
  }

}
