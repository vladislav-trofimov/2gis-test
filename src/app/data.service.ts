import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch'



@Injectable()
export class DataService {

  private _serverError(err: any) {
    console.log('sever error:', err);
    if(err instanceof Response) {
      return Observable.throw(err.json().error || 'backend server error');
    }
    return Observable.throw(err || 'backend server error');
  }


  constructor(private http:Http) { }

  // sending markers to server
  sendMarkers(markerStorage:any){
    const body = JSON.stringify(markerStorage);
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    let options = new RequestOptions({headers: headers});
    return this.http.post('http://localhost:3000/db/add', body, options).
      map(res => res.json()).
        subscribe(
             data => console.log(data),
             err => console.log(err)
          );
  }

  // getting markers from server
  getMarkers(){
    return this.http.get('http://localhost:3000/db/list').
    map(res => res.json());
  }


  // remove all  markers in server
  removeMarkers(){
    return this.http.get('http://localhost:3000/db/delete').
    map(res => {
      res.json();
    });
  }

 // building list of chosen objects (schools, shops, gas stations)
  getObjectsList(lat, lng){
    return {
      schools:[
        [lat+0.0033, lng+0.0086],
        [lat+0.0045, lng+0.0041],
        [lat+0.0019, lng+0.0068]
      ],
      shops:[
        [lat+0.0053, lng+0.0006],
        [lat+0.0075, lng+0.0021],
        [lat+0.0059, lng+0.0018]
      ],
      gasStations:[
        [lat+0.003, lng+0.0056],
        [lat+0.0095, lng+0.0031],
        [lat+0.0049, lng+0.0048]
      ]
    }
  }

  // sending user data to server while registration
  sendUserData(user:any){
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/db/adduser', body, {headers:headers})
      .map((data:Response)=>data.json());
  }

}
