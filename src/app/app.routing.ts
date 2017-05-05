import {Routes, RouterModule} from "@angular/router";
import { LoginComponent } from "./auth/login.component";
import {LogoutComponent} from "./auth/logout.component";
import {AuthGuard} from "./auth/auth.guard";
import {ProfileComponent} from "./auth/profile.component";

const APP_ROUTES:Routes=[
    { path:'login', component:LoginComponent },
    { path:'logout', component:LogoutComponent },
    { path:'profile', component:ProfileComponent, canActivate: [AuthGuard] },
    { path: '**', component: ProfileComponent, canActivate: [AuthGuard] },
];

export const routing=RouterModule.forRoot(APP_ROUTES);
