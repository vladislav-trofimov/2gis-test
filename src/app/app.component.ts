import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  authSwitch:boolean;
  currentUser:any='';


  constructor(private authService:AuthService){

  }

  switchAuthStatus(){
    this.currentUser = JSON.parse(this.authService.getCurrentUser()).name || '';
    this.authSwitch = this.currentUser ? true : false;
    console.log('currentUser: '+this.currentUser);
  }


  logout(){
    this.currentUser='';
    this.authSwitch = false;
  }

  login(){
    this.currentUser = JSON.parse(this.authService.getCurrentUser()).name || '';
    this.authSwitch = true;
  }


  ngOnInit(){
    this.switchAuthStatus();
  }
}
