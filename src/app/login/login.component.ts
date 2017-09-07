import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import 'rxjs/Rx';

import { LoginService } from '../shared/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public input: any;

  constructor(private router: Router, private loginService: LoginService) {
    this.input = {username: '', password: ''};
  }

  ngOnInit() {
    if (this.loginService.isAuthenticated()) {
      let data = this.loginService.getLocalStorageData();
      if (data.user && data.token) {
        this.router.navigate(['/devices']);
      }
    }
  }

  onError(error) {
    console.error(error);
  }

  public login() {
    if (this.validateCredentials()) {
      this.loginService.login(this.input).subscribe(data => {
        if (data.success) {
          sessionStorage.setItem('data', data.currentUser._id);
          sessionStorage.setItem('token', data.token);
          this.router.navigate(['/devices']);
        } else {
          console.error(data.message);
        }
      }, this.onError);
    }
  }

  private validateCredentials(): boolean {
    return this.input.username && this.input.password;
  }

}
