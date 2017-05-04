import {Routes, RouterModule} from "@angular/router";
import { LoginComponent } from "./auth/login.component";
import {LogoutComponent} from "./auth/logout.component";
import {AuthGuard} from "./auth/auth.guard";
import {ProfileComponent} from "./auth/profile.component";
 // import {HomeComponent} from "./home/home.component";
// import {NewsComponent} from "./news/news.component";
// import {SolutionComponent} from "./solution/solution.component";
// import {PageNotFoundComponent} from "./page-not-found.component";
// import {AboutComponent} from "./about/about.component";
// import {LoginComponent} from "./admin/login.component";
// import {AdminComponent} from "./admin/admin.component";
// import {AuthGuard} from "./admin/auth.guard";
const APP_ROUTES:Routes=[
    { path:'login', component:LoginComponent },
    { path:'logout', component:LogoutComponent },
    { path:'profile', component:ProfileComponent, canActivate: [AuthGuard]},
    { path: '**', component: ProfileComponent },

    // { path:'about/:id', component:AboutComponent },n
    // { path:'product/:id', component:ProductComponent },
    // { path:'solution/:id', component:SolutionComponent },
    // { path:'news', component:NewsComponent },
    // { path:'login', component:LoginComponent },
    // { path:'admin', component:AdminComponent, canActivate:[AuthGuard] },
    // { path: '**', component: PageNotFoundComponent },
];

export const routing=RouterModule.forRoot(APP_ROUTES);
