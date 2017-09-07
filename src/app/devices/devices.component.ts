import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "app/shared/login/login.service";
import { DevicesService } from "app/shared/devices/devices.service";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  providers: [LoginService, DevicesService]
})
export class DevicesComponent implements OnInit {

  public devices: Array<any>;
  private data: any;

  constructor(private router: Router, private loginService: LoginService,
      private service: DevicesService) {
    this.devices = [];
  }

  onError(err) {
    console.error('Something wrong happened here. Sorry!');
  }

  onSuccess(data) {
    this.devices = data;
  }

  ngOnInit() {
    this.service.loadDevices()
        .subscribe(data => {
          this.devices = data;
        }, this.onError);
  }

  public logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
