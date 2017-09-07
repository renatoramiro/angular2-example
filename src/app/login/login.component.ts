import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public input: any;

  constructor(private http: Http, private router: Router) {
    this.input = {username: '', password: ''};
  }

  public login() {
    if (this.input.username && this.input.password) {
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      this.http.post('https://fathomless-temple-13471.herokuapp.com/api/v1/login', JSON.stringify(this.input), options)
          .map(result => result.json())
          .subscribe(data => {
            console.log(data);
            localStorage.setItem('currentUser', JSON.stringify({user: data.currentUser._id, token: data.token}));
            this.router.navigate(['/devices']);
          });
    }
  }

}
