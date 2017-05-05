import { Injectable } from '@angular/core';
import {Http} from "@angular/http";


@Injectable()
export class AuthService {

  constructor(private http:Http) { }

  checkUser(username, password){
    //let url='';
    //this.http.post(url,{username:username, password:password});
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
