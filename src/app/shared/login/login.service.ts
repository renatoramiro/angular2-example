import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class LoginService {

  baseUrl: string = 'https://fathomless-temple-13471.herokuapp.com/api/v1/';

  constructor(private http: Http) { }

  getResult(response: Response) {
    return response.json();
  }

  login(credentials): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + 'login', JSON.stringify(credentials), options)
        .map(this.getResult)
  }

  register(data): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + 'register', JSON.stringify(data), options)
      .map(this.getResult);
  }

  public logout(): void {
    sessionStorage.removeItem('data');
    sessionStorage.removeItem('token');
  }

  public isAuthenticated(): boolean {
    return sessionStorage.getItem('data') !== null;
  }

  public getLocalStorageData(): any {
    let data = {user: undefined, token: undefined};
    data.user = sessionStorage.getItem('data');
    data.token = sessionStorage.getItem('token');
    return data;
  }

}
