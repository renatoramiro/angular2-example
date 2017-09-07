import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import 'rxjs/Rx';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  public device: any;
  public data: any;
  public url: string = 'https://fathomless-temple-13471.herokuapp.com/api/v1/devices/';

  constructor(private http: Http, private router: Router) {
    this.device = { name: '', type: '' };
  }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('currentUser'));
  }

  save() {
    if (this.device.name && this.device.type) {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': this.data.token
      });
      let options = new RequestOptions({headers: headers});
      this.http.post(this.url + this.data.user + '/create', JSON.stringify(this.device), options)
          .map(result => result.json())
          .subscribe(data => {
            this.router.navigate(['/devices']);
          });
    }
  }

}
