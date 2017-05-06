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

  // getTaskList(){
  //   return this.http.get('http://localhost:3000/db/tasklist')
  //       .map((response:Response)=>response.json());
  // }

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

}
