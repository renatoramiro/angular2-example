import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/Rx';
import { LoginService } from "app/shared/login/login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [LoginService]
})
export class RegisterComponent {

  public registerForm: FormGroup;

  constructor(private router: Router, private loginService: LoginService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      'name': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'username': [null, Validators.compose([Validators.required, Validators.minLength(3),
                            Validators.pattern('^[a-zA-Z]+[\d]*[\.?\-{1}]?[\d]*[a-zA-Z]+$')])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  public register(credentials) {
    if (this.validateDevice(credentials)) {
      this.loginService.register(credentials).subscribe(data => {
        if (data.success === undefined) {
          this.router.navigate(['/login']);
        } else {
          console.error(data.message);
        }
      }, this.onError);
    } else {
      console.error('Fill all fields');
    }
  }

  private validateDevice(data): boolean {
    return data.name && data.email && data.username && data.password;
  }

  private onError(error) {
    console.error(error);
  }

}
