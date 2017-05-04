import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `
    <p>
      profile Works!
    </p>
    <app-tasks></app-tasks>
  `,
  styles: []
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
