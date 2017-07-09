import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {DataService} from "./data.service";
import { LoginComponent } from './auth/login.component';
import { LogoutComponent } from './auth/logout.component';
import { ProfileComponent } from './auth/profile.component';
import {AuthGuard} from "./auth/auth.guard";
import {AuthService} from "./auth/auth.service";
import {routing} from "./app.routing";
import {StatusService} from "./auth/status.service";
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './auth/register.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    MainComponent,
    AboutComponent,
    RegisterComponent,
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
