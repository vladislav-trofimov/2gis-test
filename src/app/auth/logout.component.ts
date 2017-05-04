import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    localStorage.removeItem('user');
    console.log('user removed')
  }

}
