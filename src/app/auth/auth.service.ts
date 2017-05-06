import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";


@Injectable()
export class AuthService {

  constructor(private http:Http) { }

  checkUser(user){
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    console.log(body);
    return this.http.post('http://localhost:3000/db/checkuser',body, {headers:headers})
      .map((data:Response)=>data.json());
  }

  isAuth(){
    return localStorage.getItem('user')? true : false;
  }

  getCurrentUser (){
    if (localStorage.getItem('user')){
      return localStorage.getItem('user');
    }
  }

}
