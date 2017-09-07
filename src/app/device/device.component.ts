import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import 'rxjs/Rx';
import { LoginService } from "app/shared/login/login.service";
import { DevicesService } from "app/shared/devices/devices.service";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],
  providers: [LoginService, DevicesService]
})
export class DeviceComponent implements OnInit {

  public device: any;
  public data: any;

  constructor(private router: Router, private loginService: LoginService,
    private service: DevicesService) {
    this.device = { name: '', type: '' };
  }

  ngOnInit() {}

  save() {
    if (this.device.name && this.device.type) {
      this.service.save(this.device).subscribe(data => {
        this.router.navigate(['/devices']);
      }, this.onError);
    }
  }

  private onError(error) {
    console.error(error);
  }

}
