import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { LoginService } from "app/shared/login/login.service";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Rx";

@Injectable()
export class DevicesService {

  data: any;
  baseUrl: string = 'https://fathomless-temple-13471.herokuapp.com/api/v1/devices/';

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.data = this.loginService.getLocalStorageData();
  }

  getResultData(res) {
    return res;
  }

  loadDevices(): Observable<any[]> {
    return this.http.get(this.baseUrl + this.data.user)
      .map(this.getResultData);
  }

  save(device): Observable<any> {
    return this.http.post(this.baseUrl + this.data.user + '/create', device)
      .map(this.getResultData);
  }

  show(deviceId): Observable<any> {
    return this.http.get(this.baseUrl + this.data.user + '/device/' + deviceId)
      .map(this.getResultData);
  }

}
