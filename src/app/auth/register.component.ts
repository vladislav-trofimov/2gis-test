import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  template: `
    <form class="form-horizontal">
      <div class="form-group">
        <label for="username" class="col-md-2 control-label">login</label>
        <div class="col-md-10">
          <input type="text" id="username" #username class="form-control">
        </div>
      </div>
      <div class="form-group">
        <label for="password" class="col-md-2 control-label">password</label>
        <div class="col-md-10">
          <input type="text" id="password" #password class="form-control">
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-2 col-sm-offset-1">
          <button type="submit" class="btn btn-success"
                  (click)="addEmployer(username.value, password.value)">add user</button>
        </div>
      </div>
    </form>
  `,
  styles: []
})
export class RegisterComponent implements OnInit {


  constructor( private dataService:DataService, private router:Router) { }

  addEmployer(username, password){
    console.log(username, password);
    this.dataService.sendUserData({
      name:username,
      password:password})
      .subscribe(
        data=>{
          this.router.navigate(['/login']);
        }
      );
  }

  ngOnInit() {
  }

}
