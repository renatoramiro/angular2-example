import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public loginForm: FormGroup;

  constructor(private router: Router, private loginService: LoginService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
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

  public login(credentials) {
    if (this.validateCredentials(credentials)) {
      this.loginService.login(credentials).subscribe(data => {
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

  private validateCredentials(data): boolean {
    return data.username && data.password;
  }
}
