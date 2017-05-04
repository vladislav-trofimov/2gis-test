import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";


@Component({
  selector: 'app-login',
  template: `
    <p>
      login Works!
    </p>
    <form method="post">
      username: <input type="text" name="username" #username><br>
      password: <input type="text" name=" password" #password><br>
      <button (click)="checkUserData(username.value, password.value)">send</button>
    </form>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService:AuthService) { }

  checkUserData(username, password){
    this.authService.checkUser(username, password); //+map
    console.log(username, password);
    let user = {name:'John', role:'admin'};
    localStorage.setItem('user', JSON.stringify(user));
    console.log('setting user');

    //this.router.navigate(['/profile']);
  }

  ngOnInit() {
    if (localStorage.getItem('user')){
      console.log('User exists go to profile');
      this.router.navigate(['/profile']);
    }
  }

}

