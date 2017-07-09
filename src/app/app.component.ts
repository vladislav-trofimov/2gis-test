import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {StatusService} from './auth/status.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = '2Gis Api test task';
  authSwitch: boolean;
  currentUser: any = '';


  constructor(private authService: AuthService, private statusService: StatusService){

    this.statusService.infoChanged().subscribe({
      next: () => {
        this.switchAuthStatus();
        this.authSwitch = true;
      }
    });
  }


  switchAuthStatus(){
     if (this.authService.isAuth()) {
       this.currentUser = JSON.parse(this.authService.getCurrentUser()).name || '';
       this.authSwitch = true;
     }
  }

  logout() {
    this.currentUser = '';
    this.authSwitch = false;
  }

  ngOnInit() {
    this.switchAuthStatus();
  }
}
