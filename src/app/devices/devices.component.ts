import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "app/shared/login/login.service";
import { DevicesService } from "app/shared/devices/devices.service";
import { Device } from "app/models/device";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  providers: [LoginService, DevicesService]
})
export class DevicesComponent implements OnInit {

  public devices: Array<Device>;

  constructor(private router: Router, private loginService: LoginService,
      private service: DevicesService) {
    this.devices = [];
  }

  onError(err) {
    console.error('Something wrong happened here. Sorry!');
  }

  ngOnInit() {
    this.service.loadDevices()
        .subscribe(data => {
          this.devices = data['devices'];
        }, this.onError);
  }

  public logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
