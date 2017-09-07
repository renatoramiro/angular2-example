import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  public devices: Array<any>;
  private data: any;

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) {
    this.devices = [];
    this.data = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': this.data.token
    });
    let options = new RequestOptions({headers: headers});
    this.http.get('https://fathomless-temple-13471.herokuapp.com/api/v1/devices/' + this.data.user, options)
        .map(result => result.json())
        .subscribe(data => {
          this.devices = data.devices;
        });
  }

  logoff() {
    // localStorage.removeItem('currentUser');
    // localStorage.setItem('currentUser', '');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
