import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class DataService {

  constructor(private http:Http) { }

  getEmployeeList(){
    let body = '';
    return this.http.post('http://localhost:3000/db', body)
        .map((response:Response)=>response.json());
  }

  getTaskList(){
    let body = '';
    return this.http.post('http://localhost:3000/db/tasklist', body)
        .map((response:Response)=>response.json());
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
    return this.http.post('http://localhost:3000/db//addemployee', body, {headers:headers})
      .map((data:Response)=>data.json());
  }

  updateStatus(taskId){
    const body = JSON.stringify(taskId);
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/db//updatestatus',body, {headers:headers})
      .map((data:Response)=>data.json());
  }

  updateTask(task){
    const body = JSON.stringify(task);
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/db//updatetask',body, {headers:headers})
      .map((data:Response)=>data.json());
  }

}
