import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {StatusService} from "./status.service";


@Component({
  selector: 'app-login',
  template: `
    
    <form method="post">
      username: <input type="text" name="username" #username><br>
      password: <input type="text" name=" password" #password><br>
      <button (click)="checkUserData(username.value, password.value)">send</button>
    </form>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService:AuthService, private statusService:StatusService) { }

  checkUserData(username, password){
    this.authService.checkUser({
      username:username,
      password:password //шифрование!
    }).subscribe(
      data=>{
        console.dir('check user data: '+ data.name + data.admin);
        let user = {name:data.name, role:data.admin};
        localStorage.setItem('user', JSON.stringify(user));
        console.log('setting user');
        this.statusService.setStatus(true);
        this.router.navigate(['/profile']);
      }
    );
  }

  ngOnInit() {
    if (localStorage.getItem('user')){
      console.log('User exists go to profile');
      this.router.navigate(['/profile']);
    }
  }

}

