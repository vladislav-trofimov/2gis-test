import { Component, OnInit } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.css']
})
export class NetworksComponent implements OnInit {
  file:File;
  constructor( private http:Http) { }

  networkPost(text) {
    if(typeof this.file != "undefined") {
      let formData:FormData = new FormData();
      formData.append('uploadFile', this.file, this.file.name);
      let headers = new Headers();
      //headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      //console.log(formData);
      this.http.post('upload/file', formData, { headers: headers })
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
          data => console.log('success'),
          error => console.log(error)
        );
    }

    const body = JSON.stringify({text:text});
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post('upload/text',body, {headers:headers})
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .subscribe(
        data => console.log('success'),
        error => console.log(error)
      );
  }

  ngOnInit() {
  }

}
