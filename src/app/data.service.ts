import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/do';  // debug
import 'rxjs/add/operator/catch'

@Injectable()
export class DataService {

  private _serverError(err: any) {
    console.log('sever error:', err);  // debug
    if(err instanceof Response) {
      return Observable.throw(err.json().error || 'backend server error');
      // if you're using lite-server, use the following line
      // instead of the line above:
      //return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(err || 'backend server error');
  }


  constructor(private http:Http) { }

  getEmployeeList(){
    let body = '';
    return this.http.post('http://localhost:3000/db', body)
        .map((response:Response)=>response.json());
  }

  getTaskList(){
    let body = '';
    return this.http.post('http://localhost:3000/db/tasklist', body)
      .map((response:Response)=>response.json())
      .do(data => console.log('server data:', data))  // debug
      .catch(this._serverError);
  }

  sendTaskData(task:any){
    const body = JSON.stringify(task);
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/db/addtask', body, {headers:headers})
        .map((data:Response)=>data.json());
  }

  sendUserData(task:any){
    const body = JSON.stringify(task);
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/db/addemployee', body, {headers:headers})
      .map((data:Response)=>data.json());
  }

  updateStatus(taskId){
    const body = JSON.stringify(taskId);
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/db/updatestatus',body, {headers:headers})
      .map((data:Response)=>data.json());
  }

  updateTask(task){
    const body = JSON.stringify(task);
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/db/updatetask',body, {headers:headers})
      .map((data:Response)=>data.json());
  }

  sendComment(comment){
    const body = JSON.stringify(comment);
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/db/addcomment',body, {headers:headers})
      .map((data:Response)=>data.json());
  }

}
