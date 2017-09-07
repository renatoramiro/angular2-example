import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs/Rx";

import { LoginService } from "app/shared/login/login.service";
import { Router } from "@angular/router";

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  constructor(private auth: LoginService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const data = this.auth.getLocalStorageData();
    if (this.auth.isAuthenticated()) {
      const authReq = req.clone({headers: req.headers.set('x-access-token', data.token)});
      return next.handle(authReq).do((event) => {
        // console.log(event);
        if (event instanceof HttpResponse) {
          sessionStorage.setItem('token', event.body.token);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
    
  }

}
