import {Routes, RouterModule} from "@angular/router";
import { LoginComponent } from "./auth/login.component";
import {LogoutComponent} from "./auth/logout.component";
import {AuthGuard} from "./auth/auth.guard";
import {ProfileComponent} from "./auth/profile.component";
import {AboutComponent} from "./about/about.component";
import {MainComponent} from "./main/main.component";
import {RegisterComponent} from "./auth/register.component";

const APP_ROUTES: Routes=[
    { path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    { path: 'logout', component: LogoutComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],
      children: [
        { path: 'main', component: MainComponent},
        { path: 'about', component: AboutComponent }
      ]
    },
    { path: '**', component: ProfileComponent, canActivate: [AuthGuard] },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
