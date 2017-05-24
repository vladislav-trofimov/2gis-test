import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {StatusService} from "./status.service";


@Component({
  selector: 'app-login',
  template: `
    <div class="row">
      <div class="col-md-4 col-md-offset-4 login">
        <h4>вход в систему</h4>
        <form class="form-horizontal">
          <div class="form-group">
            <label for="name" class="col-sm-2 control-label">имя</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="name"  #username>
            </div>
          </div>
          <div class="form-group">
            <label for="pass" class="col-sm-2 control-label">пароль</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="pass"  #password>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button (click)="checkUserData(username.value, password.value)" class="btn btn-default">войти</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    
  `,
  styles: [
    `
      h4 {
        background-color: #20a9e1;
        color: white;
        text-align: center;
      }

      .login {
        margin-top: 10%;
        border: 1px solid #20a9e1;
      }

    `
  ]
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

