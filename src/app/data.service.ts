import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class DataService {

  constructor(private http:Http) { }

  getData(){
    return this.http.get('http://localhost:3000/db')
        .map((response:Response)=>response.json());
  }

  getTaskList(){
    return this.http.get('http://localhost:3000/db/tasklist')
        .map((response:Response)=>response.json());
  }

  sendData(username:any){
    const body = JSON.stringify(username);
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/db', body, {headers:headers})
        .map((data:Response)=>data.json());
  }
}
