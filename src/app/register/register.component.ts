import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import 'rxjs/Rx';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public input: any;

  constructor(private http: Http, private router: Router) {
    this.input = {
      name: '', email: '', username: '', password: ''
    };
  }

  public register() {
    if (this.input.name && this.input.email && this.input.username && this.input.password) {
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      this.http.post('https://fathomless-temple-13471.herokuapp.com/api/v1/register', JSON.stringify(this.input), options)
          .map(result => result.json())
          .subscribe(data => {
            this.router.navigate(['/login']);
          });
    }
  }

}
