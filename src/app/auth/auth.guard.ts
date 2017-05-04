import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService:AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    if (this.authService.isAuth()){
      console.log('User exists go to profile');
      return true;
    } else {
      console.log('No User exists / set it / go to login');
      console.log(state.url);
      this.router.navigate(['/login']);
    }
    return false;
  }
}
