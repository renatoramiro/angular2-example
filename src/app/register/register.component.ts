import { Component } from '@angular/core';
import { Router } from "@angular/router";
import 'rxjs/Rx';
import { LoginService } from "app/shared/login/login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [LoginService]
})
export class RegisterComponent {

  public input: any;

  constructor(private router: Router, private loginService: LoginService) {
    this.input = {
      name: '', email: '', username: '', password: ''
    };
  }

  public register() {
    if (this.validateDevice()) {
      this.loginService.register(this.input).subscribe(this.onSuccess, this.onError);
    } else {
      console.error('Fill all fields');
    }
  }

  private validateDevice(): boolean {
    return this.input.name && this.input.email &&
          this.input.username && this.input.password;
  }

  private onSuccess(data) {
    if (data.success === undefined) {
      this.router.navigate(['/login']);
    } else {
      console.error(data.message);
    }
  }

  private onError(error) {
    console.error(error);
  }

}
