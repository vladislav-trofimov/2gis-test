import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import {DataService} from "./data.service";
import { LoginComponent } from './auth/login.component';
import { LogoutComponent } from './auth/logout.component';
import { ProfileComponent } from './auth/profile.component';
import {AuthGuard} from "./auth/auth.guard";
import {AuthService} from "./auth/auth.service";
import {routing} from "./app.routing";
import {StatusService} from "./auth/status.service";

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [DataService, AuthGuard, AuthService, StatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
