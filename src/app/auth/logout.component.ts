import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  template: `
    <p>
      logout Works!
    </p>
  `,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    localStorage.removeItem('user');
    console.log('user removed');
    this.router.navigate(['/login']);
  }

}
